import { PatientProfile, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class PatientRepository {
  async create(data: Prisma.PatientProfileCreateInput): Promise<PatientProfile> {
    return prisma.patientProfile.create({ data });
  }

  async findById(id: string): Promise<PatientProfile | null> {
    return prisma.patientProfile.findUnique({
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
        area: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<PatientProfile | null> {
    return prisma.patientProfile.findUnique({
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
        area: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async findMany(
    where?: Prisma.PatientProfileWhereInput,
    skip?: number,
    take?: number,
    orderBy?: Prisma.PatientProfileOrderByWithRelationInput
  ): Promise<PatientProfile[]> {
    return prisma.patientProfile.findMany({
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
        area: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.PatientProfileUpdateInput): Promise<PatientProfile> {
    return prisma.patientProfile.update({
      where: { id },
      data,
      include: {
        user: true,
        area: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async updateByUserId(userId: string, data: Prisma.PatientProfileUpdateInput): Promise<PatientProfile> {
    return prisma.patientProfile.update({
      where: { userId },
      data,
      include: {
        user: true,
        area: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<PatientProfile> {
    return prisma.patientProfile.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.PatientProfileWhereInput): Promise<number> {
    return prisma.patientProfile.count({ where });
  }
}

export default new PatientRepository();
