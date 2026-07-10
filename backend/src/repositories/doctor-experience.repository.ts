import { DoctorExperience, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class DoctorExperienceRepository {
  async create(data: Prisma.DoctorExperienceCreateInput): Promise<DoctorExperience> {
    return prisma.doctorExperience.create({ data });
  }

  async findByDoctorId(doctorId: string): Promise<DoctorExperience[]> {
    return prisma.doctorExperience.findMany({
      where: { doctorId },
      orderBy: { startDate: 'desc' },
    });
  }

  async findById(id: string): Promise<DoctorExperience | null> {
    return prisma.doctorExperience.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.DoctorExperienceUpdateInput): Promise<DoctorExperience> {
    return prisma.doctorExperience.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<DoctorExperience> {
    return prisma.doctorExperience.delete({
      where: { id },
    });
  }

  async deleteByDoctorId(doctorId: string): Promise<Prisma.BatchPayload> {
    return prisma.doctorExperience.deleteMany({
      where: { doctorId },
    });
  }

  async findCurrentPosition(doctorId: string): Promise<DoctorExperience | null> {
    return prisma.doctorExperience.findFirst({
      where: {
        doctorId,
        isCurrent: true,
      },
    });
  }
}

export default new DoctorExperienceRepository();
