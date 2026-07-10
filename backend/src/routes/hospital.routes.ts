import { Router } from 'express';
import hospitalController from '../controllers/hospital.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Public routes
 */
router.get('/', hospitalController.getAllHospitals);
router.get('/:id', hospitalController.getHospitalById);

/**
 * Admin routes
 */
router.get('/stats', authenticate, authorize(Role.ADMIN), hospitalController.getHospitalStats);
router.post('/', authenticate, authorize(Role.ADMIN), hospitalController.createHospital);
router.put('/:id', authenticate, authorize(Role.ADMIN), hospitalController.updateHospital);
router.delete('/:id', authenticate, authorize(Role.ADMIN), hospitalController.deleteHospital);

export default router;
