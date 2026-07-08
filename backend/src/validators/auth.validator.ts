import { z } from 'zod';
import { PASSWORD_REGEX, PHONE_REGEX, PMDC_REGEX } from '../constants/index.js';

// Patient Registration Schema
export const patientRegisterSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().regex(PHONE_REGEX, 'Phone number must be in format +92XXXXXXXXXX'),
    password: z.string().regex(PASSWORD_REGEX, 'Password must be at least 8 characters and contain uppercase, lowercase, number and special character'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    acceptTerms: z.boolean().refine((val) => val === true, 'You must accept terms and conditions'),
  }),
});

// Doctor Registration Schema
export const doctorRegisterSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().regex(PHONE_REGEX, 'Phone number must be in format +92XXXXXXXXXX'),
    password: z.string().regex(PASSWORD_REGEX, 'Password must be at least 8 characters and contain uppercase, lowercase, number and special character'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    qualification: z.string().min(2, 'Qualification is required'),
    specialization: z.string().min(2, 'Specialization is required'),
    yearsOfExperience: z.number().min(0, 'Years of experience must be at least 0').max(60),
    pmdcLicenseNumber: z.string().regex(PMDC_REGEX, 'Invalid PMDC license number format'),
    consultationFee: z.number().min(0, 'Consultation fee must be at least 0'),
    hospitalName: z.string().min(2, 'Hospital name is required'),
    languages: z.array(z.string()).min(1, 'At least one language is required'),
    bio: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, 'You must accept terms and conditions'),
  }),
});

// Login Schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().regex(PASSWORD_REGEX, 'Password must be at least 8 characters and contain uppercase, lowercase, number and special character'),
  }),
});

// Change Password Schema
export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().regex(PASSWORD_REGEX, 'Password must be at least 8 characters and contain uppercase, lowercase, number and special character'),
  }),
});

// Verify Email Schema
export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
});

// Refresh Token Schema
export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});
