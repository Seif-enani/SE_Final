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
  },
  {
    id: 'i4',
    companyId: 'c1',
    title: 'Frontend Developer Intern',
    department: 'Web Development',
    description: 'Work with our frontend team to build beautiful and responsive web interfaces using React and Tailwind CSS. You will collaborate with designers and backend developers.',
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Experience with React is a plus',
      'Attention to detail',
      'Good communication skills'
    ],
    location: 'Remote',
    type: 'remote',
    duration: 8,
    startDate: '2023-08-01',
    endDate: '2023-09-25',
    stipend: 3000,
    status: 'pending',
    applicantsCount: 0,
    applicants: [],
    acceptedStudents: [],
    createdAt: '2023-07-10T09:00:00Z',
    updatedAt: '2023-07-15T10:00:00Z'
  },
  {
    id: 'i5',
    companyId: 'c1',
    title: 'QA Tester Intern',
    department: 'Quality Assurance',
    description: 'Join our QA team to test web and mobile applications, write test cases, and help ensure product quality before release.',
    requirements: [
      'Attention to detail',
      'Basic understanding of software testing',
      'Good documentation skills'
    ],
    location: 'Cairo, Egypt',
    type: 'onsite',
    duration: 6,
    startDate: '2023-09-01',
    endDate: '2023-10-15',
    stipend: 2500,
    status: 'draft',
    applicantsCount: 0,
    applicants: [],
    acceptedStudents: [],
    createdAt: '2023-08-01T12:00:00Z',
    updatedAt: '2023-08-05T13:00:00Z'
  },
  // Add more dummy internships for filter testing
  {
    id: 'i10',
    companyId: 'c1',
    title: 'AI Research Intern',
    department: 'Research and Development',
    description: 'Work on cutting-edge AI research projects.',
    requirements: [
      'Computer Science, Data Science, or related field',
      'Strong programming skills in Python',
      'Familiarity with machine learning frameworks like TensorFlow or PyTorch',
      'Good analytical and problem-solving skills',
      'GPA of 3.5 or higher'
    ],
    location: 'Cairo, Egypt',
    type: 'onsite',
    duration: 16, // 16 weeks
    startDate: '2025-05-01',
    endDate: '2025-08-01',
    stipend: 4000,
    status: 'upcoming',
    applicantsCount: 0,
    applicants: [],
    acceptedStudents: [],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-05T10:00:00Z'
  },
  {
    id: 'i11',
    companyId: 'c2',
    title: 'Frontend Developer',
    department: 'Web Development',
    description: 'Develop modern web interfaces for our SaaS platform.',
    requirements: [
      'Proficiency in HTML, CSS, and JavaScript',
      'Experience with frontend frameworks like React or Angular',
      'Understanding of RESTful APIs',
      'Good problem-solving skills',
      'GPA of 3.0 or higher'
    ],
    location: 'Remote',
    type: 'remote',
    duration: 12, // 12 weeks
    startDate: '2025-01-10',
    endDate: '2025-04-10',
    stipend: 3500,
    status: 'upcoming',
    applicantsCount: 0,
    applicants: [],
    acceptedStudents: [],
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-05T10:00:00Z'
  },
  {
    id: 'i12',
    companyId: 'c1',
    title: 'Business Analyst',
    department: 'Business Analytics',
    description: 'Analyze business processes and provide data-driven insights.',
    requirements: [
      'Business, Finance, or related field',
      'Strong analytical and problem-solving skills',
      'Experience with data analysis tools like Excel, Tableau, or Power BI',
      'Knowledge of SQL and database management',
      'GPA of 3.2 or higher'
    ],
    location: 'Giza, Egypt',
    type: 'onsite',
    duration: 16, // 16 weeks
    startDate: '2024-09-01',
    endDate: '2024-12-01',
    stipend: 3000,
    status: 'upcoming',
    applicantsCount: 0,
    applicants: [],
    acceptedStudents: [],
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-08-05T10:00:00Z'
  },
  {
    id: 'i13',
    companyId: 'c2',
    title: 'Mobile App Tester',
    department: 'Quality Assurance',
    description: 'Test and report bugs for our mobile applications.',
    requirements: [
      'Basic understanding of mobile app development',
      'Familiarity with testing frameworks and tools',
      'Strong attention to detail',
      'Good communication and documentation skills'
    ],
    location: 'Alexandria, Egypt',
    type: 'onsite',
    duration: 12, // 12 weeks
    startDate: '2025-03-01',
    endDate: '2025-06-01',
    stipend: 2500,
    status: 'upcoming',
    applicantsCount: 0,
    applicants: [],
    acceptedStudents: [],
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-20T10:00:00Z'
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
  },
  // Add more dummy applications for filter testing
  {
    id: 'a20',
    internshipId: 'i10',
    studentId: 's1',
    status: 'accepted',
    coverLetter: 'Excited to work on AI research.',
    resumeUrl: '/dummy-resume-ai.pdf',
    appliedAt: '2025-04-20T10:00:00Z',
    updatedAt: '2025-04-21T10:00:00Z',
  },
  {
    id: 'a21',
    internshipId: 'i11',
    studentId: 's1',
    status: 'accepted',
    coverLetter: 'Frontend is my passion.',
    resumeUrl: '/dummy-resume-frontend.pdf',
    appliedAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-02T10:00:00Z',
  },
  {
    id: 'a22',
    internshipId: 'i12',
    studentId: 's1',
    status: 'accepted',
    coverLetter: 'Business analysis experience.',
    resumeUrl: '/dummy-resume-ba.pdf',
    appliedAt: '2024-08-15T10:00:00Z',
    updatedAt: '2024-08-16T10:00:00Z',
  },
  {
    id: 'a23',
    internshipId: 'i13',
    studentId: 's1',
    status: 'accepted',
    coverLetter: 'Mobile testing skills.',
    resumeUrl: '/dummy-resume-mobile.pdf',
    appliedAt: '2025-02-15T10:00:00Z',
    updatedAt: '2025-02-16T10:00:00Z',
  },
  {
    id: 'a99',
    internshipId: 'i1',
    studentId: 's1',
    status: 'complete',
    coverLetter: 'Completed internship and ready for evaluation.',
    resumeUrl: '/dummy-resume-complete.pdf',
    appliedAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-05-10T10:00:00Z',
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
    status: 'approved',
    clarifications: []
  },
  {
    id: 'r2',
    internshipId: 'i2',
    studentId: 's2',
    title: 'Final Internship Report',
    content: 'This final report covers my complete internship experience at FinBank International. I have worked on various projects including market analysis, customer segmentation, and financial forecasting. The internship has significantly enhanced my understanding of business analytics in the financial sector.',
    attachments: ['/dummy-report-2.pdf', '/dummy-presentation.pptx'],
    submissionDate: '2023-08-12T15:40:00Z',
    status: 'evaluated',
    clarifications: []
  },
  {
    id: 'r3',
    internshipId: 'i1',
    studentId: 's1',
    title: 'Final Report - Summer 2023',
    content: 'This is the introduction---BODY---This is the body of the report.',
    attachments: [],
    submissionDate: '2023-09-01T10:00:00Z',
    status: 'flagged',
    clarifications: []
  },
  {
    id: 'r4',
    internshipId: 'i3',
    studentId: 's1',
    title: 'Midterm Report - Fall 2022',
    content: 'Fall intro---BODY---Fall body',
    attachments: [],
    submissionDate: '2022-11-10T10:00:00Z',
    status: 'rejected',
    clarifications: []
  },
  {
    id: 'r5',
    internshipId: 'i1',
    studentId: 's1',
    title: 'Draft Report',
    content: 'Draft intro---BODY---Draft body',
    attachments: [],
    submissionDate: '2025-05-01T10:00:00Z',
    status: 'submitted',
    clarifications: []
  },
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
  },
  {
    id: 'e4',
    reportId: 'r3',
    evaluatorId: 'sup1',
    evaluatorRole: 'supervisor',
    rating: 3,
    comments: 'The intern has shown satisfactory performance. There is room for improvement in code quality and testing.',
    submissionDate: '2023-08-25T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e5',
    reportId: 'r3',
    evaluatorId: 'a1',
    evaluatorRole: 'academicStaff',
    rating: 3,
    comments: 'The report meets the basic requirements but lacks depth in technical details and reflections.',
    submissionDate: '2023-08-30T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e6',
    reportId: 'r4',
    evaluatorId: 'sup1',
    evaluatorRole: 'supervisor',
    rating: 4,
    comments: 'Great job on the mobile app development. The intern has shown excellent skills in Flutter and mobile UI/UX design.',
    submissionDate: '2023-09-15T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e7',
    reportId: 'r4',
    evaluatorId: 'a1',
    evaluatorRole: 'academicStaff',
    rating: 4,
    comments: 'The report is well-written and provides good insights into the mobile development process.',
    submissionDate: '2023-09-20T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e8',
    reportId: 'r5',
    evaluatorId: 'sup1',
    evaluatorRole: 'supervisor',
    rating: 2,
    comments: 'The intern needs to improve in understanding design systems and component libraries. Code reviews were not adequately addressed.',
    submissionDate: '2023-09-30T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e9',
    reportId: 'r5',
    evaluatorId: 'a1',
    evaluatorRole: 'academicStaff',
    rating: 2,
    comments: 'The report lacks critical analysis and does not sufficiently relate practical work to academic concepts.',
    submissionDate: '2023-10-05T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e10',
    reportId: 'r6',
    evaluatorId: 'sup1',
    evaluatorRole: 'supervisor',
    rating: 5,
    comments: 'Excellent work on QA testing. The intern has a keen eye for detail and has significantly contributed to improving product quality.',
    submissionDate: '2023-10-20T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e11',
    reportId: 'r6',
    evaluatorId: 'a1',
    evaluatorRole: 'academicStaff',
    rating: 5,
    comments: 'The report is exemplary and demonstrates a thorough understanding of QA methodologies and practices.',
    submissionDate: '2023-10-25T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e12',
    reportId: 'r7',
    evaluatorId: 'sup2',
    evaluatorRole: 'supervisor',
    rating: 4,
    comments: 'Good progress in understanding AI concepts and applying them to real-world problems.',
    submissionDate: '2025-08-05T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e13',
    reportId: 'r7',
    evaluatorId: 'a2',
    evaluatorRole: 'academicStaff',
    rating: 4,
    comments: 'The report is well-structured and shows a good grasp of AI and machine learning principles.',
    submissionDate: '2025-08-10T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e14',
    reportId: 'r8',
    evaluatorId: 'sup2',
    evaluatorRole: 'supervisor',
    rating: 3,
    comments: 'Satisfactory performance. However, there are areas that need improvement, especially in responsive design and cross-browser compatibility.',
    submissionDate: '2025-04-15T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e15',
    reportId: 'r8',
    evaluatorId: 'a2',
    evaluatorRole: 'academicStaff',
    rating: 3,
    comments: 'The report meets the basic requirements but lacks critical analysis and depth.',
    submissionDate: '2025-04-20T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e16',
    reportId: 'r9',
    evaluatorId: 'sup2',
    evaluatorRole: 'supervisor',
    rating: 5,
    comments: 'Outstanding performance. The intern has demonstrated exceptional analytical and problem-solving skills.',
    submissionDate: '2024-12-05T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e17',
    reportId: 'r9',
    evaluatorId: 'a2',
    evaluatorRole: 'academicStaff',
    rating: 5,
    comments: 'The report is exemplary and reflects a deep understanding of business analytics concepts and applications.',
    submissionDate: '2024-12-10T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e18',
    reportId: 'r10',
    evaluatorId: 'sup2',
    evaluatorRole: 'supervisor',
    rating: 4,
    comments: 'Good attention to detail and understanding of mobile testing processes.',
    submissionDate: '2025-06-05T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'e19',
    reportId: 'r10',
    evaluatorId: 'a2',
    evaluatorRole: 'academicStaff',
    rating: 4,
    comments: 'The report is well-organized and provides a clear overview of the mobile testing procedures and outcomes.',
    submissionDate: '2025-06-10T10:00:00Z',
    status: 'completed'
  }
];