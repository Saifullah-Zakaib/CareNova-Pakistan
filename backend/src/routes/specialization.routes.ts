import { Router } from 'express';
import specializationController from '../controllers/specialization.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Public routes
 */
router.get('/', specializationController.getAllSpecializations);
router.get('/:id', specializationController.getSpecializationById);

/**
 * Admin routes
 */
router.post('/', authenticate, authorize(Role.ADMIN), specializationController.createSpecialization);
router.put('/:id', authenticate, authorize(Role.ADMIN), specializationController.updateSpecialization);
router.delete('/:id', authenticate, authorize(Role.ADMIN), specializationController.deleteSpecialization);

export default router;
