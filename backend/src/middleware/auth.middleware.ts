import { Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { AuthRequest } from '../types/index.js';
import { verifyAccessToken } from '../utils/jwt.util.js';
import { sendUnauthorized, sendForbidden } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import prisma from '../config/database.config.js';

/**
 * Authentication middleware - verifies JWT token
 */
export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendUnauthorized(res, MESSAGES.UNAUTHORIZED);
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyAccessToken(token);

    // Check if user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        isBlocked: true,
        deletedAt: true,
      },
    });

    if (!user || user.deletedAt) {
      sendUnauthorized(res, MESSAGES.USER_NOT_FOUND);
      return;
    }

    if (user.isBlocked) {
      sendForbidden(res, MESSAGES.ACCOUNT_BLOCKED);
      return;
    }

    if (!user.isActive) {
      sendForbidden(res, MESSAGES.ACCOUNT_INACTIVE);
      return;
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };

    next();
  } catch (error: any) {
    sendUnauthorized(res, error.message || MESSAGES.INVALID_TOKEN);
  }
}

/**
 * Authorization middleware factory - checks user role
 */
export function authorize(...allowedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendUnauthorized(res, MESSAGES.UNAUTHORIZED);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendForbidden(res, MESSAGES.FORBIDDEN);
      return;
    }

    next();
  };
}

/**
 * Email verification check middleware
 */
export function requireEmailVerification(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    sendUnauthorized(res, MESSAGES.UNAUTHORIZED);
    return;
  }

  if (!req.user.isEmailVerified) {
    sendForbidden(res, MESSAGES.EMAIL_NOT_VERIFIED);
    return;
  }

  next();
}
