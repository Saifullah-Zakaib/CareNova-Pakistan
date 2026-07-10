import { Request, Response } from 'express';
import areaService from '../services/area.service.js';
import { sendSuccess, sendCreated } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class AreaController {
  /**
   * Get all areas (optionally filtered by city)
   * GET /api/areas?cityId=xxx
   */
  getAllAreas = asyncHandler(async (req: Request, res: Response) => {
    const areas = await areaService.getAllAreas(req.query.cityId as string);
    sendSuccess(res, MESSAGES.SUCCESS, areas);
  });

  /**
   * Get areas by city
   * GET /api/areas/city/:cityId
   */
  getAreasByCity = asyncHandler(async (req: Request, res: Response) => {
    const areas = await areaService.getAreasByCity(req.params.cityId as string);
    sendSuccess(res, MESSAGES.SUCCESS, areas);
  });

  /**
   * Get area by ID
   * GET /api/areas/:id
   */
  getAreaById = asyncHandler(async (req: Request, res: Response) => {
    const area = await areaService.getAreaById(req.params.id as string);
    sendSuccess(res, MESSAGES.SUCCESS, area);
  });

  /**
   * Create area (Admin)
   * POST /api/areas
   */
  createArea = asyncHandler(async (req: Request, res: Response) => {
    const area = await areaService.createArea(req.body);
    sendCreated(res, MESSAGES.CREATED, area);
  });

  /**
   * Update area (Admin)
   * PUT /api/areas/:id
   */
  updateArea = asyncHandler(async (req: Request, res: Response) => {
    const area = await areaService.updateArea(req.params.id as string, req.body);
    sendSuccess(res, MESSAGES.UPDATED, area);
  });

  /**
   * Delete area (Admin)
   * DELETE /api/areas/:id
   */
  deleteArea = asyncHandler(async (req: Request, res: Response) => {
    const result = await areaService.deleteArea(req.params.id as string);
    sendSuccess(res, result.message);
  });
}

export default new AreaController();
