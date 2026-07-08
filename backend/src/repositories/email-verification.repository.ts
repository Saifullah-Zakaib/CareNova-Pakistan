import { EmailVerification, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';
import { IEmailVerificationRepository } from '../interfaces/repository.interface.js';

class EmailVerificationRepository implements IEmailVerificationRepository {
  async create(data: Prisma.EmailVerificationCreateInput): Promise<EmailVerification> {
    return prisma.emailVerification.create({ data });
  }

  async findById(id: string): Promise<EmailVerification | null> {
    return prisma.emailVerification.findUnique({ where: { id } });
  }

  async findOne(where: Prisma.EmailVerificationWhereInput): Promise<EmailVerification | null> {
    return prisma.emailVerification.findFirst({ where });
  }

  async findMany(where?: Prisma.EmailVerificationWhereInput): Promise<EmailVerification[]> {
    return prisma.emailVerification.findMany({ where });
  }

  async update(id: string, data: Prisma.EmailVerificationUpdateInput): Promise<EmailVerification> {
    return prisma.emailVerification.update({ where: { id }, data });
  }

  async delete(id: string): Promise<EmailVerification> {
    return prisma.emailVerification.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<EmailVerification> {
    throw new Error('Soft delete not implemented for EmailVerification');
  }

  async count(where?: Prisma.EmailVerificationWhereInput): Promise<number> {
    return prisma.emailVerification.count({ where });
  }

  async findValidToken(token: string): Promise<EmailVerification | null> {
    return prisma.emailVerification.findFirst({
      where: {
        token,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });
  }

  async markAsUsed(id: string): Promise<EmailVerification> {
    return prisma.emailVerification.update({
      where: { id },
      data: { isUsed: true },
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    await prisma.emailVerification.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}

export default new EmailVerificationRepository();
