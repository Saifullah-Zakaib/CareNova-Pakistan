import { DoctorProfile, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class DoctorRepository {
  async create(data: Prisma.DoctorProfileCreateInput): Promise<DoctorProfile> {
    return prisma.doctorProfile.create({ data });
  }

  async findById(id: string): Promise<DoctorProfile | null> {
    return prisma.doctorProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            profileImage: true,
            gender: true,
            dateOfBirth: true,
            city: true,
            createdAt: true,
          },
        },
        specialization: true,
        hospital: {
          include: {
            city: true,
            area: true,
          },
        },
        availability: true,
        education: {
          orderBy: { startYear: 'desc' },
        },
        experience: {
          orderBy: { startDate: 'desc' },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<DoctorProfile | null> {
    return prisma.doctorProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            profileImage: true,
            gender: true,
            dateOfBirth: true,
            city: true,
            createdAt: true,
          },
        },
        specialization: true,
        hospital: {
          include: {
            city: true,
            area: true,
          },
        },
        availability: true,
        education: {
          orderBy: { startYear: 'desc' },
        },
        experience: {
          orderBy: { startDate: 'desc' },
        },
      },
    });
  }

  async findMany(
    where?: Prisma.DoctorProfileWhereInput,
    skip?: number,
    take?: number,
    orderBy?: Prisma.DoctorProfileOrderByWithRelationInput
  ): Promise<DoctorProfile[]> {
    return prisma.doctorProfile.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            profileImage: true,
            gender: true,
            dateOfBirth: true,
            city: true,
            createdAt: true,
          },
        },
        specialization: true,
        hospital: {
          include: {
            city: true,
            area: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.DoctorProfileUpdateInput): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { id },
      data,
      include: {
        user: true,
        specialization: true,
        hospital: true,
      },
    });
  }

  async updateByUserId(userId: string, data: Prisma.DoctorProfileUpdateInput): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { userId },
      data,
      include: {
        user: true,
        specialization: true,
        hospital: true,
      },
    });
  }

  async delete(id: string): Promise<DoctorProfile> {
    return prisma.doctorProfile.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.DoctorProfileWhereInput): Promise<number> {
    return prisma.doctorProfile.count({ where });
  }

  async findByPmdcLicense(pmdcLicenseNumber: string): Promise<DoctorProfile | null> {
    return prisma.doctorProfile.findUnique({
      where: { pmdcLicenseNumber },
    });
  }

  async approve(id: string, approvedBy: string): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
        approvedBy,
      },
    });
  }

  async reject(id: string, reason: string): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectionReason: reason,
      },
    });
  }

  async suspend(id: string, reason: string): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { id },
      data: {
        status: 'SUSPENDED',
        rejectionReason: reason,
      },
    });
  }

  async block(id: string, reason: string): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { id },
      data: {
        status: 'BLOCKED',
        rejectionReason: reason,
      },
    });
  }

  async updateRating(id: string, rating: number, reviewsCount: number): Promise<DoctorProfile> {
    return prisma.doctorProfile.update({
      where: { id },
      data: {
        rating,
        reviewsCount,
      },
    });
  }
}

export default new DoctorRepository();
