import { Router } from 'express';
import patientController from '../controllers/patient.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Patient routes (requires authentication)
 */
router.get('/me', authenticate, authorize(Role.PATIENT), patientController.getMyProfile);
router.put('/me', authenticate, authorize(Role.PATIENT), patientController.updateMyProfile);

/**
 * Admin routes
 */
router.get('/', authenticate, authorize(Role.ADMIN), patientController.getAllPatients);
router.get('/stats', authenticate, authorize(Role.ADMIN), patientController.getPatientStats);
router.get('/:id', authenticate, authorize(Role.ADMIN), patientController.getPatientById);
router.delete('/:id', authenticate, authorize(Role.ADMIN), patientController.deletePatient);

export default router;
