import { Request, Response } from 'express';
import { AuthRequest } from '../types/index.js';
import patientService from '../services/patient.service.js';
import { sendSuccess } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class PatientController {
  /**
   * Get current patient's profile
   * GET /api/patients/me
   */
  getMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const patient = await patientService.getPatientProfileByUserId(req.user!.id);
    sendSuccess(res, MESSAGES.SUCCESS, patient);
  });

  /**
   * Update patient profile
   * PUT /api/patients/me
   */
  updateMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const patient = await patientService.updatePatientProfile(req.user!.id, req.body);
    sendSuccess(res, MESSAGES.UPDATED, patient);
  });

  /**
   * Get patient by ID (Admin)
   * GET /api/patients/:id
   */
  getPatientById = asyncHandler(async (req: Request, res: Response) => {
    const patient = await patientService.getPatientProfile(req.params.id as string);
    sendSuccess(res, MESSAGES.SUCCESS, patient);
  });

  /**
   * Get all patients (Admin)
   * GET /api/patients
   */
  getAllPatients = asyncHandler(async (req: Request, res: Response) => {
    const result = await patientService.getAllPatients(req.query);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });

  /**
   * Delete patient (Admin)
   * DELETE /api/patients/:id
   */
  deletePatient = asyncHandler(async (req: Request, res: Response) => {
    const result = await patientService.deletePatient(req.params.id as string);
    sendSuccess(res, result.message);
  });

  /**
   * Get patient statistics (Admin)
   * GET /api/patients/stats
   */
  getPatientStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await patientService.getPatientStats();
    sendSuccess(res, MESSAGES.SUCCESS, stats);
  });
}

export default new PatientController();
