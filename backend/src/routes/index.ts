import { Router } from 'express';
import authRoutes from './auth.routes.js';
import doctorRoutes from './doctor.routes.js';
import patientRoutes from './patient.routes.js';
import cityRoutes from './city.routes.js';
import areaRoutes from './area.routes.js';
import specializationRoutes from './specialization.routes.js';
import hospitalRoutes from './hospital.routes.js';
import favoriteDoctorRoutes from './favorite-doctor.routes.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'CareNova Pakistan API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/cities', cityRoutes);
router.use('/areas', areaRoutes);
router.use('/specializations', specializationRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/favorite-doctors', favoriteDoctorRoutes);

export default router;
