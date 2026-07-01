// ════════════════════════════════════════════════════════════════
//  VENDOR CONSTANTS & DATA REPOSITORIES
// ════════════════════════════════════════════════════════════════

export const companyName = "EduPlatform Global Solutions";

export const stats = {
  totalCourses: 14,
  totalStudents: 1248,
  totalRevenue: 485900,
  totalCollegesBought: 5,
  totalTrainersDeployed: 24,
};

export const colleges = [
  { id: "C-501", name: "PSG College of Technology",                    location: "Coimbatore", trainersCount: 6, studentsEnrolled: 420, maxSeats: 500, licenseType: "Enterprise Premium", status: "Active"    },
  { id: "C-502", name: "Coimbatore Institute of Technology (CIT)",      location: "Coimbatore", trainersCount: 4, studentsEnrolled: 310, maxSeats: 400, licenseType: "Standard",           status: "Active"    },
  { id: "C-503", name: "Government College of Technology (GCT)",       location: "Coimbatore", trainersCount: 5, studentsEnrolled: 288, maxSeats: 300, licenseType: "Enterprise Premium", status: "Active"    },
  { id: "C-504", name: "Kongu Engineering College",                    location: "Erode",      trainersCount: 4, studentsEnrolled: 150, maxSeats: 200, licenseType: "Standard",           status: "Active"    },
  { id: "C-505", name: "Kumaraguru College of Technology (KCT)",       location: "Coimbatore", trainersCount: 5, studentsEnrolled: 80,  maxSeats: 100, licenseType: "Basic Trial",        status: "Suspended" },
];

export const courses = [
  { id: 101, title: "Java Full-Stack Masterclass with Spring Boot", category: "Software Development", globalEnrollments: 450, price: 4999, status: "Published" },
  { id: 102, title: "Advanced Data Analytics with Python & R",      category: "Data Science",         globalEnrollments: 320, price: 5499, status: "Published" },
  { id: 103, title: "Modern Web Development Bootcamp",              category: "Web Development",      globalEnrollments: 280, price: 3999, status: "Published" },
  { id: 104, title: "Cloud Architecture on AWS",                    category: "Cloud Computing",      globalEnrollments: 198, price: 6499, status: "Published" },
];

export const trainers = [
  { id: "T-901", name: "Dr. Arul Prakash",  organization: "PSG College of Technology",               activeClasses: 3, rating: 4.9 },
  { id: "T-902", name: "Ms. Lakshmi Menon", organization: "Coimbatore Institute of Technology (CIT)", activeClasses: 2, rating: 4.7 },
  { id: "T-903", name: "Mr. Vignesh Raja",  organization: "Government College of Technology (GCT)",  activeClasses: 4, rating: 4.8 },
];

export const billing = [
  { invoiceId: "INV-2026-001", college: "PSG College of Technology",                    amount: 150000, date: "2026-05-10", status: "Paid"    },
  { invoiceId: "INV-2026-002", college: "Coimbatore Institute of Technology (CIT)",      amount: 90000,  date: "2026-05-18", status: "Paid"    },
  { invoiceId: "INV-2026-003", college: "Kumaraguru College of Technology (KCT)",       amount: 45000,  date: "2026-06-02", status: "Pending" },
];

export const students = [
  { id: "S-1001", name: "Sanjay Kumar", email: "sanjay@student.edu", course: "Java Full-Stack Masterclass", collegeId: "C-501" },
  { id: "S-1002", name: "Divya Singh",  email: "divya@student.edu",  course: "Advanced Data Analytics",     collegeId: "C-502" },
];

// ── License / contract lifecycle pipeline (Overview page) ────────
export const contractPipelines = [
  { id: "COL-PSG", name: "PSG College of Technology",                plan: "Enterprise Premium", mrr: 125000, seatsUsed: 480, maxSeats: 500, expiryDate: "Jul 15, 2026", daysLeft: 21, status: "Expiring Soon" },
  { id: "COL-CIT", name: "Coimbatore Institute of Technology",        plan: "Standard Tier",      mrr: 75000,  seatsUsed: 210, maxSeats: 300, expiryDate: "Aug 02, 2026", daysLeft: 39, status: "Healthy"       },
  { id: "COL-KCT", name: "Kumaraguru College of Technology",          plan: "Enterprise Premium", mrr: 150000, seatsUsed: 590, maxSeats: 600, expiryDate: "Jul 04, 2026", daysLeft: 10, status: "Expiring Soon" },
  { id: "COL-GCT", name: "Government College of Technology",          plan: "Standard Tier",      mrr: 60000,  seatsUsed: 288, maxSeats: 300, expiryDate: "Sep 12, 2026", daysLeft: 70, status: "Healthy"       },
];

// ── Nav config ─────────────────────────────────────────────────
export const navItems = [
  { icon: "⊞",  label: "Overview" },
  { icon: "🏛", label: "Colleges" },
  { icon: "📚", label: "Courses"  },
  { icon: "👤", label: "Trainers" },
  { icon: "🔑", label: "Licenses" },
  { icon: "💳", label: "Billing"  },
];

export const pageMeta = {
  Overview: { title: "Overview", subtitle: "Vendor account summary" },
  Colleges: { title: "Colleges", subtitle: "Institutional client accounts" },
  Courses:  { title: "Courses",  subtitle: "Curriculum catalog & publishing" },
  Trainers: { title: "Trainers", subtitle: "Certified instructor roster" },
  Licenses: { title: "Licenses", subtitle: "License audits & seat allocation" },
  Billing:  { title: "Billing",  subtitle: "Invoices & settlement history" },
};

export const pageActions = {
  Colleges: "+ Onboard College",
  Courses:  "+ Add Course",
  Trainers: "+ Add Trainer",
  Licenses: "+ Grant License",
};
