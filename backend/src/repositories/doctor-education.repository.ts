import { DoctorEducation, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class DoctorEducationRepository {
  async create(data: Prisma.DoctorEducationCreateInput): Promise<DoctorEducation> {
    return prisma.doctorEducation.create({ data });
  }

  async findByDoctorId(doctorId: string): Promise<DoctorEducation[]> {
    return prisma.doctorEducation.findMany({
      where: { doctorId },
      orderBy: { startYear: 'desc' },
    });
  }

  async findById(id: string): Promise<DoctorEducation | null> {
    return prisma.doctorEducation.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.DoctorEducationUpdateInput): Promise<DoctorEducation> {
    return prisma.doctorEducation.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<DoctorEducation> {
    return prisma.doctorEducation.delete({
      where: { id },
    });
  }

  async deleteByDoctorId(doctorId: string): Promise<Prisma.BatchPayload> {
    return prisma.doctorEducation.deleteMany({
      where: { doctorId },
    });
  }
}

export default new DoctorEducationRepository();
