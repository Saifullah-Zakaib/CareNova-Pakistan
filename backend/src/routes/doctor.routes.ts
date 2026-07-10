import { Router } from 'express';
import doctorController from '../controllers/doctor.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Public routes
 */
router.get('/search', doctorController.searchDoctors);
router.get('/:id', doctorController.getDoctorProfile);

/**
 * Doctor routes (requires authentication)
 */
router.get('/me', authenticate, authorize(Role.DOCTOR), doctorController.getMyProfile);
router.put('/me', authenticate, authorize(Role.DOCTOR), doctorController.updateMyProfile);

/**
 * Admin routes
 */
router.get('/', authenticate, authorize(Role.ADMIN), doctorController.getAllDoctors);
router.get('/stats', authenticate, authorize(Role.ADMIN), doctorController.getDoctorStats);
router.post('/:id/approve', authenticate, authorize(Role.ADMIN), doctorController.approveDoctor);
router.post('/:id/reject', authenticate, authorize(Role.ADMIN), doctorController.rejectDoctor);
router.post('/:id/suspend', authenticate, authorize(Role.ADMIN), doctorController.suspendDoctor);
router.post('/:id/block', authenticate, authorize(Role.ADMIN), doctorController.blockDoctor);

export default router;
