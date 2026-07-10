import { Response } from 'express';
import { AuthRequest } from '../types/index.js';
import favoriteDoctorService from '../services/favorite-doctor.service.js';
import { sendSuccess, sendCreated } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class FavoriteDoctorController {
  /**
   * Get favorite doctors
   * GET /api/favorite-doctors
   */
  getFavoriteDoctors = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await favoriteDoctorService.getFavoriteDoctors(req.user!.id, req.query);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });

  /**
   * Add doctor to favorites
   * POST /api/favorite-doctors/:doctorId
   */
  addFavoriteDoctor = asyncHandler(async (req: AuthRequest, res: Response) => {
    const favorite = await favoriteDoctorService.addFavoriteDoctor(req.user!.id, req.params.doctorId as string);
    sendCreated(res, 'Doctor added to favorites', favorite);
  });

  /**
   * Remove doctor from favorites
   * DELETE /api/favorite-doctors/:doctorId
   */
  removeFavoriteDoctor = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await favoriteDoctorService.removeFavoriteDoctor(req.user!.id, req.params.doctorId as string);
    sendSuccess(res, result.message);
  });

  /**
   * Check if doctor is favorited
   * GET /api/favorite-doctors/:doctorId/check
   */
  checkFavorite = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await favoriteDoctorService.isFavorited(req.user!.id, req.params.doctorId as string);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });
}

export default new FavoriteDoctorController();
