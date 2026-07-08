import { PasswordReset, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';
import { IPasswordResetRepository } from '../interfaces/repository.interface.js';

class PasswordResetRepository implements IPasswordResetRepository {
  async create(data: Prisma.PasswordResetCreateInput): Promise<PasswordReset> {
    return prisma.passwordReset.create({ data });
  }

  async findById(id: string): Promise<PasswordReset | null> {
    return prisma.passwordReset.findUnique({ where: { id } });
  }

  async findOne(where: Prisma.PasswordResetWhereInput): Promise<PasswordReset | null> {
    return prisma.passwordReset.findFirst({ where });
  }

  async findMany(where?: Prisma.PasswordResetWhereInput): Promise<PasswordReset[]> {
    return prisma.passwordReset.findMany({ where });
  }

  async update(id: string, data: Prisma.PasswordResetUpdateInput): Promise<PasswordReset> {
    return prisma.passwordReset.update({ where: { id }, data });
  }

  async delete(id: string): Promise<PasswordReset> {
    return prisma.passwordReset.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<PasswordReset> {
    throw new Error('Soft delete not implemented for PasswordReset');
  }

  async count(where?: Prisma.PasswordResetWhereInput): Promise<number> {
    return prisma.passwordReset.count({ where });
  }

  async findValidToken(token: string): Promise<PasswordReset | null> {
    return prisma.passwordReset.findFirst({
      where: {
        token,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });
  }

  async markAsUsed(id: string): Promise<PasswordReset> {
    return prisma.passwordReset.update({
      where: { id },
      data: { isUsed: true },
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    await prisma.passwordReset.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    await prisma.passwordReset.updateMany({
      where: { userId, isUsed: false },
      data: { isUsed: true },
    });
  }
}

export default new PasswordResetRepository();
