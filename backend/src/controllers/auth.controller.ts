import { Request, Response } from 'express';
import { AuthRequest } from '../types/index.js';
import authService from '../services/auth.service.js';
import { sendSuccess, sendCreated } from '../utils/response.util.js';
import { MESSAGES, COOKIE_OPTIONS } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class AuthController {
  /**
   * Register Patient
   * POST /api/auth/register/patient
   */
  registerPatient = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.registerPatient(req.body);
    sendCreated(res, MESSAGES.REGISTER_SUCCESS, user);
  });

  /**
   * Register Doctor
   * POST /api/auth/register/doctor
   */
  registerDoctor = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.registerDoctor(req.body);
    sendCreated(res, MESSAGES.REGISTER_SUCCESS, user);
  });

  /**
   * Login
   * POST /api/auth/login
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const device = req.headers['user-agent'] || 'unknown';
    const result = await authService.login(req.body, device);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', result.tokens.refreshToken, COOKIE_OPTIONS);

    sendSuccess(res, MESSAGES.LOGIN_SUCCESS, {
      user: result.user,
      accessToken: result.tokens.accessToken,
    });
  });

  /**
   * Refresh Token
   * POST /api/auth/refresh-token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      throw new Error(MESSAGES.REFRESH_TOKEN_NOT_FOUND);
    }

    const tokens = await authService.refreshToken(refreshToken);

    // Set new refresh token in httpOnly cookie
    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS);

    sendSuccess(res, MESSAGES.SUCCESS, {
      accessToken: tokens.accessToken,
    });
  });

  /**
   * Logout
   * POST /api/auth/logout
   */
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    sendSuccess(res, MESSAGES.LOGOUT_SUCCESS);
  });

  /**
   * Verify Email
   * POST /api/auth/verify-email
   */
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    await authService.verifyEmail(req.body.token);
    sendSuccess(res, MESSAGES.EMAIL_VERIFIED);
  });

  /**
   * Auto Verify Email (Development Only)
   * POST /api/auth/auto-verify
   */
  autoVerifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.autoVerifyByEmail(req.body.email);
    sendSuccess(res, result.message);
  });

  /**
   * Resend Verification Email
   * POST /api/auth/resend-verification
   */
  resendVerification = asyncHandler(async (req: Request, res: Response) => {
    await authService.resendVerification(req.body.email);
    sendSuccess(res, MESSAGES.VERIFICATION_EMAIL_SENT);
  });

  /**
   * Forgot Password
   * POST /api/auth/forgot-password
   */
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    await authService.forgotPassword(req.body.email);
    sendSuccess(res, MESSAGES.PASSWORD_RESET_LINK_SENT);
  });

  /**
   * Reset Password
   * POST /api/auth/reset-password
   */
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    await authService.resetPassword(req.body.token, req.body.password);
    sendSuccess(res, MESSAGES.PASSWORD_RESET_SUCCESS);
  });

  /**
   * Change Password
   * POST /api/auth/change-password
   */
  changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
    await authService.changePassword(
      req.user!.id,
      req.body.oldPassword,
      req.body.newPassword
    );
    sendSuccess(res, MESSAGES.PASSWORD_CHANGED);
  });

  /**
   * Get Current User
   * GET /api/auth/me
   */
  getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.getCurrentUser(req.user!.id);
    sendSuccess(res, MESSAGES.SUCCESS, user);
  });
}

export default new AuthController();
