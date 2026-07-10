import { PrismaClient, Role, HospitalType, ConsultationType, DoctorStatus, Gender } from '@prisma/client';
import { hashPassword } from '../src/utils/password.util.js';
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    const cities = [
        { name: 'Islamabad', slug: 'islamabad' },
        { name: 'Lahore', slug: 'lahore' },
        { name: 'Karachi', slug: 'karachi' },
        { name: 'Peshawar', slug: 'peshawar' },
        { name: 'Multan', slug: 'multan' },
        { name: 'Faisalabad', slug: 'faisalabad' },
        { name: 'Quetta', slug: 'quetta' },
        { name: 'Rawalpindi', slug: 'rawalpindi' },
        { name: 'Sialkot', slug: 'sialkot' },
        { name: 'Gujranwala', slug: 'gujranwala' },
    ];
    console.log('📍 Creating cities...');
    for (const city of cities) {
        await prisma.city.upsert({
            where: { slug: city.slug },
            update: {},
            create: city,
        });
    }
    console.log(`✅ ${cities.length} cities created`);
    const islamabad = await prisma.city.findUnique({ where: { slug: 'islamabad' } });
    if (islamabad) {
        const islamabadAreas = [
            { name: 'F-6', slug: 'f-6', cityId: islamabad.id },
            { name: 'F-7', slug: 'f-7', cityId: islamabad.id },
            { name: 'F-8', slug: 'f-8', cityId: islamabad.id },
            { name: 'F-10', slug: 'f-10', cityId: islamabad.id },
            { name: 'G-6', slug: 'g-6', cityId: islamabad.id },
            { name: 'G-7', slug: 'g-7', cityId: islamabad.id },
            { name: 'G-8', slug: 'g-8', cityId: islamabad.id },
            { name: 'G-9', slug: 'g-9', cityId: islamabad.id },
            { name: 'G-10', slug: 'g-10', cityId: islamabad.id },
            { name: 'G-11', slug: 'g-11', cityId: islamabad.id },
            { name: 'Blue Area', slug: 'blue-area', cityId: islamabad.id },
            { name: 'I-8', slug: 'i-8', cityId: islamabad.id },
            { name: 'I-9', slug: 'i-9', cityId: islamabad.id },
            { name: 'I-10', slug: 'i-10', cityId: islamabad.id },
            { name: 'Bahria Town', slug: 'bahria-town', cityId: islamabad.id },
            { name: 'DHA Phase 1', slug: 'dha-phase-1-islamabad', cityId: islamabad.id },
            { name: 'DHA Phase 2', slug: 'dha-phase-2-islamabad', cityId: islamabad.id },
        ];
        console.log('🏘️  Creating areas for Islamabad...');
        for (const area of islamabadAreas) {
            await prisma.area.upsert({
                where: { cityId_slug: { cityId: area.cityId, slug: area.slug } },
                update: {},
                create: area,
            });
        }
        console.log(`✅ ${islamabadAreas.length} areas created for Islamabad`);
    }
    const lahore = await prisma.city.findUnique({ where: { slug: 'lahore' } });
    if (lahore) {
        const lahoreAreas = [
            { name: 'Gulberg', slug: 'gulberg', cityId: lahore.id },
            { name: 'DHA Phase 1', slug: 'dha-phase-1-lahore', cityId: lahore.id },
            { name: 'DHA Phase 2', slug: 'dha-phase-2-lahore', cityId: lahore.id },
            { name: 'DHA Phase 3', slug: 'dha-phase-3-lahore', cityId: lahore.id },
            { name: 'Johar Town', slug: 'johar-town', cityId: lahore.id },
            { name: 'Model Town', slug: 'model-town', cityId: lahore.id },
            { name: 'Bahria Town', slug: 'bahria-town-lahore', cityId: lahore.id },
            { name: 'Cantt', slug: 'cantt', cityId: lahore.id },
            { name: 'Shadman', slug: 'shadman', cityId: lahore.id },
            { name: 'Faisal Town', slug: 'faisal-town', cityId: lahore.id },
        ];
        console.log('🏘️  Creating areas for Lahore...');
        for (const area of lahoreAreas) {
            await prisma.area.upsert({
                where: { cityId_slug: { cityId: area.cityId, slug: area.slug } },
                update: {},
                create: area,
            });
        }
        console.log(`✅ ${lahoreAreas.length} areas created for Lahore`);
    }
    const specializations = [
        { name: 'General Physician', slug: 'general-physician', description: 'Primary care and general health consultations' },
        { name: 'Cardiologist', slug: 'cardiologist', description: 'Heart and cardiovascular system specialist' },
        { name: 'Dentist', slug: 'dentist', description: 'Oral health and dental care specialist' },
        { name: 'Dermatologist', slug: 'dermatologist', description: 'Skin, hair, and nails specialist' },
        { name: 'Neurologist', slug: 'neurologist', description: 'Brain and nervous system specialist' },
        { name: 'Orthopedic Surgeon', slug: 'orthopedic-surgeon', description: 'Bones, joints, and musculoskeletal system' },
        { name: 'Psychiatrist', slug: 'psychiatrist', description: 'Mental health and emotional disorders specialist' },
        { name: 'Gynecologist', slug: 'gynecologist', description: 'Female reproductive health specialist' },
        { name: 'Pediatrician', slug: 'pediatrician', description: 'Child health and development specialist' },
        { name: 'ENT Specialist', slug: 'ent-specialist', description: 'Ear, nose, and throat specialist' },
        { name: 'Pulmonologist', slug: 'pulmonologist', description: 'Respiratory system and lungs specialist' },
        { name: 'Urologist', slug: 'urologist', description: 'Urinary tract and male reproductive system' },
        { name: 'Ophthalmologist', slug: 'ophthalmologist', description: 'Eye care and vision specialist' },
        { name: 'Endocrinologist', slug: 'endocrinologist', description: 'Hormonal and metabolic disorders specialist' },
        { name: 'Gastroenterologist', slug: 'gastroenterologist', description: 'Digestive system specialist' },
        { name: 'Rheumatologist', slug: 'rheumatologist', description: 'Arthritis and autoimmune diseases specialist' },
        { name: 'Oncologist', slug: 'oncologist', description: 'Cancer treatment specialist' },
        { name: 'Nephrologist', slug: 'nephrologist', description: 'Kidney diseases specialist' },
    ];
    console.log('🏥 Creating specializations...');
    for (const specialization of specializations) {
        await prisma.specialization.upsert({
            where: { slug: specialization.slug },
            update: {},
            create: specialization,
        });
    }
    console.log(`✅ ${specializations.length} specializations created`);
    if (islamabad) {
        const f7Area = await prisma.area.findFirst({ where: { slug: 'f-7', cityId: islamabad.id } });
        const g9Area = await prisma.area.findFirst({ where: { slug: 'g-9', cityId: islamabad.id } });
        const blueArea = await prisma.area.findFirst({ where: { slug: 'blue-area', cityId: islamabad.id } });
        const hospitals = [
            {
                name: 'Shifa International Hospital',
                type: HospitalType.PRIVATE,
                address: 'Pitras Bukhari Road, H-8/4',
                cityId: islamabad.id,
                areaId: f7Area?.id,
                phone: '+92519030000',
                website: 'https://shifa.com.pk',
                email: 'info@shifa.com.pk',
                emergencyAvailable: true,
                rating: 4.5,
            },
            {
                name: 'Pakistan Institute of Medical Sciences (PIMS)',
                type: HospitalType.GOVERNMENT,
                address: 'G-8/3, Shaheed-e-Millat Road',
                cityId: islamabad.id,
                areaId: g9Area?.id,
                phone: '+92519260500',
                emergencyAvailable: true,
                rating: 3.8,
            },
            {
                name: 'Maroof International Hospital',
                type: HospitalType.PRIVATE,
                address: 'Jinnah Avenue, Blue Area',
                cityId: islamabad.id,
                areaId: blueArea?.id,
                phone: '+92518314478',
                website: 'https://maroofhospital.com',
                emergencyAvailable: true,
                rating: 4.2,
            },
        ];
        console.log('🏥 Creating hospitals...');
        for (const hospital of hospitals) {
            const existing = await prisma.hospital.findFirst({ where: { name: hospital.name } });
            if (!existing) {
                await prisma.hospital.create({ data: hospital });
            }
        }
        console.log(`✅ ${hospitals.length} hospitals created`);
    }
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@carenova.pk';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
    const adminLastName = process.env.ADMIN_LAST_NAME || 'CareNova';
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });
    if (!existingAdmin) {
        const hashedPassword = await hashPassword(adminPassword);
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
                gender: Gender.MALE,
                city: 'Islamabad',
            },
        });
        console.log('👤 Admin user created');
        console.log(`📧 Email: ${admin.email}`);
        console.log(`🔑 Password: ${adminPassword}`);
    }
    else {
        console.log('✅ Admin user already exists');
    }
    const generalPhysician = await prisma.specialization.findUnique({ where: { slug: 'general-physician' } });
    const shifa = await prisma.hospital.findFirst({ where: { name: 'Shifa International Hospital' } });
    if (generalPhysician && shifa) {
        const doctorEmail = 'dr.ahmed@carenova.com';
        const existingDoctor = await prisma.user.findUnique({ where: { email: doctorEmail } });
        if (!existingDoctor) {
            const doctorPassword = await hashPassword('Doctor@123');
            const doctor = await prisma.user.create({
                data: {
                    firstName: 'Ahmed',
                    lastName: 'Khan',
                    email: doctorEmail,
                    phoneNumber: '+923001234568',
                    password: doctorPassword,
                    role: Role.DOCTOR,
                    gender: Gender.MALE,
                    dateOfBirth: new Date('1985-05-15'),
                    city: 'Islamabad',
                    isEmailVerified: true,
                    isActive: true,
                    doctorProfile: {
                        create: {
                            qualification: 'MBBS, FCPS',
                            specializationId: generalPhysician.id,
                            yearsOfExperience: 10,
                            pmdcLicenseNumber: 'PMC-12345',
                            consultationFee: 2000,
                            consultationType: ConsultationType.BOTH,
                            hospitalId: shifa.id,
                            hospitalName: 'Shifa International Hospital',
                            languages: ['English', 'Urdu'],
                            bio: 'Experienced general physician with 10 years of practice',
                            status: DoctorStatus.APPROVED,
                            approvedAt: new Date(),
                            rating: 4.7,
                            reviewsCount: 120,
                        },
                    },
                },
            });
            console.log('👨‍⚕️ Sample doctor created:', doctor.email);
            console.log(`🔑 Password: Doctor@123`);
        }
        else {
            console.log('✅ Sample doctor already exists');
        }
    }
    console.log('🎉 Database seeding completed!');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
