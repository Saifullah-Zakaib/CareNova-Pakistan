import { Request, Response } from 'express';
import specializationService from '../services/specialization.service.js';
import { sendSuccess, sendCreated } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class SpecializationController {
  /**
   * Get all specializations
   * GET /api/specializations
   */
  getAllSpecializations = asyncHandler(async (_req: Request, res: Response) => {
    const specializations = await specializationService.getAllSpecializations();
    sendSuccess(res, MESSAGES.SUCCESS, specializations);
  });

  /**
   * Get specialization by ID
   * GET /api/specializations/:id
   */
  getSpecializationById = asyncHandler(async (req: Request, res: Response) => {
    const specialization = await specializationService.getSpecializationById(req.params.id as string);
    sendSuccess(res, MESSAGES.SUCCESS, specialization);
  });

  /**
   * Create specialization (Admin)
   * POST /api/specializations
   */
  createSpecialization = asyncHandler(async (req: Request, res: Response) => {
    const specialization = await specializationService.createSpecialization(req.body);
    sendCreated(res, MESSAGES.CREATED, specialization);
  });

  /**
   * Update specialization (Admin)
   * PUT /api/specializations/:id
   */
  updateSpecialization = asyncHandler(async (req: Request, res: Response) => {
    const specialization = await specializationService.updateSpecialization(req.params.id as string, req.body);
    sendSuccess(res, MESSAGES.UPDATED, specialization);
  });

  /**
   * Delete specialization (Admin)
   * DELETE /api/specializations/:id
   */
  deleteSpecialization = asyncHandler(async (req: Request, res: Response) => {
    const result = await specializationService.deleteSpecialization(req.params.id as string);
    sendSuccess(res, result.message);
  });
}

export default new SpecializationController();
