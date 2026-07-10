import { Request, Response } from 'express';
import cityService from '../services/city.service.js';
import { sendSuccess, sendCreated } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class CityController {
  /**
   * Get all cities
   * GET /api/cities
   */
  getAllCities = asyncHandler(async (_req: Request, res: Response) => {
    const cities = await cityService.getAllCities();
    sendSuccess(res, MESSAGES.SUCCESS, cities);
  });

  /**
   * Get city by ID
   * GET /api/cities/:id
   */
  getCityById = asyncHandler(async (req: Request, res: Response) => {
    const city = await cityService.getCityById(req.params.id as string);
    sendSuccess(res, MESSAGES.SUCCESS, city);
  });

  /**
   * Create city (Admin)
   * POST /api/cities
   */
  createCity = asyncHandler(async (req: Request, res: Response) => {
    const city = await cityService.createCity(req.body);
    sendCreated(res, MESSAGES.CREATED, city);
  });

  /**
   * Update city (Admin)
   * PUT /api/cities/:id
   */
  updateCity = asyncHandler(async (req: Request, res: Response) => {
    const city = await cityService.updateCity(req.params.id as string, req.body);
    sendSuccess(res, MESSAGES.UPDATED, city);
  });

  /**
   * Delete city (Admin)
   * DELETE /api/cities/:id
   */
  deleteCity = asyncHandler(async (req: Request, res: Response) => {
    const result = await cityService.deleteCity(req.params.id as string);
    sendSuccess(res, result.message);
  });
}

export default new CityController();
