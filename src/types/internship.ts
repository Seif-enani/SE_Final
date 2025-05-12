export interface Internship {
  id: string;
  companyId: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  duration: number; // in weeks
  startDate: string;
  endDate: string;
  stipend: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'closed' | 'completed';
  applicantsCount: number;
  applicants: string[]; // student IDs
  acceptedStudents: string[]; // student IDs
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  coverLetter: string;
  resumeUrl: string;
  appliedAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  internshipId: string;
  studentId: string;
  title: string;
  content: string;
  attachments: string[];
  submissionDate: string;
  supervisorId?: string;
  supervisorEvaluation?: Evaluation;
  academicEvaluation?: Evaluation;
  status: 'draft' | 'submitted' | 'evaluated' | 'approved' | 'rejected' | 'revised';
}

export interface Evaluation {
  id: string;
  reportId: string;
  evaluatorId: string; 
  evaluatorRole: 'supervisor' | 'academicStaff';
  rating: number; // 1-5
  comments: string;
  submissionDate: string;
  status: 'pending' | 'completed';
}