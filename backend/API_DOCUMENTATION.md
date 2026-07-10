# CareNova Connect - Backend API Documentation

## 🎉 Backend Extension Complete!

The backend has been successfully extended to support a complete healthcare platform with advanced doctor search, patient management, hospital directory, and much more.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Doctor Search Engine](#doctor-search-engine)
5. [Testing Guide](#testing-guide)
6. [Architecture](#architecture)

---

## Overview

### What's New
- ✅ **Extended Prisma Schema** with 15+ new models
- ✅ **Master Data** (Cities, Areas, Specializations, Hospitals)
- ✅ **Intelligent Doctor Search Engine** with 10+ filters
- ✅ **Patient Profile Management** with medical history
- ✅ **Doctor Verification Workflow** (Pending → Approved/Rejected/Suspended/Blocked)
- ✅ **Favorite Doctors** feature for patients
- ✅ **Hospital Management** with ratings and emergency services
- ✅ **Doctor Availability** scheduling system
- ✅ **Doctor Education & Experience** management
- ✅ **Pagination, Search, Filter, Sort** utilities

### Tech Stack
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- Role-Based Access Control (RBAC)
- Zod Validation
- Winston Logging

---

## Database Schema

### New Enums
```prisma
enum DoctorStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
  BLOCKED
}

enum ConsultationType {
  ONLINE
  PHYSICAL
  BOTH
}

enum HospitalType {
  GOVERNMENT
  PRIVATE
  SEMI_GOVERNMENT
  CHARITABLE
}

enum BloodGroup {
  A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE,
  AB_POSITIVE, AB_NEGATIVE, O_POSITIVE, O_NEGATIVE
}

enum DayOfWeek {
  MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
  FRIDAY, SATURDAY, SUNDAY
}
```

### Core Models

#### PatientProfile (Extended)
- Medical info: bloodGroup, height, weight, allergies, chronicDiseases, currentMedications
- Lifestyle: smoking, alcohol
- Emergency contact details
- Address with city and area relation
- Favorite doctors relation

#### DoctorProfile (Extended)
- Specialization relation (FK to Specialization table)
- Hospital relation (FK to Hospital table)
- Consultation type: ONLINE | PHYSICAL | BOTH
- Rating & reviews count
- Status workflow: PENDING → APPROVED/REJECTED/SUSPENDED/BLOCKED
- Relations: availability, education, experience, favoritedBy

#### Master Tables
- **City**: Pakistani cities (Islamabad, Lahore, Karachi, etc.)
- **Area**: Areas within cities (F-6, F-7, Gulberg, DHA, etc.)
- **Specialization**: Medical specialties (Cardiologist, Dentist, etc.)
- **Hospital**: Hospital directory with location, rating, type

#### Doctor Sub-Models
- **DoctorAvailability**: Working days and hours
- **DoctorEducation**: Degrees and universities
- **DoctorExperience**: Work history
- **FavoriteDoctor**: Patient's saved doctors

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /api/health
```

---

### 🔐 Authentication (Existing)
All endpoints from Phase 1 are preserved:

```
POST   /api/auth/register/patient
POST   /api/auth/register/doctor
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/verify-email
POST   /api/auth/auto-verify
POST   /api/auth/resend-verification
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/change-password
POST   /api/auth/refresh-token
```

---

### 👨‍⚕️ Doctor Endpoints

#### Public (No Auth Required)

**Search Doctors with Filters**
```
GET /api/doctors/search

Query Parameters:
- search          : string (name, bio, qualification)
- specializationId: string (UUID)
- hospitalId      : string (UUID)
- cityId          : string (UUID)
- areaId          : string (UUID)
- gender          : MALE | FEMALE | OTHER
- consultationType: ONLINE | PHYSICAL | BOTH
- minFee          : number
- maxFee          : number
- minExperience   : number
- maxExperience   : number
- minRating       : number (0-5)
- language        : string (e.g., "English")
- sortBy          : rating:desc | yearsOfExperience:desc | consultationFee:asc | createdAt:desc
- page            : number (default: 1)
- limit           : number (default: 10, max: 100)

Response:
{
  success: true,
  message: "Operation successful",
  data: {
    data: [
      {
        id: "uuid",
        userId: "uuid",
        qualification: "MBBS, FCPS",
        yearsOfExperience: 10,
        consultationFee: 2000,
        consultationType: "BOTH",
        rating: 4.7,
        reviewsCount: 120,
        languages: ["English", "Urdu"],
        bio: "Experienced cardiologist...",
        status: "APPROVED",
        user: {
          firstName: "Ahmed",
          lastName: "Khan",
          gender: "MALE",
          profileImage: "url",
          city: "Islamabad"
        },
        specialization: {
          id: "uuid",
          name: "Cardiologist",
          slug: "cardiologist"
        },
        hospital: {
          id: "uuid",
          name: "Shifa International Hospital",
          city: { name: "Islamabad" },
          area: { name: "F-7" }
        }
      }
    ],
    meta: {
      page: 1,
      limit: 10,
      total: 45,
      totalPages: 5,
      hasNextPage: true,
      hasPrevPage: false
    }
  }
}
```

**Get Doctor Profile**
```
GET /api/doctors/:id

Returns complete doctor profile including:
- User details
- Specialization
- Hospital
- Availability schedule
- Education history
- Work experience
- Rating & reviews
```

#### Doctor Routes (Auth Required - DOCTOR role)

```
GET    /api/doctors/me              - Get own profile
PUT    /api/doctors/me              - Update own profile
```

**Update Profile Body:**
```json
{
  "firstName": "Ahmed",
  "lastName": "Khan",
  "phoneNumber": "+923001234567",
  "qualification": "MBBS, FCPS (Cardiology)",
  "specializationId": "uuid",
  "yearsOfExperience": 12,
  "consultationFee": 2500,
  "consultationType": "BOTH",
  "hospitalId": "uuid",
  "languages": ["English", "Urdu", "Punjabi"],
  "bio": "Board-certified cardiologist..."
}
```

#### Admin Routes (Auth Required - ADMIN role)

```
GET    /api/doctors                 - Get all doctors (with filters)
GET    /api/doctors/stats           - Get doctor statistics
POST   /api/doctors/:id/approve     - Approve pending doctor
POST   /api/doctors/:id/reject      - Reject doctor (requires reason)
POST   /api/doctors/:id/suspend     - Suspend doctor (requires reason)
POST   /api/doctors/:id/block       - Block doctor (requires reason)
```

**Admin Filters:**
```
GET /api/doctors?status=PENDING&page=1&limit=20
GET /api/doctors?specializationId=uuid&search=ahmed
```

**Approve Doctor:**
```
POST /api/doctors/:id/approve

Response: { success: true, message: "Doctor approved successfully" }
```

**Reject/Suspend/Block Doctor:**
```
POST /api/doctors/:id/reject
Content-Type: application/json

{
  "reason": "Invalid PMDC license"
}
```

---

### 🏥 Patient Endpoints

#### Patient Routes (Auth Required - PATIENT role)

```
GET    /api/patients/me             - Get own profile
PUT    /api/patients/me             - Update own profile
```

**Update Profile Body:**
```json
{
  "firstName": "Sarah",
  "lastName": "Ahmed",
  "phoneNumber": "+923001234567",
  "gender": "FEMALE",
  "dateOfBirth": "1990-05-15",
  "city": "Islamabad",
  "bloodGroup": "O_POSITIVE",
  "height": 165,
  "weight": 60,
  "allergies": ["Penicillin", "Pollen"],
  "chronicDiseases": ["Diabetes Type 2"],
  "currentMedications": ["Metformin 500mg"],
  "medicalHistory": "Diagnosed with diabetes in 2020...",
  "smoking": false,
  "alcohol": false,
  "emergencyContactName": "Ali Ahmed",
  "emergencyContactPhone": "+923009876543",
  "emergencyContactRelation": "Husband",
  "address": "House 123, Street 5",
  "areaId": "uuid",
  "postalCode": "44000"
}
```

#### Admin Routes (Auth Required - ADMIN role)

```
GET    /api/patients                - Get all patients (with filters)
GET    /api/patients/:id            - Get patient by ID
GET    /api/patients/stats          - Get patient statistics
DELETE /api/patients/:id            - Soft delete patient
```

**Admin Filters:**
```
GET /api/patients?bloodGroup=O_POSITIVE&page=1
GET /api/patients?city=Islamabad&search=sarah
```

---

### 🏙️ City Endpoints

#### Public Routes

```
GET    /api/cities                  - Get all active cities
GET    /api/cities/:id              - Get city by ID
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Islamabad",
      "slug": "islamabad",
      "isActive": true
    },
    {
      "id": "uuid",
      "name": "Lahore",
      "slug": "lahore",
      "isActive": true
    }
  ]
}
```

#### Admin Routes (Auth Required - ADMIN role)

```
POST   /api/cities                  - Create city
PUT    /api/cities/:id              - Update city
DELETE /api/cities/:id              - Delete city
```

---

### 📍 Area Endpoints

#### Public Routes

```
GET    /api/areas                   - Get all areas
GET    /api/areas?cityId=uuid       - Get areas filtered by city
GET    /api/areas/city/:cityId      - Get areas by city
GET    /api/areas/:id               - Get area by ID
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "F-7",
      "slug": "f-7",
      "city": {
        "id": "uuid",
        "name": "Islamabad"
      }
    }
  ]
}
```

#### Admin Routes (Auth Required - ADMIN role)

```
POST   /api/areas                   - Create area
PUT    /api/areas/:id               - Update area
DELETE /api/areas/:id               - Delete area
```

---

### 🩺 Specialization Endpoints

#### Public Routes

```
GET    /api/specializations         - Get all specializations
GET    /api/specializations/:id     - Get specialization by ID
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Cardiologist",
      "slug": "cardiologist",
      "description": "Heart and cardiovascular system specialist",
      "icon": null,
      "isActive": true
    }
  ]
}
```

#### Admin Routes (Auth Required - ADMIN role)

```
POST   /api/specializations         - Create specialization
PUT    /api/specializations/:id     - Update specialization
DELETE /api/specializations/:id     - Delete specialization
```

---

### 🏥 Hospital Endpoints

#### Public Routes

```
GET    /api/hospitals               - Get all hospitals (with filters & pagination)
GET    /api/hospitals/:id           - Get hospital by ID
```

**Search & Filter:**
```
GET /api/hospitals?type=PRIVATE&cityId=uuid&emergencyAvailable=true&page=1&limit=10
GET /api/hospitals?search=shifa&sortBy=rating:desc
```

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "name": "Shifa International Hospital",
        "type": "PRIVATE",
        "address": "Pitras Bukhari Road, H-8/4",
        "phone": "+92519030000",
        "website": "https://shifa.com.pk",
        "email": "info@shifa.com.pk",
        "emergencyAvailable": true,
        "rating": 4.5,
        "city": {
          "name": "Islamabad"
        },
        "area": {
          "name": "F-7"
        },
        "_count": {
          "doctors": 45
        }
      }
    ],
    "meta": { "page": 1, "limit": 10, "total": 3, "totalPages": 1 }
  }
}
```

#### Admin Routes (Auth Required - ADMIN role)

```
GET    /api/hospitals/stats         - Get hospital statistics
POST   /api/hospitals               - Create hospital
PUT    /api/hospitals/:id           - Update hospital
DELETE /api/hospitals/:id           - Delete hospital
```

---

### ⭐ Favorite Doctor Endpoints

#### Patient Routes (Auth Required - PATIENT role)

```
GET    /api/favorite-doctors              - Get my favorite doctors
POST   /api/favorite-doctors/:doctorId    - Add doctor to favorites
DELETE /api/favorite-doctors/:doctorId    - Remove from favorites
GET    /api/favorite-doctors/:doctorId/check - Check if favorited
```

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "createdAt": "2026-07-10T10:00:00Z",
        "doctor": {
          "id": "uuid",
          "rating": 4.8,
          "consultationFee": 2000,
          "user": {
            "firstName": "Ahmed",
            "lastName": "Khan",
            "profileImage": "url"
          },
          "specialization": {
            "name": "Cardiologist"
          },
          "hospital": {
            "name": "Shifa International Hospital"
          }
        }
      }
    ],
    "meta": { "page": 1, "limit": 10, "total": 5 }
  }
}
```

---

## Doctor Search Engine

### Features
The doctor search engine is **intelligent** and supports multiple filters simultaneously:

1. **Text Search**: Searches in doctor name, bio, qualification
2. **Specialization Filter**: Filter by medical specialty
3. **Location Filter**: City and area-based filtering
4. **Hospital Filter**: Filter by specific hospital
5. **Fee Range**: Min and max consultation fee
6. **Experience Range**: Years of experience filter
7. **Rating Filter**: Minimum rating (0-5)
8. **Gender Filter**: Male, Female, Other
9. **Consultation Type**: Online, Physical, Both
10. **Language Filter**: Doctors who speak specific language
11. **Sorting**: By rating, experience, fee, newest
12. **Pagination**: Page and limit controls

### Example Queries

**Find top-rated cardiologists in Islamabad**
```
GET /api/doctors/search?specializationId={cardio-uuid}&cityId={isb-uuid}&sortBy=rating:desc&limit=10
```

**Find affordable general physicians for online consultation**
```
GET /api/doctors/search?specializationId={gp-uuid}&consultationType=ONLINE&maxFee=1500&sortBy=consultationFee:asc
```

**Find experienced female gynecologists in specific area**
```
GET /api/doctors/search?specializationId={gynec-uuid}&gender=FEMALE&areaId={area-uuid}&minExperience=5
```

**Find highly-rated doctors who speak English**
```
GET /api/doctors/search?language=English&minRating=4.5&sortBy=rating:desc
```

---

## Testing Guide

### 1. Seed Database
```bash
cd backend
npm run prisma:seed
```

This creates:
- 10 cities (Islamabad, Lahore, Karachi, etc.)
- 27 areas (17 in Islamabad, 10 in Lahore)
- 18 specializations
- 3 hospitals in Islamabad
- 1 admin user (admin@carenova.pk / Admin@123456)
- 1 approved doctor (dr.ahmed@carenova.com / Doctor@123)

### 2. Test Authentication
```bash
# Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@carenova.pk","password":"Admin@123456"}'

# Save the accessToken from response
```

### 3. Test Doctor Search
```bash
# Search all approved doctors
curl http://localhost:5000/api/doctors/search

# Search with filters
curl "http://localhost:5000/api/doctors/search?minFee=1000&maxFee=3000&sortBy=rating:desc"
```

### 4. Test Master Data
```bash
# Get cities
curl http://localhost:5000/api/cities

# Get areas by city
curl http://localhost:5000/api/areas/city/{cityId}

# Get specializations
curl http://localhost:5000/api/specializations

# Get hospitals
curl http://localhost:5000/api/hospitals
```

### 5. Test Admin Operations
```bash
# Get all doctors (requires admin token)
curl http://localhost:5000/api/doctors \
  -H "Authorization: Bearer {admin-token}"

# Approve a pending doctor
curl -X POST http://localhost:5000/api/doctors/{doctorId}/approve \
  -H "Authorization: Bearer {admin-token}"
```

---

## Architecture

### Folder Structure
```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── constants/      # Constants and enums
│   ├── controllers/    # Request handlers
│   ├── docs/          # Swagger documentation
│   ├── interfaces/    # TypeScript interfaces
│   ├── middleware/    # Express middleware
│   ├── repositories/  # Database layer
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   ├── validators/    # Zod schemas
│   ├── app.ts         # Express app
│   └── server.ts      # Server entry point
├── prisma/
│   ├── migrations/    # Database migrations
│   ├── schema.prisma  # Database schema
│   └── seed.ts        # Seed data
└── uploads/           # File uploads
```

### Design Patterns

#### 1. Repository Pattern
All database queries isolated in repositories
```typescript
// doctor.repository.ts
class DoctorRepository {
  async findById(id: string) { ... }
  async findMany(where, skip, take, orderBy) { ... }
  async approve(id, adminId) { ... }
}
```

#### 2. Service Layer
Business logic in services
```typescript
// doctor.service.ts
class DoctorService {
  async searchDoctors(params) {
    // Build filters, execute query, return paginated results
  }
}
```

#### 3. Controller Layer
Request handling in controllers
```typescript
// doctor.controller.ts
class DoctorController {
  searchDoctors = asyncHandler(async (req, res) => {
    const result = await doctorService.searchDoctors(req.query);
    sendSuccess(res, MESSAGES.SUCCESS, result);
  });
}
```

#### 4. Reusable Utilities
```typescript
// utils/pagination.util.ts - Generic pagination
// utils/search.util.ts - Generic search builder
// utils/filter.util.ts - Generic filter builder
// utils/sort.util.ts - Generic sort builder
```

### Security Features
- ✅ JWT authentication with access & refresh tokens
- ✅ Role-Based Access Control (RBAC)
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Helmet.js for HTTP headers security
- ✅ CORS configuration
- ✅ Rate limiting (100 req/15min in dev)
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection

### Performance Features
- ✅ Database indexing on frequently queried fields
- ✅ Pagination for large datasets
- ✅ Efficient Prisma queries with select/include
- ✅ Connection pooling
- ✅ Lazy loading of relations

---

## Next Steps

### Frontend Integration
All these APIs are ready to be consumed by your React frontend. Update your API client to use these new endpoints.

### Additional Features (Future)
- [ ] Appointment booking system
- [ ] Doctor reviews and ratings
- [ ] Patient medical records
- [ ] Prescription management
- [ ] Telemedicine (video consultation)
- [ ] Payment integration
- [ ] Notifications system
- [ ] Chat between patient and doctor

---

## Support

For issues or questions:
1. Check logs in `backend/logs/`
2. Review Swagger docs at http://localhost:5000/api-docs
3. Check database with Prisma Studio: `npx prisma studio`

---

**Backend Status**: ✅ **READY FOR PRODUCTION**

All Phase 2 features implemented successfully!
