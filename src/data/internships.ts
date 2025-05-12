import { Internship, Application, Report, Evaluation } from '../types/internship';

export const dummyInternships: Internship[] = [
  {
    id: 'i1',
    companyId: 'c1',
    title: 'Software Engineering Intern',
    department: 'Engineering',
    description: 'Join our software engineering team to develop cutting-edge web applications using React and Node.js. You will work on real projects under the guidance of senior engineers.',
    requirements: [
      'Computer Science or related field',
      'Knowledge of JavaScript/TypeScript',
      'Familiarity with React or similar frameworks',
      'Good problem-solving skills',
      'GPA of 3.0 or higher'
    ],
    location: 'Cairo, Egypt',
    type: 'hybrid',
    duration: 12, // 12 weeks
    startDate: '2023-06-01',
    endDate: '2023-08-25',
    stipend: 5000,
    status: 'approved',
    applicantsCount: 1,
    applicants: ['s1'],
    acceptedStudents: [],
    createdAt: '2023-03-10T14:30:00Z',
    updatedAt: '2023-03-15T10:20:00Z'
  },
  {
    id: 'i2',
    companyId: 'c2',
    title: 'Business Analyst Intern',
    department: 'Business Analytics',
    description: 'Work with our analytics team to analyze financial data, create reports, and present insights to stakeholders. Learn about financial analysis and business intelligence.',
    requirements: [
      'Business, Finance, or related field',
      'Strong analytical skills',
      'Proficiency in Excel and data visualization',
      'Knowledge of SQL is a plus',
      'GPA of 3.2 or higher'
    ],
    location: 'Cairo, Egypt',
    type: 'onsite',
    duration: 8, // 8 weeks
    startDate: '2023-06-15',
    endDate: '2023-08-10',
    stipend: 4500,
    status: 'approved',
    applicantsCount: 1,
    applicants: ['s2'],
    acceptedStudents: ['s2'],
    createdAt: '2023-04-05T09:45:00Z',
    updatedAt: '2023-04-10T11:30:00Z'
  },
  {
    id: 'i3',
    companyId: 'c1',
    title: 'Mobile App Development Intern',
    department: 'Mobile Development',
    description: 'Join our mobile team to develop innovative mobile applications for iOS and Android. Work with Flutter and learn about cross-platform development.',
    requirements: [
      'Computer Science or related field',
      'Basic knowledge of mobile development',
      'Familiarity with Flutter or React Native is a plus',
      'Understanding of UI/UX principles',
      'GPA of 3.0 or higher'
    ],
    location: 'Cairo, Egypt',
    type: 'remote',
    duration: 10, // 10 weeks
    startDate: '2023-07-01',
    endDate: '2023-09-10',
    stipend: 4800,
    status: 'approved',
    applicantsCount: 1,
    applicants: ['s1'],
    acceptedStudents: [],
    createdAt: '2023-04-20T15:15:00Z',
    updatedAt: '2023-04-25T12:10:00Z'
  }
];

export const dummyApplications: Application[] = [
  {
    id: 'a1',
    internshipId: 'i1',
    studentId: 's1',
    status: 'pending',
    coverLetter: 'I am excited to apply for the Software Engineering Intern position as it aligns perfectly with my studies in Computer Science and my passion for web development.',
    resumeUrl: '/dummy-resume-1.pdf',
    appliedAt: '2023-05-01T10:20:00Z',
    updatedAt: '2023-05-01T10:20:00Z'
  },
  {
    id: 'a2',
    internshipId: 'i2',
    studentId: 's2',
    status: 'accepted',
    coverLetter: 'With my background in Business Informatics and strong analytical skills, I believe I am a great fit for this Business Analyst internship opportunity.',
    resumeUrl: '/dummy-resume-2.pdf',
    appliedAt: '2023-05-05T11:30:00Z',
    updatedAt: '2023-05-10T09:15:00Z'
  },
  {
    id: 'a3',
    internshipId: 'i3',
    studentId: 's1',
    status: 'pending',
    coverLetter: 'I am interested in mobile app development and have been learning Flutter. This internship would provide me with valuable hands-on experience.',
    resumeUrl: '/dummy-resume-1.pdf',
    appliedAt: '2023-05-08T14:45:00Z',
    updatedAt: '2023-05-08T14:45:00Z'
  }
];

export const dummyReports: Report[] = [
  {
    id: 'r1',
    internshipId: 'i2',
    studentId: 's2',
    title: 'Mid-Internship Progress Report',
    content: 'During the first four weeks of my internship at FinBank, I have worked on several projects related to data analysis and financial reporting. I have learned to use PowerBI for creating dashboards and have improved my SQL skills for data extraction.',
    attachments: ['/dummy-report-1.pdf'],
    submissionDate: '2023-07-15T16:30:00Z',
    supervisorId: 'sup2',
    supervisorEvaluation: {
      id: 'e1',
      reportId: 'r1',
      evaluatorId: 'sup2',
      evaluatorRole: 'supervisor',
      rating: 4,
      comments: 'Sara has shown great progress and analytical skills. She quickly picked up our internal tools and has contributed valuable insights to the team.',
      submissionDate: '2023-07-20T11:20:00Z',
      status: 'completed'
    },
    academicEvaluation: {
      id: 'e2',
      reportId: 'r1',
      evaluatorId: 'a2',
      evaluatorRole: 'academicStaff',
      rating: 4,
      comments: 'The report is well-structured and shows good understanding of the business analytics concepts. More reflection on academic theories could be included.',
      submissionDate: '2023-07-25T14:10:00Z',
      status: 'completed'
    },
    status: 'approved'
  },
  {
    id: 'r2',
    internshipId: 'i2',
    studentId: 's2',
    title: 'Final Internship Report',
    content: 'This final report covers my complete internship experience at FinBank International. I have worked on various projects including market analysis, customer segmentation, and financial forecasting. The internship has significantly enhanced my understanding of business analytics in the financial sector.',
    attachments: ['/dummy-report-2.pdf', '/dummy-presentation.pptx'],
    submissionDate: '2023-08-12T15:40:00Z',
    supervisorId: 'sup2',
    supervisorEvaluation: {
      id: 'e3',
      reportId: 'r2',
      evaluatorId: 'sup2',
      evaluatorRole: 'supervisor',
      rating: 5,
      comments: 'Sara has exceeded expectations during her internship. She has demonstrated exceptional analytical ability and has made valuable contributions to our team projects.',
      submissionDate: '2023-08-16T10:30:00Z',
      status: 'completed'
    },
    status: 'evaluated'
  }
];

export const dummyEvaluations: Evaluation[] = [
  {
    id: 'e1',
    reportId: 'r1',
    evaluatorId: 'sup2',
    evaluatorRole: 'supervisor',
    rating: 4,
    comments: 'Sara has shown great progress and analytical skills. She quickly picked up our internal tools and has contributed valuable insights to the team.',
    submissionDate: '2023-07-20T11:20:00Z',
    status: 'completed'
  },
  {
    id: 'e2',
    reportId: 'r1',
    evaluatorId: 'a2',
    evaluatorRole: 'academicStaff',
    rating: 4,
    comments: 'The report is well-structured and shows good understanding of the business analytics concepts. More reflection on academic theories could be included.',
    submissionDate: '2023-07-25T14:10:00Z',
    status: 'completed'
  },
  {
    id: 'e3',
    reportId: 'r2',
    evaluatorId: 'sup2',
    evaluatorRole: 'supervisor',
    rating: 5,
    comments: 'Sara has exceeded expectations during her internship. She has demonstrated exceptional analytical ability and has made valuable contributions to our team projects.',
    submissionDate: '2023-08-16T10:30:00Z',
    status: 'completed'
  }
];