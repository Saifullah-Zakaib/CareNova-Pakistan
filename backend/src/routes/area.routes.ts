import { Router } from 'express';
import areaController from '../controllers/area.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

/**
 * Public routes
 */
router.get('/', areaController.getAllAreas);
router.get('/city/:cityId', areaController.getAreasByCity);
router.get('/:id', areaController.getAreaById);

/**
 * Admin routes
 */
router.post('/', authenticate, authorize(Role.ADMIN), areaController.createArea);
router.put('/:id', authenticate, authorize(Role.ADMIN), areaController.updateArea);
router.delete('/:id', authenticate, authorize(Role.ADMIN), areaController.deleteArea);

export default router;
