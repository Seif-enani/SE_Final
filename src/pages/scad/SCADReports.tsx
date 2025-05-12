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
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyReports, dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { useNotification } from '../../context/NotificationContext';

const SCADReports = () => {
  const { addNotification } = useNotification();
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');
  
  // Get evaluators
  const academicStaff = dummyUsers.filter(user => user.role === UserRole.ACADEMIC_STAFF);
  
  // Get unique faculties of students who submitted reports
  const studentIds = [...new Set(dummyReports.map(report => report.studentId))];
  const students = dummyUsers.filter(user => 
    user.role === UserRole.STUDENT && studentIds.includes(user.id)
  );
  const faculties = [...new Set(students.map((student: any) => student.faculty))];

  // Filter reports based on search and filters
  const filteredReports = dummyReports.filter(report => {
    const student = dummyUsers.find(u => u.id === report.studentId && u.role === UserRole.STUDENT);
    const internship = dummyInternships.find(i => i.id === report.internshipId);
    
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === '' || report.status === statusFilter;
    const matchesFaculty = facultyFilter === '' || 
      (student && 'faculty' in student && (student as any).faculty === facultyFilter);
    
    return matchesSearch && matchesStatus && matchesFaculty;
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

  return (
    <div className="space-y-6">
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
            placeholder="All Faculties"
          >
            <option value="">All Faculties</option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="md:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="All Statuses"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="evaluated">Evaluated</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="revised">Revised</option>
          </Select>
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
            const needsEvaluator = ['submitted', 'revised'].includes(report.status) && !report.academicEvaluation;
            
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
                      {report.supervisorEvaluation && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Supervisor Evaluation</p>
                          <div className="flex items-center mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < report.supervisorEvaluation!.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">{report.supervisorEvaluation.rating}/5</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{report.supervisorEvaluation.comments}</p>
                        </div>
                      )}
                      
                      {report.academicEvaluation && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Academic Evaluation</p>
                          <div className="flex items-center mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < report.academicEvaluation!.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">{report.academicEvaluation.rating}/5</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{report.academicEvaluation.comments}</p>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex flex-col space-y-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Eye size={16} />}
                          fullWidth
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
                                placeholder="Select Academic Staff"
                                className="text-sm"
                                onChange={(e) => handleAssignEvaluator(report.id, e.target.value)}
                              >
                                <option value="">Select Evaluator</option>
                                {academicStaff.map((staff) => (
                                  <option key={staff.id} value={staff.id}>
                                    {staff.name} ({staff.department})
                                  </option>
                                ))}
                              </Select>
                              
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
    </div>
  );
};

export default SCADReports;