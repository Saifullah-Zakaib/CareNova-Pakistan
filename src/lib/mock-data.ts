export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  hospital: string;
  city: string;
  area: string;
  rating: number;
  reviews: number;
  fee: number;
  gender: "Male" | "Female";
  languages: string[];
  verified: boolean;
  online: boolean;
  image: string;
  about: string;
  slots: string[];
};

const img = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

export const specialties = [
  "General Physician",
  "Dentist",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
  "Psychiatrist",
];

export const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Faisalabad", "Multan", "Quetta"];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: 12,
    hospital: "Aga Khan University Hospital",
    city: "Karachi",
    area: "Stadium Road",
    rating: 4.9,
    reviews: 342,
    fee: 3500,
    gender: "Female",
    languages: ["English", "Urdu", "Sindhi"],
    verified: true,
    online: true,
    image: img("Ayesha Khan"),
    about:
      "Consultant cardiologist with over a decade of experience treating complex cardiovascular conditions. Special interest in preventive cardiology and women's heart health.",
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
  },
  {
    id: "d2",
    name: "Dr. Bilal Ahmed",
    specialty: "Dentist",
    qualification: "BDS, MSc Orthodontics (UK)",
    experience: 8,
    hospital: "Smile Studio Dental",
    city: "Lahore",
    area: "DHA Phase 5",
    rating: 4.8,
    reviews: 210,
    fee: 2500,
    gender: "Male",
    languages: ["English", "Urdu", "Punjabi"],
    verified: true,
    online: false,
    image: img("Bilal Ahmed"),
    about: "Cosmetic and orthodontic specialist focused on invisible aligners, veneers and full smile makeovers.",
    slots: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
  },
  {
    id: "d3",
    name: "Dr. Sara Malik",
    specialty: "Dermatologist",
    qualification: "MBBS, FCPS (Dermatology)",
    experience: 10,
    hospital: "Shifa International Hospital",
    city: "Islamabad",
    area: "H-8/4",
    rating: 4.9,
    reviews: 512,
    fee: 3000,
    gender: "Female",
    languages: ["English", "Urdu"],
    verified: true,
    online: true,
    image: img("Sara Malik"),
    about: "Board-certified dermatologist. Interests: acne, pigmentation, laser therapy and aesthetic dermatology.",
    slots: ["10:30 AM", "1:00 PM", "5:00 PM"],
  },
  {
    id: "d4",
    name: "Dr. Hamza Raza",
    specialty: "General Physician",
    qualification: "MBBS, MRCP (UK)",
    experience: 6,
    hospital: "CareNova Clinic",
    city: "Karachi",
    area: "Clifton",
    rating: 4.7,
    reviews: 128,
    fee: 1500,
    gender: "Male",
    languages: ["English", "Urdu"],
    verified: true,
    online: true,
    image: img("Hamza Raza"),
    about: "Family physician offering long-term primary care, chronic disease management and preventive check-ups.",
    slots: ["9:30 AM", "11:00 AM", "3:30 PM", "7:00 PM"],
  },
  {
    id: "d5",
    name: "Dr. Fatima Zahra",
    specialty: "Pediatrician",
    qualification: "MBBS, FCPS (Paediatrics)",
    experience: 14,
    hospital: "Children's Hospital Lahore",
    city: "Lahore",
    area: "Gulberg",
    rating: 5.0,
    reviews: 640,
    fee: 2000,
    gender: "Female",
    languages: ["English", "Urdu", "Punjabi"],
    verified: true,
    online: true,
    image: img("Fatima Zahra"),
    about: "Paediatric consultant with strong focus on newborn care, immunisations and childhood asthma.",
    slots: ["10:00 AM", "12:30 PM", "4:00 PM"],
  },
  {
    id: "d6",
    name: "Dr. Usman Tariq",
    specialty: "Neurologist",
    qualification: "MBBS, FCPS (Neurology)",
    experience: 15,
    hospital: "PIMS Islamabad",
    city: "Islamabad",
    area: "G-8/3",
    rating: 4.8,
    reviews: 289,
    fee: 4000,
    gender: "Male",
    languages: ["English", "Urdu"],
    verified: true,
    online: false,
    image: img("Usman Tariq"),
    about: "Neurologist treating epilepsy, migraine, stroke and movement disorders. Publishes actively in neuro research.",
    slots: ["11:00 AM", "2:30 PM", "5:30 PM"],
  },
  {
    id: "d7",
    name: "Dr. Iqra Nadeem",
    specialty: "Gynecologist",
    qualification: "MBBS, FCPS (Gynae)",
    experience: 9,
    hospital: "Liaquat National Hospital",
    city: "Karachi",
    area: "Stadium Road",
    rating: 4.9,
    reviews: 401,
    fee: 3000,
    gender: "Female",
    languages: ["English", "Urdu"],
    verified: true,
    online: true,
    image: img("Iqra Nadeem"),
    about: "Consultant gynaecologist with expertise in pregnancy care, PCOS and minimally invasive surgery.",
    slots: ["9:00 AM", "11:30 AM", "3:00 PM"],
  },
  {
    id: "d8",
    name: "Dr. Ahmed Farooq",
    specialty: "Orthopedic",
    qualification: "MBBS, FRCS (Ortho)",
    experience: 18,
    hospital: "Hameed Latif Hospital",
    city: "Lahore",
    area: "Garden Town",
    rating: 4.7,
    reviews: 356,
    fee: 3500,
    gender: "Male",
    languages: ["English", "Urdu", "Punjabi"],
    verified: true,
    online: false,
    image: img("Ahmed Farooq"),
    about: "Orthopaedic surgeon specialising in joint replacement, sports injuries and spine.",
    slots: ["10:00 AM", "1:30 PM", "5:00 PM"],
  },
];

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorImage: string;
  readTime: number;
  cover: string;
  content: string;
  date: string;
};

const cover = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const articles: Article[] = [
  {
    id: "a1",
    title: "5 Habits to Keep Your Heart Healthy in Your 30s",
    excerpt: "Simple daily changes proven to reduce your long-term risk of heart disease.",
    category: "Cardiology",
    author: "Dr. Ayesha Khan",
    authorImage: img("Ayesha Khan"),
    readTime: 6,
    cover: cover("photo-1505751172876-fa1923c5c528"),
    date: "May 12, 2026",
    content:
      "Heart disease remains the leading cause of death in Pakistan. The good news is that small, consistent habits in your 30s can dramatically lower your risk in later decades. In this article we cover diet, sleep, activity, stress and screening...",
  },
  {
    id: "a2",
    title: "Understanding Common Skin Conditions in Pakistani Climate",
    excerpt: "Why acne, pigmentation and eczema flare up in humid cities — and what actually works.",
    category: "Dermatology",
    author: "Dr. Sara Malik",
    authorImage: img("Sara Malik"),
    readTime: 8,
    cover: cover("photo-1571772996211-2f02c9727629"),
    date: "Apr 30, 2026",
    content:
      "Our climate poses unique challenges for skin health. This guide walks through evidence-based routines suited for South Asian skin tones and typical Pakistani weather patterns...",
  },
  {
    id: "a3",
    title: "When Should You Actually See a Pediatrician?",
    excerpt: "A parent's honest guide to fevers, coughs and 'is this normal?' moments.",
    category: "Pediatrics",
    author: "Dr. Fatima Zahra",
    authorImage: img("Fatima Zahra"),
    readTime: 5,
    cover: cover("photo-1519494026892-80bbd2d6fd0d"),
    date: "Apr 18, 2026",
    content:
      "Not every sneeze needs a clinic visit — but some symptoms should never be ignored. Learn the red flags every parent should know...",
  },
  {
    id: "a4",
    title: "Migraine vs. Regular Headache: How to Tell",
    excerpt: "A neurologist explains the difference and when to seek help.",
    category: "Neurology",
    author: "Dr. Usman Tariq",
    authorImage: img("Usman Tariq"),
    readTime: 7,
    cover: cover("photo-1559757148-5c350d0d3c56"),
    date: "Apr 05, 2026",
    content:
      "Migraines are more than just bad headaches. Understanding your triggers, warning signs and treatment options can transform your quality of life...",
  },
  {
    id: "a5",
    title: "PCOS in Pakistan: What Every Young Woman Should Know",
    excerpt: "Symptoms, diagnosis and lifestyle strategies that make a real difference.",
    category: "Gynecology",
    author: "Dr. Iqra Nadeem",
    authorImage: img("Iqra Nadeem"),
    readTime: 9,
    cover: cover("photo-1584515933487-779824d29309"),
    date: "Mar 22, 2026",
    content:
      "PCOS affects up to 1 in 5 women in South Asia. This guide covers the science, symptoms and what treatments have the strongest evidence...",
  },
  {
    id: "a6",
    title: "Diabetes Screening: Are You Overdue?",
    excerpt: "A quick self-assessment plus the tests your GP should be ordering.",
    category: "General Health",
    author: "Dr. Hamza Raza",
    authorImage: img("Hamza Raza"),
    readTime: 4,
    cover: cover("photo-1579154204601-01588f351e67"),
    date: "Mar 10, 2026",
    content:
      "One in four adults in Pakistan lives with diabetes or pre-diabetes. Early screening can prevent decades of complications...",
  },
];

export type Appointment = {
  id: string;
  doctorId: string;
  patient: string;
  patientImage: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled" | "Pending";
  type: "In-person" | "Online";
};

export const appointments: Appointment[] = [
  { id: "ap1", doctorId: "d1", patient: "Ali Raza", patientImage: img("Ali Raza"), date: "Jul 09, 2026", time: "10:00 AM", status: "Upcoming", type: "In-person" },
  { id: "ap2", doctorId: "d3", patient: "Zara Ahmed", patientImage: img("Zara Ahmed"), date: "Jul 10, 2026", time: "1:00 PM", status: "Upcoming", type: "Online" },
  { id: "ap3", doctorId: "d4", patient: "Omar Sheikh", patientImage: img("Omar Sheikh"), date: "Jul 07, 2026", time: "3:30 PM", status: "Pending", type: "In-person" },
  { id: "ap4", doctorId: "d2", patient: "Hina Butt", patientImage: img("Hina Butt"), date: "Jun 20, 2026", time: "12:00 PM", status: "Completed", type: "In-person" },
  { id: "ap5", doctorId: "d5", patient: "Rehan Khan", patientImage: img("Rehan Khan"), date: "Jun 15, 2026", time: "10:00 AM", status: "Completed", type: "Online" },
];

export const records = [
  { id: "r1", name: "Complete Blood Count", category: "Lab Report", doctor: "Dr. Hamza Raza", date: "Jun 28, 2026" },
  { id: "r2", name: "ECG Report", category: "Cardiology", doctor: "Dr. Ayesha Khan", date: "May 14, 2026" },
  { id: "r3", name: "Dental X-Ray", category: "Dentistry", doctor: "Dr. Bilal Ahmed", date: "Apr 02, 2026" },
  { id: "r4", name: "Skin Biopsy", category: "Dermatology", doctor: "Dr. Sara Malik", date: "Feb 18, 2026" },
];

export const prescriptions = [
  {
    id: "p1",
    doctor: "Dr. Ayesha Khan",
    date: "May 14, 2026",
    medicines: [
      { name: "Rosuvastatin 10mg", dose: "1 tab at night", duration: "3 months" },
      { name: "Aspirin 75mg", dose: "1 tab after breakfast", duration: "Ongoing" },
    ],
    instructions: "Low salt diet, 30 min brisk walking daily. Repeat lipid profile after 3 months.",
  },
  {
    id: "p2",
    doctor: "Dr. Hamza Raza",
    date: "Jun 28, 2026",
    medicines: [
      { name: "Amoxicillin 500mg", dose: "1 cap thrice daily", duration: "5 days" },
      { name: "Paracetamol 500mg", dose: "As needed for fever", duration: "5 days" },
    ],
    instructions: "Plenty of fluids, rest. Return if fever persists beyond 3 days.",
  },
];

export const timeline = [
  { year: "2024", title: "Annual Health Check", detail: "Complete physical & bloodwork" },
  { year: "2025", title: "Blood Test", detail: "CBC, Lipid Profile — Dr. Hamza Raza" },
  { year: "2025", title: "Dental Consultation", detail: "Routine cleaning — Dr. Bilal Ahmed" },
  { year: "2026", title: "Cardiac Evaluation", detail: "ECG & stress test — Dr. Ayesha Khan" },
  { year: "2026", title: "New Prescription", detail: "Started statin therapy" },
];
