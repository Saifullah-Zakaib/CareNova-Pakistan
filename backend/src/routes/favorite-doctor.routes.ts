import { Router } from 'express';
import favoriteDoctorController from '../controllers/favorite-doctor.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Patient routes (requires authentication)
 */
router.get('/', authenticate, authorize(Role.PATIENT), favoriteDoctorController.getFavoriteDoctors);
router.post('/:doctorId', authenticate, authorize(Role.PATIENT), favoriteDoctorController.addFavoriteDoctor);
router.delete('/:doctorId', authenticate, authorize(Role.PATIENT), favoriteDoctorController.removeFavoriteDoctor);
router.get('/:doctorId/check', authenticate, authorize(Role.PATIENT), favoriteDoctorController.checkFavorite);

export default router;
