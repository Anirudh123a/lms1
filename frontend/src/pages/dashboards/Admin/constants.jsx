// ════════════════════════════════════════════════════════════════
//  CONSTANTS — shared data, nav config, page meta
// ════════════════════════════════════════════════════════════════

export const enrollmentData = [
  { month: "Jan", value: 1280 }, { month: "Feb", value: 1450 },
  { month: "Mar", value: 1320 }, { month: "Apr", value: 1890 },
  { month: "May", value: 2100 }, { month: "Jun", value: 2480 },
];

export const completionTrend = [
  { month: "Jan", completed: 320, pending: 210, dropped: 80 },
  { month: "Feb", completed: 410, pending: 190, dropped: 60 },
  { month: "Mar", completed: 380, pending: 230, dropped: 90 },
  { month: "Apr", completed: 520, pending: 170, dropped: 55 },
  { month: "May", completed: 610, pending: 150, dropped: 40 },
  { month: "Jun", completed: 720, pending: 130, dropped: 35 },
];

export const courseStatusData = [
  { name: "Completed", value: 42 }, { name: "In Progress", value: 31 },
  { name: "Pending",   value: 18 }, { name: "Dropped",     value: 9  },
];

export const COURSE_COLORS = ["#22C55E", "#3B6CF4", "#F59E0B", "#EF4444"];

export const monitoringStats = [
  { label: "Course Completion Count", value: "2,960", change: "+14.2%", icon: "✅", color: "#22C55E", bg: "#F0FDF4" },
  { label: "Pending Enrollments",     value: "1,180", change: "-3.1%",  icon: "⏳", color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Dropped Courses",         value: "360",   change: "-8.5%",  icon: "❌", color: "#EF4444", bg: "#FEF2F2" },
  { label: "Active Learners Today",   value: "3,842", change: "+6.7%",  icon: "🟢", color: "#3B6CF4", bg: "#EFF6FF" },
  { label: "Avg. Completion Rate",    value: "69.2%", change: "+2.1%",  icon: "📈", color: "#8B5CF6", bg: "#F5F3FF" },
  { label: "Certificates Issued",     value: "1,740", change: "+22%",   icon: "🏅", color: "#06B6D4", bg: "#ECFEFF" },
];

export const recentActivities = [
  { icon: "📋", title: "New enrollment — Priya Sharma",      sub: "Data Science Bootcamp", time: "2m ago",  color: "#3B6CF4" },
  { icon: "✅", title: "Course published — Dr. Arjun Mehta", sub: "ML Fundamentals",       time: "14m ago", color: "#22C55E" },
  { icon: "⚠️", title: "Report pending — Ravi Kumar",        sub: "Web Dev Basics",        time: "32m ago", color: "#F59E0B" },
  { icon: "👤", title: "New user registered — Sneha Iyer",   sub: "Student account",       time: "1h ago",  color: "#8B5CF6" },
  { icon: "❌", title: "Course dropped — Kiran Rao",         sub: "Advanced React",        time: "2h ago",  color: "#EF4444" },
  { icon: "📊", title: "Report submitted — Prof. Nair",      sub: "Analytics Q2",          time: "3h ago",  color: "#06B6D4" },
];

export const topCourses = [
  { name: "Data Science Bootcamp", enrolled: 1240, completed: 820, pending: 280, dropped: 140, rate: 66 },
  { name: "ML Fundamentals",       enrolled: 980,  completed: 710, pending: 190, dropped: 80,  rate: 72 },
  { name: "Web Dev Basics",        enrolled: 870,  completed: 540, pending: 230, dropped: 100, rate: 62 },
  { name: "Advanced React",        enrolled: 650,  completed: 480, pending: 120, dropped: 50,  rate: 74 },
  { name: "UI/UX Design",          enrolled: 540,  completed: 390, pending: 110, dropped: 40,  rate: 72 },
];

export const pendingReports = [
  { id:1, title: "Q2 Enrollment Summary",      by: "Prof. Arjun Mehta", due: "Today",    priority: "High",   status: "Pending",   type: "Enrollment"  },
  { id:2, title: "Course Completion Analysis", by: "Dr. Sneha Iyer",    due: "Tomorrow", priority: "Medium", status: "Pending",   type: "Analytics"   },
  { id:3, title: "Vendor Performance Report",  by: "Admin",             due: "Jun 25",   priority: "High",   status: "Pending",   type: "Progress"    },
  { id:4, title: "Student Feedback Review",    by: "Ravi Kumar",        due: "Jun 26",   priority: "Low",    status: "Pending",   type: "Analytics"   },
  { id:5, title: "Batch D Review",             by: "Mr. Nair",          due: "Jun 27",   priority: "Medium", status: "Pending",   type: "Progress"    },
  { id:6, title: "Certificate Issuance Log",   by: "Admin",             due: "Jun 22",   priority: "Low",    status: "Completed", type: "Certificate" },
  { id:7, title: "Dropout Analysis Q2",        by: "Dr. Rao",           due: "Jun 30",   priority: "High",   status: "Pending",   type: "Analytics"   },
];

export const users = [
  { id:1, name: "Priya Sharma", email: "priya@edu.com",  role: "Student",    college: "MIT OpenCourseWare", status: "Active",   joined: "Jan 10, 2026" },
  { id:2, name: "Arjun Mehta",  email: "arjun@edu.com",  role: "Instructor", college: "Stanford Extension", status: "Active",   joined: "Feb 01, 2026" },
  { id:3, name: "Sneha Iyer",   email: "sneha@edu.com",  role: "Student",    college: "Harvard Online",     status: "Active",   joined: "Mar 05, 2026" },
  { id:4, name: "Kiran Rao",    email: "kiran@edu.com",  role: "Student",    college: "MIT OpenCourseWare", status: "Inactive", joined: "Apr 12, 2026" },
  { id:5, name: "Ravi Kumar",   email: "ravi@edu.com",   role: "Staff",      college: "Admin",              status: "Active",   joined: "Jan 20, 2026" },
  { id:6, name: "Neha Patel",   email: "neha@edu.com",   role: "Student",    college: "Coursera Partners",  status: "Pending",  joined: "Jun 01, 2026" },
  { id:7, name: "Prof. Nair",   email: "nair@edu.com",   role: "Instructor", college: "Stanford Extension", status: "Active",   joined: "Feb 14, 2026" },
  { id:8, name: "Divya Singh",  email: "divya@edu.com",  role: "Student",    college: "Harvard Online",     status: "Active",   joined: "Mar 22, 2026" },
];

export const courses = [
  { id:1, name: "Data Science Bootcamp", college: "MIT OpenCourseWare",  instructor: "Dr. Mehta",  enrolled: 1240, completion: 66, modules: 16, duration: "6 months", status: "Active"     },
  { id:2, name: "ML Fundamentals",       college: "Stanford Extension",  instructor: "Dr. Rao",    enrolled: 980,  completion: 72, modules: 12, duration: "4 months", status: "Active"     },
  { id:3, name: "Web Dev Basics",        college: "Harvard Online",      instructor: "Prof. Nair", enrolled: 870,  completion: 62, modules: 10, duration: "3 months", status: "Active"     },
  { id:4, name: "Advanced React",        college: "Coursera Partners",   instructor: "Ms. Iyer",   enrolled: 650,  completion: 74, modules: 8,  duration: "2 months", status: "Completing" },
  { id:5, name: "UI/UX Design",          college: "MIT OpenCourseWare",  instructor: "Prof. Das",  enrolled: 540,  completion: 72, modules: 10, duration: "3 months", status: "Active"     },
];

export const enrollments = [
  { id:1, student: "Priya Sharma", course: "Data Science Bootcamp", college: "MIT",      date: "Jan 10, 2026", status: "Active",    progress: 72  },
  { id:2, student: "Arjun Mehta",  course: "ML Fundamentals",       college: "Stanford", date: "Feb 01, 2026", status: "Active",    progress: 55  },
  { id:3, student: "Sneha Iyer",   course: "Web Dev Basics",        college: "Harvard",  date: "Mar 05, 2026", status: "Completed", progress: 100 },
  { id:4, student: "Kiran Rao",    course: "Advanced React",        college: "Coursera", date: "Apr 12, 2026", status: "Dropped",   progress: 38  },
  { id:5, student: "Neha Patel",   course: "UI/UX Design",          college: "MIT",      date: "Jun 01, 2026", status: "Pending",   progress: 0   },
  { id:6, student: "Divya Singh",  course: "Data Science Bootcamp", college: "MIT",      date: "Mar 22, 2026", status: "Active",    progress: 61  },
  { id:7, student: "Ravi Kumar",   course: "ML Fundamentals",       college: "Stanford", date: "Jan 20, 2026", status: "Completed", progress: 100 },
];

export const colleges = [
  { id:1, name: "MIT OpenCourseWare", plan: "Institutional", courses: 89,  students: 4200, revenue: "₹84,000",  status: "Active"   },
  { id:2, name: "Stanford Extension", plan: "Institutional", courses: 74,  students: 3800, revenue: "₹76,000",  status: "Active"   },
  { id:3, name: "Harvard Online",     plan: "Premium",       courses: 61,  students: 3200, revenue: "₹48,000",  status: "Active"   },
  { id:4, name: "Coursera Partners",  plan: "Institutional", courses: 120, students: 5100, revenue: "₹102,000", status: "Active"   },
  { id:5, name: "Yale Open Courses",  plan: "Premium",       courses: 45,  students: 980,  revenue: "₹14,700",  status: "Inactive" },
];

export const vendors = [
  { id:1, name: "EduTech Pro", plan: "Enterprise", sold: 1240, revenue: "₹24,800", status: "Active"   },
  { id:2, name: "SkillBridge", plan: "Business",   sold: 870,  revenue: "₹13,050", status: "Active"   },
  { id:3, name: "LearnQuest",  plan: "Enterprise", sold: 650,  revenue: "₹13,000", status: "Active"   },
  { id:4, name: "AcademiX",    plan: "Starter",    sold: 430,  revenue: "₹4,300",  status: "Inactive" },
  { id:5, name: "TutorHub",    plan: "Business",   sold: 310,  revenue: "₹4,650",  status: "Active"   },
];

export const navItems = [
  { icon: "⊞",  label: "Dashboard"   },
  { icon: "👥", label: "Users"       },
  { icon: "📚", label: "Courses"     },
  { icon: "🎓", label: "Colleges"    },
  { icon: "🛒", label: "Vendors"     },
  { icon: "📋", label: "Enrollments" },
  { icon: "📊", label: "Reports"     },
  { icon: "🖥",  label: "Monitoring"  },
];

export const pageMeta = {
  Dashboard:   { title: "Dashboard",   subtitle: "Monday, June 23, 2026"           },
  Users:       { title: "Users",       subtitle: "Manage all platform users"        },
  Courses:     { title: "Courses",     subtitle: "All courses across organizations" },
  Colleges:    { title: "Colleges",    subtitle: "Institutional subscribers"        },
  Vendors:     { title: "Vendors",     subtitle: "Vendor subscriptions & plans"     },
  Enrollments: { title: "Enrollments", subtitle: "Track student enrollments"        },
  Reports:     { title: "Reports",     subtitle: "Analytics and exports"            },
  Monitoring:  { title: "Monitoring",  subtitle: "Live platform health metrics"     },
};

export const pageActions = {
  Users:       "+ Add User",
  Courses:     "+ Add Course",
  Colleges:    "+ Add College",
  Vendors:     "+ Add Vendor",
  Enrollments: "+ New Enrollment",
  Reports:     "+ Generate Report",
};
