export enum UserRole {
  STUDENT = 'student',
  COMPANY = 'company',
  SCAD_OFFICE = 'scadOffice',
  SUPERVISOR = 'supervisor',
  ACADEMIC_STAFF = 'academicStaff'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  profileImage?: string;
  department?: string;
  position?: string;
  companyName?: string;
  companyLogo?: string;
  verified?: boolean;
  createdAt: string;
}

export interface Student extends User {
  role: UserRole.STUDENT;
  studentId: string;
  faculty: string;
  major: string;
  gpa: number;
  graduationYear: number;
  appliedInternships: string[];
  activeInternship?: string;
  completedInternships: string[];
}

export interface Company extends User {
  role: UserRole.COMPANY;
  companyName: string;
  companyLogo: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  description: string;
  verified: boolean;
  postedInternships: string[];
}

export interface SCADOffice extends User {
  role: UserRole.SCAD_OFFICE;
  department: string;
  position: string;
}

export interface Supervisor extends User {
  role: UserRole.SUPERVISOR;
  companyName: string;
  department: string;
  position: string;
  assignedStudents: string[];
}

export interface AcademicStaff extends User {
  role: UserRole.ACADEMIC_STAFF;
  department: string;
  position: string;
  assignedReports: string[];
}