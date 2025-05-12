import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Calendar, Download, Upload, 
  CheckCircle, XCircle, AlertCircle, 
  Star, User, GraduationCap 
} from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { dummyReports, dummyInternships } from '../../data/internships';

const StudentReports = () => {
  // Using student ID from the dummy data
  const studentId = 's1';
  
  // Filter reports for this student
  const studentReports = dummyReports.filter(report => report.studentId === studentId);
  
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      evaluated: 'bg-purple-100 text-purple-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      revised: 'bg-yellow-100 text-yellow-800'
    };
    
    const statusIcons = {
      draft: <FileText size={16} className="mr-1" />,
      submitted: <Upload size={16} className="mr-1" />,
      evaluated: <AlertCircle size={16} className="mr-1" />,
      approved: <CheckCircle size={16} className="mr-1" />,
      rejected: <XCircle size={16} className="mr-1" />,
      revised: <AlertCircle size={16} className="mr-1" />
    };
    
    return {
      className: `px-2 py-1 rounded-full flex items-center text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`,
      icon: statusIcons[status as keyof typeof statusIcons] || <FileText size={16} className="mr-1" />
    };
  };
  
  // State to track which report's details are expanded
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  
  const toggleReportExpand = (reportId: string) => {
    if (expandedReportId === reportId) {
      setExpandedReportId(null);
    } else {
      setExpandedReportId(reportId);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
        <p className="text-gray-600">Manage and track all your internship reports</p>
      </div>
      
      <div className="space-y-6">
        {studentReports.length > 0 ? (
          studentReports.map(report => {
            const internship = dummyInternships.find(i => i.id === report.internshipId);
            if (!internship) return null;
            
            const companyName = internship.companyId === 'c1' ? 'TechCorp Solutions' : 'FinBank International';
            const statusBadge = getStatusBadge(report.status);
            const isExpanded = expandedReportId === report.id;
            
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div 
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => toggleReportExpand(report.id)}
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{report.title}</h2>
                      <p className="text-gray-600">{internship.title} at {companyName}</p>
                      
                      <div className="mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          <span>Submitted on {new Date(report.submissionDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={statusBadge.className}>
                        {statusBadge.icon}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-6 border-t pt-4">
                      <div className="prose max-w-none mb-6">
                        <h3 className="text-lg font-medium mb-2">Report Content</h3>
                        <p>{report.content}</p>
                      </div>
                      
                      {report.attachments && report.attachments.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-2">Attachments</h3>
                          <div className="flex flex-wrap gap-2">
                            {report.attachments.map((attachment, index) => (
                              <a 
                                key={index}
                                href={attachment} 
                                className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 text-sm"
                              >
                                <Download size={16} className="mr-2" />
                                {attachment.split('/').pop()}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {report.supervisorEvaluation && (
                        <div className="bg-blue-50 rounded-md p-4 mb-4">
                          <h3 className="text-lg font-medium mb-2 flex items-center text-blue-800">
                            <User size={18} className="mr-2" /> Supervisor Evaluation
                          </h3>
                          <div className="flex items-center mb-2">
                            <div className="text-yellow-500 flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16}
                                  fill={i < report.supervisorEvaluation.rating ? "currentColor" : "none"}
                                  className="mr-1"
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              ({report.supervisorEvaluation.rating}/5)
                            </span>
                          </div>
                          <p className="text-blue-700">{report.supervisorEvaluation.comments}</p>
                        </div>
                      )}
                      
                      {report.academicEvaluation && (
                        <div className="bg-purple-50 rounded-md p-4">
                          <h3 className="text-lg font-medium mb-2 flex items-center text-purple-800">
                            <GraduationCap size={18} className="mr-2" /> Academic Evaluation
                          </h3>
                          <div className="flex items-center mb-2">
                            <div className="text-yellow-500 flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16}
                                  fill={i < report.academicEvaluation.rating ? "currentColor" : "none"}
                                  className="mr-1"
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              ({report.academicEvaluation.rating}/5)
                            </span>
                          </div>
                          <p className="text-purple-700">{report.academicEvaluation.comments}</p>
                        </div>
                      )}
                      
                      {report.status === 'rejected' && (
                        <div className="mt-4 flex justify-end">
                          <Button variant="primary">
                            Submit Revision
                          </Button>
                        </div>
                      )}
                      
                      {report.status === 'draft' && (
                        <div className="mt-4 flex justify-end">
                          <Button variant="primary">
                            Complete & Submit
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent>
              <div className="text-center py-8">
                <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
                <p className="text-gray-600 mb-4">You haven't submitted any internship reports</p>
                <Button variant="primary">
                  Create New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentReports;