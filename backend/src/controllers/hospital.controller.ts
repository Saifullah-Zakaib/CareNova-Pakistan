import { Request, Response } from 'express';
import hospitalService from '../services/hospital.service.js';
import { sendSuccess, sendCreated } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class HospitalController {
  /**
   * Get all hospitals with pagination and filters
   * GET /api/hospitals
   */
  getAllHospitals = asyncHandler(async (req: Request, res: Response) => {
    const result = await hospitalService.getAllHospitals(req.query);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });

  /**
   * Get hospital by ID
   * GET /api/hospitals/:id
   */
  getHospitalById = asyncHandler(async (req: Request, res: Response) => {
    const hospital = await hospitalService.getHospitalById(req.params.id as string);
    sendSuccess(res, MESSAGES.SUCCESS, hospital);
  });

  /**
   * Create hospital (Admin)
   * POST /api/hospitals
   */
  createHospital = asyncHandler(async (req: Request, res: Response) => {
    const hospital = await hospitalService.createHospital(req.body);
    sendCreated(res, MESSAGES.CREATED, hospital);
  });

  /**
   * Update hospital (Admin)
   * PUT /api/hospitals/:id
   */
  updateHospital = asyncHandler(async (req: Request, res: Response) => {
    const hospital = await hospitalService.updateHospital(req.params.id as string, req.body);
    sendSuccess(res, MESSAGES.UPDATED, hospital);
  });

  /**
   * Delete hospital (Admin)
   * DELETE /api/hospitals/:id
   */
  deleteHospital = asyncHandler(async (req: Request, res: Response) => {
    const result = await hospitalService.deleteHospital(req.params.id as string);
    sendSuccess(res, result.message);
  });

  /**
   * Get hospital statistics (Admin)
   * GET /api/hospitals/stats
   */
  getHospitalStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await hospitalService.getHospitalStats();
    sendSuccess(res, MESSAGES.SUCCESS, stats);
  });
}

export default new HospitalController();
