import { FavoriteDoctor, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class FavoriteDoctorRepository {
  async create(data: Prisma.FavoriteDoctorCreateInput): Promise<FavoriteDoctor> {
    return prisma.favoriteDoctor.create({ data });
  }

  async findByPatientId(patientId: string, skip?: number, take?: number): Promise<FavoriteDoctor[]> {
    return prisma.favoriteDoctor.findMany({
      where: { patientId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                gender: true,
                city: true,
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
        },
      },
    });
  }

  async findOne(patientId: string, doctorId: string): Promise<FavoriteDoctor | null> {
    return prisma.favoriteDoctor.findUnique({
      where: {
        patientId_doctorId: {
          patientId,
          doctorId,
        },
      },
    });
  }

  async delete(patientId: string, doctorId: string): Promise<FavoriteDoctor> {
    return prisma.favoriteDoctor.delete({
      where: {
        patientId_doctorId: {
          patientId,
          doctorId,
        },
      },
    });
  }

  async count(patientId: string): Promise<number> {
    return prisma.favoriteDoctor.count({
      where: { patientId },
    });
  }

  async exists(patientId: string, doctorId: string): Promise<boolean> {
    const count = await prisma.favoriteDoctor.count({
      where: {
        patientId,
        doctorId,
      },
    });
    return count > 0;
  }
}

export default new FavoriteDoctorRepository();
