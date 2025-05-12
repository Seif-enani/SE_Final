import React, { useState, useMemo } from 'react';
import { 
  Search, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  CheckCircle,
  FileText,
  Download,
  Eye,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyUsers } from '../../data/users';
import { UserRole, Student } from '../../types/user';
import { dummyInternships, dummyApplications, dummyReports } from '../../data/internships';
import { Report } from '../../types/internship';
// Try to import Modal directly, fallback to inline if not found
let Modal: any;
try {
  // @ts-ignore
  Modal = require('../../components/common/Modal').default;
} catch {
  Modal = ({ children, onClose }: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative">{children}<button onClick={onClose} className="absolute top-2 right-2">X</button></div>
    </div>
  );
}

const SCADStudents = () => {
  // Get students from dummy data
  const students = dummyUsers.filter(user => user.role === UserRole.STUDENT) as Student[];
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Get unique faculties for filter
  const faculties = Array.from(new Set(students.map(student => student.faculty)));

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFaculty = facultyFilter === '' || student.faculty === facultyFilter;
    const matchesStatus = statusFilter === '' || 
      (statusFilter === 'active' && student.activeInternship) ||
      (statusFilter === 'inactive' && !student.activeInternship);
    
    return matchesSearch && matchesFaculty && matchesStatus;
  });

  // Get internship details for a student
  const getStudentInternshipDetails = (studentId: string) => {
    // If student has active internship
    if (students.find(s => s.id === studentId)?.activeInternship) {
      const internshipId = students.find(s => s.id === studentId)?.activeInternship;
      const internship = dummyInternships.find(i => i.id === internshipId);
      const company = dummyUsers.find(u => u.role === UserRole.COMPANY && u.id === internship?.companyId);
      
      return {
        internshipTitle: internship?.title || 'Unknown Internship',
        companyName: company?.companyName || 'Unknown Company',
        startDate: internship?.startDate || '',
        endDate: internship?.endDate || ''
      };
    }
    
    // Get latest application
    const applications = dummyApplications.filter(a => a.studentId === studentId);
    if (applications.length > 0) {
      // Sort by latest first
      applications.sort((a, b) => 
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );
      
      const latestApp = applications[0];
      const internship = dummyInternships.find(i => i.id === latestApp.internshipId);
      
      return {
        applicationStatus: latestApp.status,
        internshipTitle: internship?.title || 'Unknown Internship',
        appliedAt: latestApp.appliedAt
      };
    }
    
    return { status: 'No applications' };
  };

  // Get completion progress for a student
  const getCompletionProgress = (student: Student) => {
    const totalRequired = 2; // Assuming 2 internships are required
    const completed = student.completedInternships?.length || 0;
    return {
      completed,
      total: totalRequired,
      percentage: (completed / totalRequired) * 100
    };
  };

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedStudentReports, setSelectedStudentReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report|null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
          <p className="text-gray-600">View and monitor student internship progress</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={18} />}>
          Export Data
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 relative">
          <Input
            placeholder="Search students by name, ID or major..."
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
            options={[
              { value: '', label: 'All Faculties' },
              ...faculties.map(faculty => ({ value: faculty, label: faculty }))
            ]}
          />
        </div>
        
        <div className="md:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'active', label: 'Active Internship' },
              { value: 'inactive', label: 'No Active Internship' },
            ]}
          />
        </div>
      </div>

      {/* Students List */}
      {filteredStudents.length > 0 ? (
        <div className="space-y-6">
          {filteredStudents.map((student) => {
            const internshipDetails = getStudentInternshipDetails(student.id);
            const progress = getCompletionProgress(student);
            
            return (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="md:flex justify-between">
                    {/* Student Info */}
                    <div className="flex items-start mb-4 md:mb-0">
                      <div className="h-16 w-16 rounded-full overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
                        {student.profileImage ? (
                          <img 
                            src={student.profileImage} 
                            alt={student.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <GraduationCap size={32} className="text-gray-400" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">{student.name}</h3>
                        <p className="text-gray-600">{student.faculty} - {student.major}</p>
                        <p className="text-sm text-gray-500">ID: {student.studentId}</p>
                      </div>
                    </div>
                    
                    {/* Academic Info */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">GPA</p>
                        <p className="font-medium text-gray-900">{student.gpa}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Graduation Year</p>
                        <p className="font-medium text-gray-900">{student.graduationYear}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Internship Progress</p>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${progress.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{progress.completed}/{progress.total}</span>
                        </div>
                      </div>
                      
                      {student.activeInternship && (
                        <div className="md:col-span-3">
                          <p className="text-sm text-gray-500">Current Internship</p>
                          <div className="flex items-center">
                            <Briefcase size={14} className="text-green-500 mr-1" />
                            <p className="text-sm font-medium text-gray-900">
                              {internshipDetails.internshipTitle} at {internshipDetails.companyName}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(internshipDetails.startDate || '').toLocaleDateString()} -
                            {new Date(internshipDetails.endDate || '').toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      
                      {!student.activeInternship && 'applicationStatus' in internshipDetails && (
                        <div className="md:col-span-3">
                          <p className="text-sm text-gray-500">Latest Application</p>
                          <div className="flex items-center">
                            <Filter size={14} className="text-yellow-500 mr-1" />
                            <p className="text-sm font-medium text-gray-900">
                              {internshipDetails.internshipTitle} - {internshipDetails.applicationStatus}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Applied on {new Date(internshipDetails.appliedAt || '').toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      
                      {!student.activeInternship && !('applicationStatus' in internshipDetails) && (
                        <div className="md:col-span-3">
                          <p className="text-sm text-gray-500 italic">No active applications or internships</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex mt-4 md:mt-0 md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                      <Link to={`/scad/students/${student.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Eye size={16} />}
                        >
                          View Profile
                        </Button>
                      </Link>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<FileText size={16} />}
                        onClick={() => {
                          const reports = dummyReports.filter(r => r.studentId === student.id);
                          setSelectedStudentReports(reports);
                          setReportModalOpen(true);
                        }}
                      >
                        View Reports
                      </Button>
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
                <GraduationCap className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600 mb-4">
                {students.length === 0 
                  ? "There are no registered students yet" 
                  : "No students match your search criteria"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports Modal */}
      {reportModalOpen && (
        <Modal onClose={() => { setReportModalOpen(false); setSelectedReport(null); }}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Student Reports</h2>
            {selectedReport ? (
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedReport.title}</h3>
                <div className="mb-2 text-sm text-gray-600">Status: {selectedReport.status} | Submitted: {new Date(selectedReport.submissionDate).toLocaleDateString()}</div>
                <div className="mb-2"><strong>Content:</strong> {selectedReport.content}</div>
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
                {selectedReport.supervisorEvaluation && (
                  <div className="mb-2">
                    <strong>Supervisor Evaluation:</strong> {selectedReport.supervisorEvaluation.comments} (Rating: {selectedReport.supervisorEvaluation.rating})
                  </div>
                )}
                {selectedReport.academicEvaluation && (
                  <div className="mb-2">
                    <strong>Academic Evaluation:</strong> {selectedReport.academicEvaluation.comments} (Rating: {selectedReport.academicEvaluation.rating})
                  </div>
                )}
                <Button variant="outline" onClick={() => setSelectedReport(null)}>Back to Reports List</Button>
              </div>
            ) : (
              <div>
                {selectedStudentReports.length === 0 ? (
                  <div className="text-gray-500">No reports found for this student.</div>
                ) : (
                  <ul className="space-y-2">
                    {selectedStudentReports.map(report => (
                      <li key={report.id} className="border rounded p-2 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-gray-500">Status: {report.status} | Submitted: {new Date(report.submissionDate).toLocaleDateString()}</div>
                        </div>
                        <Button size="sm" variant="primary" onClick={() => setSelectedReport(report)}>View Details</Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SCADStudents;