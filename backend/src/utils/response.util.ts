import { Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { HTTP_STATUS } from '../constants/index.js';

/**
 * Send success response
 */
export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = HTTP_STATUS.OK
): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(response);
}

/**
 * Send error response
 */
export function sendError(
  res: Response,
  message: string,
  errors: any[] = [],
  statusCode: number = HTTP_STATUS.BAD_REQUEST
): Response {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
  };

  return res.status(statusCode).json(response);
}

/**
 * Send validation error response
 */
export function sendValidationError(
  res: Response,
  errors: any[]
): Response {
  return sendError(
    res,
    'Validation failed',
    errors,
    HTTP_STATUS.UNPROCESSABLE_ENTITY
  );
}

/**
 * Send created response
 */
export function sendCreated<T>(
  res: Response,
  message: string,
  data?: T
): Response {
  return sendSuccess(res, message, data, HTTP_STATUS.CREATED);
}

/**
 * Send not found response
 */
export function sendNotFound(
  res: Response,
  message: string = 'Resource not found'
): Response {
  return sendError(res, message, [], HTTP_STATUS.NOT_FOUND);
}

/**
 * Send unauthorized response
 */
export function sendUnauthorized(
  res: Response,
  message: string = 'Unauthorized access'
): Response {
  return sendError(res, message, [], HTTP_STATUS.UNAUTHORIZED);
}

/**
 * Send forbidden response
 */
export function sendForbidden(
  res: Response,
  message: string = 'Forbidden access'
): Response {
  return sendError(res, message, [], HTTP_STATUS.FORBIDDEN);
}

/**
 * Send conflict response
 */
export function sendConflict(
  res: Response,
  message: string,
  errors: any[] = []
): Response {
  return sendError(res, message, errors, HTTP_STATUS.CONFLICT);
}

/**
 * Send internal server error response
 */
export function sendInternalError(
  res: Response,
  message: string = 'Internal server error'
): Response {
  return sendError(
    res,
    message,
    [],
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
}
