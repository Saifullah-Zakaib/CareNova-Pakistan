import { Role } from '@prisma/client';
import prisma from '../config/database.config.js';
import userRepository from '../repositories/user.repository.js';
import refreshTokenRepository from '../repositories/refresh-token.repository.js';
import emailVerificationRepository from '../repositories/email-verification.repository.js';
import passwordResetRepository from '../repositories/password-reset.repository.js';
import { hashPassword, comparePassword } from '../utils/password.util.js';
import { generateTokenPair, generateRandomToken, verifyRefreshToken } from '../utils/jwt.util.js';
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } from '../utils/email.util.js';
import { MESSAGES, TOKEN_EXPIRY } from '../constants/index.js';

interface RegisterPatientDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  city: string;
}

interface RegisterDoctorDto extends RegisterPatientDto {
  qualification: string;
  specialization?: string; // specializationId
  yearsOfExperience: number;
  pmdcLicenseNumber: string;
  consultationFee: number;
  hospitalName: string;
  languages: string[];
  bio?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

class AuthService {
  /**
   * Register a new patient
   */
  async registerPatient(data: RegisterPatientDto) {
    // Check if email exists
    const existingEmail = await userRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Check if phone exists
    const existingPhone = await userRepository.findByPhoneNumber(data.phoneNumber);
    if (existingPhone) {
      throw new Error(MESSAGES.PHONE_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user and patient profile in transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: hashedPassword,
          role: Role.PATIENT,
          gender: data.gender,
          dateOfBirth: new Date(data.dateOfBirth),
          city: data.city,
          patientProfile: {
            create: {},
          },
        },
        include: {
          patientProfile: true,
        },
      });

      // Create verification token
      const token = generateRandomToken();
      await tx.emailVerification.create({
        data: {
          userId: newUser.id,
          token,
          expiresAt: new Date(Date.now() + TOKEN_EXPIRY.EMAIL_VERIFICATION),
        },
      });

      // Send verification email (don't block if it fails)
      try {
        await sendVerificationEmail(
          newUser.email,
          `${newUser.firstName} ${newUser.lastName}`,
          token
        );
      } catch (emailError) {
        // Log but don't fail registration
        console.error('Failed to send verification email:', emailError);
      }

      return newUser;
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Register a new doctor
   */
  async registerDoctor(data: RegisterDoctorDto) {
    // Check if email exists
    const existingEmail = await userRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Check if phone exists
    const existingPhone = await userRepository.findByPhoneNumber(data.phoneNumber);
    if (existingPhone) {
      throw new Error(MESSAGES.PHONE_ALREADY_EXISTS);
    }

    // Check if PMDC license exists
    const existingPmdc = await prisma.doctorProfile.findUnique({
      where: { pmdcLicenseNumber: data.pmdcLicenseNumber },
    });
    if (existingPmdc) {
      throw new Error(MESSAGES.PMDC_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user and doctor profile in transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: hashedPassword,
          role: Role.DOCTOR,
          gender: data.gender,
          dateOfBirth: new Date(data.dateOfBirth),
          city: data.city,
          doctorProfile: {
            create: {
              qualification: data.qualification,
              specialization: data.specialization
                ? { connect: { id: data.specialization } }
                : undefined,
              yearsOfExperience: data.yearsOfExperience,
              pmdcLicenseNumber: data.pmdcLicenseNumber,
              consultationFee: data.consultationFee,
              hospitalName: data.hospitalName,
              languages: data.languages,
              bio: data.bio,
            },
          },
        },
        include: {
          doctorProfile: true,
        },
      });

      // Create verification token
      const token = generateRandomToken();
      await tx.emailVerification.create({
        data: {
          userId: newUser.id,
          token,
          expiresAt: new Date(Date.now() + TOKEN_EXPIRY.EMAIL_VERIFICATION),
        },
      });

      // Send verification email (don't block if it fails)
      try {
        await sendVerificationEmail(
          newUser.email,
          `Dr. ${newUser.firstName} ${newUser.lastName}`,
          token
        );
      } catch (emailError) {
        // Log but don't fail registration
        console.error('Failed to send verification email:', emailError);
      }

      return newUser;
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Login user
   */
  async login(data: LoginDto, device?: string) {
    // Find user by email
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if password matches
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new Error(MESSAGES.EMAIL_NOT_VERIFIED);
    }

    // Check if account is active
    if (!user.isActive) {
      throw new Error(MESSAGES.ACCOUNT_INACTIVE);
    }

    // Check if account is blocked
    if (user.isBlocked) {
      throw new Error(MESSAGES.ACCOUNT_BLOCKED);
    }

    // Check if account is deleted
    if (user.deletedAt) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // For doctors, check approval status
    if (user.role === Role.DOCTOR) {
      const doctorProfile = await prisma.doctorProfile.findUnique({
        where: { userId: user.id },
      });

      if (doctorProfile) {
        if (doctorProfile.status === 'PENDING') {
          throw new Error(MESSAGES.DOCTOR_PENDING_APPROVAL);
        }
        if (doctorProfile.status === 'REJECTED') {
          throw new Error(MESSAGES.DOCTOR_REJECTED);
        }
        if (doctorProfile.status === 'SUSPENDED') {
          throw new Error(MESSAGES.DOCTOR_SUSPENDED);
        }
        if (doctorProfile.status === 'BLOCKED') {
          throw new Error(MESSAGES.DOCTOR_BLOCKED);
        }
      }
    }

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await refreshTokenRepository.create({
      user: { connect: { id: user.id } },
      token: tokens.refreshToken,
      device: device || 'unknown',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Update last login
    await userRepository.updateLastLogin(user.id);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string) {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Check if token exists in database
    const storedToken = await refreshTokenRepository.findByToken(refreshToken);
    if (!storedToken) {
      throw new Error(MESSAGES.REFRESH_TOKEN_NOT_FOUND);
    }

    // Check if token is revoked
    if (storedToken.isRevoked) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      throw new Error(MESSAGES.TOKEN_EXPIRED);
    }

    // Generate new tokens
    const tokens = generateTokenPair({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    // Revoke old refresh token
    await refreshTokenRepository.revokeToken(refreshToken);

    // Store new refresh token
    await refreshTokenRepository.create({
      user: { connect: { id: decoded.userId } },
      token: tokens.refreshToken,
      device: storedToken.device,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return tokens;
  }

  /**
   * Logout user
   */
  async logout(refreshToken: string) {
    await refreshTokenRepository.revokeToken(refreshToken);
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string) {
    // Find valid token
    const verification = await emailVerificationRepository.findValidToken(token);
    if (!verification) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Get user
    const user = await userRepository.findById(verification.userId);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Update user and mark token as used in transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: verification.userId },
        data: { isEmailVerified: true },
      });

      await tx.emailVerification.update({
        where: { id: verification.id },
        data: { isUsed: true },
      });
    });

    // Send welcome email (don't block if it fails)
    try {
      await sendWelcomeEmail(
        user.email,
        `${user.firstName} ${user.lastName}`
      );
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }
  }

  /**
   * Auto-verify user by email (for testing only)
   */
  async autoVerifyByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw new Error('Email is already verified');
    }

    await userRepository.update(user.id, {
      isEmailVerified: true,
    });

    return { message: 'Email verified successfully' };
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw new Error('Email is already verified');
    }

    // Create new verification token
    const token = generateRandomToken();
    await emailVerificationRepository.create({
      user: { connect: { id: user.id } },
      token,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRY.EMAIL_VERIFICATION),
    });

    // Send verification email
    await sendVerificationEmail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      token
    );
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Invalidate previous tokens
    await passwordResetRepository.invalidateUserTokens(user.id);

    // Create reset token
    const token = generateRandomToken();
    await passwordResetRepository.create({
      user: { connect: { id: user.id } },
      token,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRY.PASSWORD_RESET),
    });

    // Send reset email
    await sendPasswordResetEmail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      token
    );
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    // Find valid token
    const reset = await passwordResetRepository.findValidToken(token);
    if (!reset) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and mark token as used in transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: reset.userId },
        data: { password: hashedPassword },
      });

      await tx.passwordReset.update({
        where: { id: reset.id },
        data: { isUsed: true },
      });

      // Revoke all refresh tokens
      await tx.refreshToken.updateMany({
        where: { userId: reset.userId },
        data: { isRevoked: true },
      });
    });
  }

  /**
   * Change password
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Verify old password
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error(MESSAGES.INVALID_OLD_PASSWORD);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and revoke all refresh tokens
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      await tx.refreshToken.updateMany({
        where: { userId },
        data: { isRevoked: true },
      });
    });
  }

  /**
   * Get current user
   */
  async getCurrentUser(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new AuthService();
