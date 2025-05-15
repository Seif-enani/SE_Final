import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download,
  Eye,
  BookOpen,
  PenTool,
  UserPlus,
  AlertCircle,
  BarChart4,
  PieChart,
  TrendingUp,
  Award,
  ListChecks
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyReports, dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { useNotification } from '../../context/NotificationContext';

// Try to import Modal directly, fallback to inline if not found
let Modal: any;
try {
  // @ts-ignore
  Modal = require('../../components/common/Modal').default;
} catch {
  Modal = ({ children, onClose }: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative min-w-[350px] max-w-2xl w-full">{children}<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-900">✕</button></div>
    </div>
  );
}

// Add more dummy rejected/flagged reports for testing clarifications
const extraDummyReports = [
  {
    id: 'r200',
    internshipId: 'i1',
    studentId: 's1',
    title: 'Final Report - Spring 2024',
    content: 'This is a flagged report for testing.\nThe content was flagged for plagiarism.',
    attachments: ['/dummy-report-flagged.pdf'],
    submissionDate: '2024-05-01T10:00:00Z',
    status: 'flagged',
  },
  {
    id: 'r201',
    internshipId: 'i2',
    studentId: 's2',
    title: 'Midterm Report - Fall 2023',
    content: 'This report was rejected due to missing sections.\nPlease review the requirements.',
    attachments: [],
    submissionDate: '2023-11-10T09:00:00Z',
    status: 'rejected',
  },
  {
    id: 'r202',
    internshipId: 'i3',
    studentId: 's5',
    title: 'Final Report - Summer 2023',
    content: 'Flagged for late submission.\nNeeds clarification from SCAD.',
    attachments: ['/dummy-report-late.pdf'],
    submissionDate: '2023-08-20T14:00:00Z',
    status: 'flagged',
  },
  {
    id: 'r203',
    internshipId: 'i1',
    studentId: 's2',
    title: 'Rejected Report - Winter 2023',
    content: 'Rejected for not following the template.',
    attachments: [],
    submissionDate: '2023-12-15T12:00:00Z',
    status: 'rejected',
  },
];
const allDummyReports = [...dummyReports, ...extraDummyReports];

// --- Analytics helpers ---
const getCycles = (reports: any[]) => {
  // Dummy: group by year or semester
  const cycles = new Set<string>();
  reports.forEach(r => {
    const date = new Date(r.submissionDate);
    cycles.add(`${date.getFullYear()} - ${date.getMonth() < 6 ? 'Spring' : 'Fall'}`);
  });
  return Array.from(cycles);
};
const getCycleOfReport = (report: any) => {
  const date = new Date(report.submissionDate);
  return `${date.getFullYear()} - ${date.getMonth() < 6 ? 'Spring' : 'Fall'}`;
};

const SCADReports = () => {
  const { addNotification } = useNotification();
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  
  // Get evaluators
  const academicStaff = dummyUsers.filter(user => user.role === UserRole.ACADEMIC_STAFF);
  
  // Get unique faculties of students who submitted reports
  const studentIds = [...new Set(dummyReports.map(report => report.studentId))];
  const students = dummyUsers.filter(user => 
    user.role === UserRole.STUDENT && studentIds.includes(user.id)
  );
  const faculties = [...new Set(students.map((student: any) => student.faculty))];
  const majors = [...new Set(students.map((student: any) => student.major))];

  // Update status filter options
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'approved', label: 'Accepted' },
  ];

  // Map status filter to actual report statuses
  const statusMap: Record<string, string[]> = {
    pending: ['submitted', 'revised', 'evaluated'],
    flagged: ['flagged'],
    rejected: ['rejected'],
    approved: ['approved'],
  };

  // Filter reports based on search and filters
  const filteredReports = allDummyReports.filter(report => {
    const student = dummyUsers.find(u => u.id === report.studentId && u.role === UserRole.STUDENT);
    const internship = dummyInternships.find(i => i.id === report.internshipId);
    
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === '' || (statusMap[statusFilter] || []).includes(report.status);
    // Major filter
    const matchesMajor = majorFilter === '' || (student && 'major' in student && (student as any).major === majorFilter);
    // Faculty filter
    const matchesFaculty = facultyFilter === '' || 
      (student && 'faculty' in student && (student as any).faculty === facultyFilter);
    
    return matchesSearch && matchesStatus && matchesFaculty && matchesMajor;
  });

  const handleAssignEvaluator = (reportId: string, evaluatorId: string) => {
    // In a real application, this would make an API call to assign an evaluator
    addNotification('Evaluator successfully assigned', 'success');
  };
  
  // Get student name by ID
  const getStudentName = (studentId: string) => {
    const student = dummyUsers.find(u => u.id === studentId && u.role === UserRole.STUDENT);
    return student ? student.name : 'Unknown Student';
  };
  
  // Get internship title by ID
  const getInternshipTitle = (internshipId: string) => {
    const internship = dummyInternships.find(i => i.id === internshipId);
    return internship ? internship.title : 'Unknown Internship';
  };
  
  // Get company name from internship
  const getCompanyName = (internshipId: string) => {
    const internship = dummyInternships.find(i => i.id === internshipId);
    if (!internship) return 'Unknown Company';
    
    const company = dummyUsers.find(u => u.id === internship.companyId && u.role === UserRole.COMPANY);
    return company?.companyName || company?.name || 'Unknown Company';
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-yellow-100 text-yellow-800',
      evaluated: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      revised: 'bg-purple-100 text-purple-800'
    };
    
    return {
      badgeClass: statusColors[status] || 'bg-gray-100 text-gray-800',
      label: status.charAt(0).toUpperCase() + status.slice(1)
    };
  };

  // Add state for modal
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [clarification, setClarification] = useState('');
  const [clarifications, setClarifications] = useState<{ [reportId: string]: string[] }>({});
  const [showClarificationForm, setShowClarificationForm] = useState(false);

  // --- Analytics state ---
  const cycles = getCycles(allDummyReports);
  const [selectedCycle, setSelectedCycle] = useState<string>(cycles[0] || '');
  // Filter reports by selected cycle
  const reportsInCycle = allDummyReports.filter(r => getCycleOfReport(r) === selectedCycle);
  // Stats
  const acceptedCount = reportsInCycle.filter(r => r.status === 'approved').length;
  const rejectedCount = reportsInCycle.filter(r => r.status === 'rejected').length;
  const flaggedCount = reportsInCycle.filter(r => r.status === 'flagged').length;
  // Average review time (dummy: submissionDate to now or to a dummy reviewed date)
  const avgReviewTime = (() => {
    const times = reportsInCycle.map(r => {
      const sub = new Date(r.submissionDate).getTime();
      // Use a dummy reviewed date: +5 days for approved, +7 for rejected, +10 for flagged
      let reviewed = sub;
      if (r.status === 'approved') reviewed += 5 * 86400000;
      else if (r.status === 'rejected') reviewed += 7 * 86400000;
      else if (r.status === 'flagged') reviewed += 10 * 86400000;
      return reviewed - sub;
    });
    if (!times.length) return '-';
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    return `${Math.round(avg / 86400000)} days`;
  })();
  // Most frequently used courses (dummy: parse from content or use a dummy field)
  const courseCounts: Record<string, number> = {};
  reportsInCycle.forEach(r => {
    // Dummy: look for course names in content
    ['Data Structures', 'Algorithms', 'Business Analytics', 'Marketing', 'Finance', 'Mobile App Development'].forEach(course => {
      if (r.content && r.content.includes(course)) {
        courseCounts[course] = (courseCounts[course] || 0) + 1;
      }
    });
  });
  const mostUsedCourses = Object.entries(courseCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  // Top rated companies (by student evaluations, dummy: random ratings)
  const companyRatings: Record<string, number[]> = {};
  dummyUsers.filter(u => u.role === UserRole.COMPANY).forEach(company => {
    // Dummy: assign random ratings for demo
    companyRatings[company.id] = [4 + Math.random(), 3 + Math.random()];
  });
  const topRatedCompanies = Object.entries(companyRatings)
    .map(([id, ratings]) => ({
      id,
      avg: ratings.reduce((a, b) => a + b, 0) / ratings.length,
      name: dummyUsers.find(u => u.id === id)?.companyName || 'Unknown',
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 3);
  // Top companies by internship count
  const companyInternshipCounts: Record<string, number> = {};
  dummyInternships.forEach(i => {
    companyInternshipCounts[i.companyId] = (companyInternshipCounts[i.companyId] || 0) + 1;
  });
  const topCompaniesByInternships = Object.entries(companyInternshipCounts)
    .map(([id, count]) => ({
      id,
      count,
      name: dummyUsers.find(u => u.id === id)?.companyName || 'Unknown',
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <Card className="mb-4">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <BarChart4 className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Internship Report Analytics</h2>
            </div>
            <div>
              <label className="font-medium mr-2">Cycle:</label>
              <select className="border rounded px-2 py-1" value={selectedCycle} onChange={e => setSelectedCycle(e.target.value)}>
                {cycles.map(cycle => <option key={cycle} value={cycle}>{cycle}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 rounded p-4 flex items-center gap-3">
              <Award className="text-blue-500" />
              <div>
                <div className="text-xs text-gray-500">Accepted Reports</div>
                <div className="text-lg font-bold text-blue-700">{acceptedCount}</div>
              </div>
            </div>
            <div className="bg-red-50 rounded p-4 flex items-center gap-3">
              <XCircle className="text-red-500" />
              <div>
                <div className="text-xs text-gray-500">Rejected Reports</div>
                <div className="text-lg font-bold text-red-700">{rejectedCount}</div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded p-4 flex items-center gap-3">
              <AlertCircle className="text-yellow-500" />
              <div>
                <div className="text-xs text-gray-500">Flagged Reports</div>
                <div className="text-lg font-bold text-yellow-700">{flaggedCount}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded p-4">
              <div className="text-xs text-gray-500 mb-1">Average Review Time</div>
              <div className="text-lg font-bold text-gray-900">{avgReviewTime}</div>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <div className="text-xs text-gray-500 mb-1">Most Used Courses</div>
              <ul className="text-sm">
                {mostUsedCourses.length === 0 && <li className="text-gray-400">No data</li>}
                {mostUsedCourses.map(([course, count]) => (
                  <li key={course}>{course} <span className="text-xs text-gray-500">({count})</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded p-4">
              <div className="text-xs text-gray-500 mb-1">Top Rated Companies</div>
              <ul className="text-sm">
                {topRatedCompanies.length === 0 && <li className="text-gray-400">No data</li>}
                {topRatedCompanies.map(c => (
                  <li key={c.id}>{c.name} <span className="text-xs text-gray-500">({c.avg.toFixed(2)}/5)</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-50 rounded p-4">
              <div className="text-xs text-gray-500 mb-1">Top Companies by Internship Count</div>
              <ul className="text-sm">
                {topCompaniesByInternships.length === 0 && <li className="text-gray-400">No data</li>}
                {topCompaniesByInternships.map(c => (
                  <li key={c.id}>{c.name} <span className="text-xs text-gray-500">({c.count})</span></li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Reports</h1>
          <p className="text-gray-600">View and monitor student internship reports</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={18} />}>
          Export Data
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 relative">
          <Input
            placeholder="Search reports by title, student, or internship..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="md:w-48">
          <Select
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            options={[{ value: '', label: 'All Faculties' }, ...faculties.map(faculty => ({ value: faculty, label: faculty }))]}
          />
        </div>
        
        <div className="md:w-48">
          <Select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            options={[{ value: '', label: 'All Majors' }, ...majors.map(major => ({ value: major, label: major }))]}
          />
        </div>
        
        <div className="md:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-medium text-lg">{dummyReports.length}</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="font-medium text-lg">
              {dummyReports.filter(r => ['submitted', 'revised'].includes(r.status)).length}
            </p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
            <PenTool size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Evaluated</p>
            <p className="font-medium text-lg">
              {dummyReports.filter(r => r.status === 'evaluated').length}
            </p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Approved</p>
            <p className="font-medium text-lg">
              {dummyReports.filter(r => r.status === 'approved').length}
            </p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
            <XCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="font-medium text-lg">
              {dummyReports.filter(r => r.status === 'rejected').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="space-y-6">
          {filteredReports.map((report) => {
            const studentName = getStudentName(report.studentId);
            const internshipTitle = getInternshipTitle(report.internshipId);
            const companyName = getCompanyName(report.internshipId);
            const { badgeClass, label } = getStatusBadge(report.status);
            
            // Find student faculty
            const student = dummyUsers.find(u => u.id === report.studentId && u.role === UserRole.STUDENT);
            const faculty = student && 'faculty' in student ? (student as any).faculty : '';
            const major = student && 'major' in student ? (student as any).major : '';
            
            // Check if report needs evaluator assignment
            const needsEvaluator = ['submitted', 'revised'].includes(report.status) && !('academicEvaluation' in report && report.academicEvaluation);
            
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="md:flex justify-between">
                    {/* Report Info */}
                    <div className="mb-4 md:mb-0 md:w-1/2 pr-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg text-gray-900">{report.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClass}`}>
                          {label}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <User size={14} className="mr-2" />
                        <span>{studentName}</span>
                        {faculty && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                            {faculty} - {major}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <FileText size={14} className="mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-gray-700">{internshipTitle}</p>
                          <p className="text-sm text-gray-500">{companyName}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{report.content}</p>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>Submitted on {new Date(report.submissionDate).toLocaleDateString()}</span>
                        
                        {report.attachments.length > 0 && (
                          <span className="ml-4">
                            {report.attachments.length} attachment{report.attachments.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Evaluation Info */}
                    <div className="md:w-1/2 md:pl-6 md:border-l md:border-gray-100">
                      {('supervisorEvaluation' in report && typeof report.supervisorEvaluation === 'object' && report.supervisorEvaluation !== null) ? (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Supervisor Evaluation</p>
                          <div className="flex items-center mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < ((report.supervisorEvaluation as any)?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">{(report.supervisorEvaluation as any)?.rating || '-'}/5</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{(report.supervisorEvaluation as any)?.comments || 'N/A'}</p>
                        </div>
                      ) : null}
                      
                      {('academicEvaluation' in report && typeof report.academicEvaluation === 'object' && report.academicEvaluation !== null) ? (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Academic Evaluation</p>
                          <div className="flex items-center mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < ((report.academicEvaluation as any)?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">{(report.academicEvaluation as any)?.rating || '-'}/5</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{(report.academicEvaluation as any)?.comments || 'N/A'}</p>
                        </div>
                      ) : null}
                      
                      {/* Actions */}
                      <div className="flex flex-col space-y-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Eye size={16} />}
                          fullWidth
                          onClick={() => { setSelectedReport(report); setReportModalOpen(true); }}
                        >
                          View Full Report
                        </Button>
                        
                        {needsEvaluator && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                            <div className="flex items-start">
                              <AlertCircle size={16} className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-yellow-800 font-medium">Needs Academic Evaluator</p>
                                <p className="text-xs text-yellow-700">Assign academic staff to evaluate this report</p>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <Select
                                className="text-sm"
                                onChange={(e) => handleAssignEvaluator(report.id, e.target.value)}
                                options={[
                                  { value: '', label: 'Select Evaluator' },
                                  ...academicStaff.map(staff => ({ value: staff.id, label: `${staff.name} (${staff.department})` }))
                                ]}
                              />
                              
                              <Button
                                size="sm"
                                variant="primary"
                                leftIcon={<UserPlus size={14} />}
                                fullWidth
                                className="mt-2"
                              >
                                Assign Evaluator
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-10">
              <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">
                {dummyReports.length === 0 
                  ? "There are no reports submitted yet" 
                  : "No reports match your search criteria"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal for full report view */}
      {reportModalOpen && selectedReport && (
        <Modal onClose={() => { setReportModalOpen(false); setSelectedReport(null); setShowClarificationForm(false); }}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2">{selectedReport.title}</h2>
            <div className="text-sm text-gray-600 mb-2">Submitted: {new Date(selectedReport.submissionDate).toLocaleDateString()}</div>
            <div className="mb-2"><strong>Status:</strong> {selectedReport.status}</div>
            <div className="mb-2"><strong>Student:</strong> {getStudentName(selectedReport.studentId)}</div>
            <div className="mb-2"><strong>Internship:</strong> {getInternshipTitle(selectedReport.internshipId)} at {getCompanyName(selectedReport.internshipId)}</div>
            <div className="mb-2"><strong>Content:</strong> <div className="whitespace-pre-line text-gray-800 mt-1">{selectedReport.content}</div></div>
            {selectedReport.attachments && selectedReport.attachments.length > 0 && (
              <div className="mb-2">
                <strong>Attachments:</strong>
                <ul className="list-disc ml-6">
                  {selectedReport.attachments.map((file: string, idx: number) => (
                    <li key={idx}><a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{file}</a></li>
                  ))}
                </ul>
              </div>
            )}
            {'supervisorEvaluation' in selectedReport && selectedReport.supervisorEvaluation && typeof selectedReport.supervisorEvaluation === 'object' && (
              <div className="mb-2">
                <strong>Supervisor Evaluation:</strong> {String((selectedReport.supervisorEvaluation as any)?.comments ? `${(selectedReport.supervisorEvaluation as any)?.comments} (Rating: ${(selectedReport.supervisorEvaluation as any)?.rating})` : 'N/A')}
              </div>
            )}
            {'academicEvaluation' in selectedReport && selectedReport.academicEvaluation && typeof selectedReport.academicEvaluation === 'object' && (
              <div className="mb-2">
                <strong>Academic Evaluation:</strong> {String((selectedReport.academicEvaluation as any)?.comments ? `${(selectedReport.academicEvaluation as any)?.comments} (Rating: ${(selectedReport.academicEvaluation as any)?.rating})` : 'N/A')}
              </div>
            )}
            {/* Clarification Section for rejected/flagged */}
            {['rejected', 'flagged'].includes(selectedReport.status) && (
              <div className="mt-4">
                <h3 className="font-semibold text-red-700 mb-2">Clarifications</h3>
                {/* Existing clarifications */}
                {clarifications[selectedReport.id] && clarifications[selectedReport.id].length > 0 && (
                  <ul className="mb-2 space-y-2">
                    {clarifications[selectedReport.id].map((c, idx) => (
                      <li key={idx} className="bg-red-50 border border-red-200 rounded p-2 text-sm text-gray-800">{c}</li>
                    ))}
                  </ul>
                )}
                {showClarificationForm ? (
                  <form onSubmit={e => {
                    e.preventDefault();
                    if (clarification.trim()) {
                      setClarifications(prev => ({
                        ...prev,
                        [selectedReport.id]: [...(prev[selectedReport.id] || []), clarification.trim()]
                      }));
                      setClarification('');
                      setShowClarificationForm(false);
                    }
                  }} className="space-y-2">
                    <textarea
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                      placeholder="Enter your clarification..."
                      value={clarification}
                      onChange={e => setClarification(e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit" variant="primary">Submit Clarification</Button>
                      <Button type="button" variant="outline" onClick={() => setShowClarificationForm(false)}>Cancel</Button>
                    </div>
                  </form>
                ) : (
                  <Button variant="outline" onClick={() => setShowClarificationForm(true)}>Submit Clarification</Button>
                )}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => { setReportModalOpen(false); setSelectedReport(null); setShowClarificationForm(false); }}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SCADReports;