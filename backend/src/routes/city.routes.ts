import { Router } from 'express';
import cityController from '../controllers/city.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Public routes
 */
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);

/**
 * Admin routes
 */
router.post('/', authenticate, authorize(Role.ADMIN), cityController.createCity);
router.put('/:id', authenticate, authorize(Role.ADMIN), cityController.updateCity);
router.delete('/:id', authenticate, authorize(Role.ADMIN), cityController.deleteCity);

export default router;
