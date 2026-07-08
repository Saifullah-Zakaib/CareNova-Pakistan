import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../src/utils/password.util.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Get admin credentials from environment
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@carenova.pk';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
  const adminLastName = process.env.ADMIN_LAST_NAME || 'CareNova';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  // Hash admin password
  const hashedPassword = await hashPassword(adminPassword);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail,
      phoneNumber: '+923001234567',
      password: hashedPassword,
      role: Role.ADMIN,
      isEmailVerified: true,
      isActive: true,
      gender: 'MALE',
      city: 'Lahore',
    },
  });

  console.log('✅ Admin user created successfully');
  console.log(`📧 Email: ${admin.email}`);
  console.log(`🔑 Password: ${adminPassword}`);
  console.log('⚠️  Please change the admin password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
