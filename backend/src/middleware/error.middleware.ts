import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { sendError, sendInternalError, sendNotFound } from '../utils/response.util.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';
import logger from '../config/logger.config.js';

/**
 * Global error handler middleware
 */
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(error, res);
    return;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    sendError(res, 'Database validation error', [], HTTP_STATUS.BAD_REQUEST);
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    sendError(res, MESSAGES.INVALID_TOKEN, [], HTTP_STATUS.UNAUTHORIZED);
    return;
  }

  if (error.name === 'TokenExpiredError') {
    sendError(res, MESSAGES.TOKEN_EXPIRED, [], HTTP_STATUS.UNAUTHORIZED);
    return;
  }

  // Multer errors
  if (error.name === 'MulterError') {
    handleMulterError(error, res);
    return;
  }

  // Custom API errors
  if (error.statusCode) {
    sendError(res, error.message, error.errors || [], error.statusCode);
    return;
  }

  // Default error
  sendInternalError(res, process.env.NODE_ENV === 'development' ? error.message : MESSAGES.INTERNAL_ERROR);
}

/**
 * Handle Prisma errors
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError, res: Response): void {
  switch (error.code) {
    case 'P2002': // Unique constraint violation
      const field = (error.meta?.target as string[])?.[0] || 'field';
      sendError(
        res,
        `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        [],
        HTTP_STATUS.CONFLICT
      );
      break;

    case 'P2025': // Record not found
      sendNotFound(res, 'Resource not found');
      break;

    case 'P2003': // Foreign key constraint failed
      sendError(res, 'Related resource not found', [], HTTP_STATUS.BAD_REQUEST);
      break;

    default:
      sendInternalError(res, MESSAGES.INTERNAL_ERROR);
  }
}

/**
 * Handle Multer errors
 */
function handleMulterError(error: any, res: Response): void {
  if (error.code === 'LIMIT_FILE_SIZE') {
    sendError(res, 'File size exceeds limit', [], HTTP_STATUS.BAD_REQUEST);
    return;
  }

  if (error.code === 'LIMIT_FILE_COUNT') {
    sendError(res, 'Too many files uploaded', [], HTTP_STATUS.BAD_REQUEST);
    return;
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    sendError(res, 'Unexpected file field', [], HTTP_STATUS.BAD_REQUEST);
    return;
  }

  sendError(res, error.message, [], HTTP_STATUS.BAD_REQUEST);
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response): void {
  sendNotFound(res, `Route ${req.method} ${req.url} not found`);
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
