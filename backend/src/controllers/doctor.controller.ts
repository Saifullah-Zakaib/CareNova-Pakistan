import { Request, Response } from 'express';
import { AuthRequest } from '../types/index.js';
import doctorService from '../services/doctor.service.js';
import { sendSuccess } from '../utils/response.util.js';
import { MESSAGES } from '../constants/index.js';
import { asyncHandler } from '../middleware/error.middleware.js';

class DoctorController {
  /**
   * Search doctors with filters
   * GET /api/doctors/search
   */
  searchDoctors = asyncHandler(async (req: Request, res: Response) => {
    const result = await doctorService.searchDoctors(req.query);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });

  /**
   * Get doctor public profile
   * GET /api/doctors/:id
   */
  getDoctorProfile = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.getDoctorProfile(req.params.id as string);
    sendSuccess(res, MESSAGES.SUCCESS, doctor);
  });

  /**
   * Get current doctor's profile
   * GET /api/doctors/me
   */
  getMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const doctor = await doctorService.getDoctorProfileByUserId(req.user!.id);
    sendSuccess(res, MESSAGES.SUCCESS, doctor);
  });

  /**
   * Update doctor profile
   * PUT /api/doctors/me
   */
  updateMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const doctor = await doctorService.updateDoctorProfile(req.user!.id, req.body);
    sendSuccess(res, MESSAGES.UPDATED, doctor);
  });

  /**
   * Get all doctors (Admin)
   * GET /api/doctors
   */
  getAllDoctors = asyncHandler(async (req: Request, res: Response) => {
    const result = await doctorService.getAllDoctors(req.query);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });

  /**
   * Approve doctor (Admin)
   * POST /api/doctors/:id/approve
   */
  approveDoctor = asyncHandler(async (req: AuthRequest, res: Response) => {
    const doctor = await doctorService.approveDoctor(req.params.id as string, req.user!.id);
    sendSuccess(res, 'Doctor approved successfully', doctor);
  });

  /**
   * Reject doctor (Admin)
   * POST /api/doctors/:id/reject
   */
  rejectDoctor = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.rejectDoctor(req.params.id as string, req.body.reason);
    sendSuccess(res, 'Doctor rejected', doctor);
  });

  /**
   * Suspend doctor (Admin)
   * POST /api/doctors/:id/suspend
   */
  suspendDoctor = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.suspendDoctor(req.params.id as string, req.body.reason);
    sendSuccess(res, 'Doctor suspended', doctor);
  });

  /**
   * Block doctor (Admin)
   * POST /api/doctors/:id/block
   */
  blockDoctor = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.blockDoctor(req.params.id as string, req.body.reason);
    sendSuccess(res, 'Doctor blocked', doctor);
  });

  /**
   * Get doctor statistics (Admin)
   * GET /api/doctors/stats
   */
  getDoctorStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await doctorService.getDoctorStats();
    sendSuccess(res, MESSAGES.SUCCESS, stats);
  });
}

export default new DoctorController();
