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
import { Report } from '../../types/internship';
import { Input, Textarea, Select } from '../../components/common/FormElements';
import { UserRole } from '../../types/user';

// Dummy courses by major (reuse from ProfilePage)
const coursesByMajor: Record<string, string[]> = {
  'Computer Science': [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Database Systems',
    'Web Development',
    'Mobile App Development',
    'Software Engineering',
    'Computer Networks',
    'Artificial Intelligence',
    'Machine Learning',
  ],
  'Business Informatics': [
    'Business Analytics',
    'Financial Accounting',
    'Information Systems',
    'Data Visualization',
    'Project Management',
    'Database Systems',
    'Business Intelligence',
  ],
  'Information Systems': [
    'Systems Analysis',
    'Database Management',
    'Enterprise Systems',
    'IT Project Management',
    'Business Process Modeling',
  ],
  'Marketing': [
    'Principles of Marketing',
    'Consumer Behavior',
    'Digital Marketing',
    'Market Research',
    'Brand Management',
  ],
  'Finance': [
    'Corporate Finance',
    'Financial Markets',
    'Investment Analysis',
    'Banking Operations',
    'Risk Management',
  ],
  'Engineering': [
    'Engineering Mathematics',
    'Thermodynamics',
    'Fluid Mechanics',
    'Control Systems',
    'Materials Science',
  ],
  'Mobile Development': [
    'Mobile App Development',
    'Cross-Platform Development',
    'User Interface Design',
    'Mobile Security',
  ],
  'Business Administration': [
    'Organizational Behavior',
    'Business Law',
    'Strategic Management',
    'Operations Management',
    'Human Resource Management',
  ],
};

// Dummy companies for evaluation
const companies = [
  { id: 'c1', name: 'TechCorp Solutions' },
  { id: 'c2', name: 'FinBank International' },
];

// Dummy student major (should come from auth/user context)
const studentMajor = 'Computer Science';

// Evaluation type for student-to-company evaluation
interface StudentCompanyEvaluation {
  id: string;
  companyId: string;
  rating: number;
  comments: string;
  recommend: boolean;
}

// Extend dummyReports with comments and rejected status (no 'flagged')
const dummyReportsWithComments = [
  ...dummyReports,
  {
    id: 'r100',
    internshipId: 'i1',
    studentId: 's1',
    title: 'Final Report - Summer 2023',
    content: 'This is the introduction---BODY---This is the body of the report.',
    attachments: [],
    submissionDate: '2023-09-01T10:00:00Z',
    status: 'rejected',
    comments: [
      {
        id: 'c1',
        author: 'Supervisor',
        text: 'The report lacks detail in the project outcomes section. Please revise and resubmit.',
        date: '2023-09-05T12:00:00Z',
      },
      {
        id: 'c2',
        author: 'SCAD Office',
        text: 'Formatting issues found. Please follow the provided template.',
        date: '2023-09-06T09:30:00Z',
      },
    ],
  } as Report & { comments?: any[] },
  {
    id: 'r101',
    internshipId: 'i2',
    studentId: 's1',
    title: 'Midterm Report - Spring 2023',
    content: 'Intro---BODY---Body',
    attachments: [],
    submissionDate: '2023-04-15T10:00:00Z',
    status: 'rejected',
    comments: [
      {
        id: 'c3',
        author: 'Supervisor',
        text: 'Plagiarism detected in the background section.',
        date: '2023-04-18T15:00:00Z',
      },
    ],
  } as Report & { comments?: any[] },
  // Accepted reports
  {
    id: 'r102',
    internshipId: 'i1',
    studentId: 's1',
    title: 'Final Report - Winter 2023',
    content: 'Winter intro---BODY---Winter body',
    attachments: [],
    submissionDate: '2023-12-20T10:00:00Z',
    status: 'approved',
  } as Report,
  {
    id: 'r103',
    internshipId: 'i2',
    studentId: 's1',
    title: 'Midterm Report - Fall 2022',
    content: 'Fall intro---BODY---Fall body',
    attachments: [],
    submissionDate: '2022-11-10T10:00:00Z',
    status: 'approved',
  } as Report,
];

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

  // Add state for tab selection
  const [activeTab, setActiveTab] = useState<'reports' | 'evaluations'>('reports');

  // Local state for reports CRUD
  const [reports, setReports] = useState<Report[]>([...dummyReportsWithComments.filter(r => r.studentId === studentId)]);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);

  // Local state for evaluations CRUD
  const [evaluations, setEvaluations] = useState<StudentCompanyEvaluation[]>([
    {
      id: 'e1',
      companyId: 'c1',
      rating: 5,
      comments: 'Great learning environment, supportive team, and challenging projects. Highly recommended!',
      recommend: true,
    },
    {
      id: 'e2',
      companyId: 'c2',
      rating: 3,
      comments: 'Good experience overall, but the onboarding process could be improved.',
      recommend: true,
    },
    {
      id: 'e3',
      companyId: 'c2',
      rating: 2,
      comments: 'Workload was too high and guidance was limited. Not recommended for beginners.',
      recommend: false,
    },
  ]);
  const [editingEval, setEditingEval] = useState<StudentCompanyEvaluation | null>(null);
  const [showEvalForm, setShowEvalForm] = useState(false);

  // Report form state
  const [reportForm, setReportForm] = useState({
    id: '',
    internshipId: '',
    title: '',
    introduction: '',
    body: '',
    selectedCourses: [] as string[],
    attachments: [] as string[],
    status: 'draft' as Report['status'],
  });

  // Evaluation form state
  const [evalForm, setEvalForm] = useState({
    id: '',
    companyId: '',
    rating: 0,
    comments: '',
    recommend: false,
  });

  // Fix html2pdf import for dev/demo
  let html2pdf: any = undefined;
  try {
    // @ts-ignore
    html2pdf = window.html2pdf;
  } catch (e) {
    html2pdf = undefined;
  }

  // Add state for appeals
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [appealReportId, setAppealReportId] = useState<string | null>(null);
  const [appealMessage, setAppealMessage] = useState('');
  const [appeals, setAppeals] = useState<{ [reportId: string]: string }>({});
  const [appealSuccess, setAppealSuccess] = useState(false);

  // Add tab navigation
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reports & Evaluations</h1>
        <p className="text-gray-600">Manage and track all your internship reports and company evaluations</p>
        <div className="flex space-x-4 mt-4">
          <Button variant={activeTab === 'reports' ? 'primary' : 'outline'} onClick={() => setActiveTab('reports')}>Reports</Button>
          <Button variant={activeTab === 'evaluations' ? 'primary' : 'outline'} onClick={() => setActiveTab('evaluations')}>Evaluations</Button>
        </div>
      </div>
      {activeTab === 'reports' && (
        <div>
          <div className="mb-4 flex justify-end">
            <Button variant="primary" onClick={() => { setShowReportForm(true); setEditingReport(null); setReportForm({ id: '', internshipId: '', title: '', introduction: '', body: '', selectedCourses: [], attachments: [], status: 'draft' }); }}>Create New Report</Button>
          </div>
          {/* List of reports */}
          <div className="space-y-6">
            {reports.length > 0 ? (
              reports.map(report => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{report.title}</h2>
                        <p className="text-gray-600">{dummyInternships.find(i => i.id === report.internshipId)?.title || 'Internship'} at {companies.find(c => c.id === dummyInternships.find(i => i.id === report.internshipId)?.companyId)?.name}</p>
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            <span>Submitted on {report.submissionDate ? new Date(report.submissionDate).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={getStatusBadge(report.status).className}>
                          {getStatusBadge(report.status).icon}
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => handleDownloadPDF(report)}>Download PDF</Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          setEditingReport(report);
                          setShowReportForm(true);
                          setReportForm({
                            id: report.id,
                            internshipId: report.internshipId,
                            title: report.title,
                            introduction: report.content.split('---BODY---')[0] || '',
                            body: report.content.split('---BODY---')[1] || '',
                            selectedCourses: (report as any).selectedCourses || [],
                            attachments: report.attachments || [],
                            status: report.status,
                          });
                        }}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDeleteReport(report.id)}>Delete</Button>
                      </div>
                    </div>
                    {/* Expanded details, similar to before */}
                    {report.status === 'rejected' && (
                      <div className="mt-4">
                        {(report as any).comments && (
                          <div className="bg-red-50 border border-red-200 rounded p-4 mb-2">
                            <h4 className="font-semibold text-red-700 mb-2">Comments</h4>
                            <ul className="space-y-2">
                              {(report as any).comments.map((comment: any) => (
                                <li key={comment.id} className="text-sm text-gray-800">
                                  <span className="font-medium text-gray-900">{comment.author}:</span> {comment.text}
                                  <span className="ml-2 text-xs text-gray-500">({new Date(comment.date).toLocaleDateString()})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {appeals[report.id] ? (
                          <div className="bg-green-50 border border-green-200 rounded p-3 mt-2">
                            <strong>Your Appeal:</strong> {appeals[report.id]}
                          </div>
                        ) : (
                          <Button size="sm" variant="primary" onClick={() => { setAppealModalOpen(true); setAppealReportId(report.id); setAppealMessage(''); setAppealSuccess(false); }}>Appeal</Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
                    <p className="text-gray-600 mb-4">You haven't submitted any internship reports</p>
                    <Button variant="primary" onClick={() => setShowReportForm(true)}>Create New Report</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          {/* Report Form Modal */}
          {showReportForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{editingReport ? 'Edit Report' : 'Create Report'}</h2>
                <form onSubmit={handleReportFormSubmit}>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Title</label>
                    <Input value={reportForm.title} onChange={e => setReportForm(f => ({ ...f, title: e.target.value }))} required />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Introduction</label>
                    <Textarea value={reportForm.introduction} onChange={e => setReportForm(f => ({ ...f, introduction: e.target.value }))} required />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Body</label>
                    <Textarea value={reportForm.body} onChange={e => setReportForm(f => ({ ...f, body: e.target.value }))} required rows={6} />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Courses that helped you</label>
                    <Select
                      multiple
                      value={reportForm.selectedCourses}
                      onChange={e => {
                        const options = Array.from(e.target.selectedOptions).map(o => o.value);
                        setReportForm(f => ({ ...f, selectedCourses: options }));
                      }}
                      options={(coursesByMajor[studentMajor] || []).map(course => ({ value: course, label: course }))}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button type="button" variant="outline" onClick={() => setShowReportForm(false)}>Cancel</Button>
                    <Button type="submit" variant="primary">{editingReport ? 'Update' : 'Create'}</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 'evaluations' && (
        <div>
          <div className="mb-4 flex justify-end">
            <Button variant="primary" onClick={() => { setShowEvalForm(true); setEditingEval(null); setEvalForm({ id: '', companyId: '', rating: 0, comments: '', recommend: false }); }}>Add Evaluation</Button>
          </div>
          {/* List of evaluations */}
          <div className="space-y-6">
            {evaluations.length > 0 ? (
              evaluations.map(evaluation => (
                <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{companies.find(c => c.id === evaluation.companyId)?.name}</h2>
                        <div className="flex items-center mt-2">
                          <div className="text-yellow-500 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < evaluation.rating ? 'currentColor' : 'none'} className="mr-1" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">({evaluation.rating}/5)</span>
                        </div>
                        <div className="mt-2 text-gray-700">{evaluation.comments}</div>
                        <div className="mt-2 text-sm">
                          <span className={evaluation.recommend ? 'text-green-600' : 'text-red-600'}>
                            {evaluation.recommend ? 'Recommended for other students' : 'Not recommended'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button size="sm" variant="outline" onClick={() => { setEditingEval(evaluation); setShowEvalForm(true); setEvalForm({ ...evaluation }); }}>Edit</Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownloadEvalPDF(evaluation)}>Download PDF</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDeleteEval(evaluation.id)}>Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No evaluations yet</h3>
                    <p className="text-gray-600 mb-4">You haven't submitted any company evaluations</p>
                    <Button variant="primary" onClick={() => setShowEvalForm(true)}>Add Evaluation</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          {/* Evaluation Form Modal */}
          {showEvalForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{editingEval ? 'Edit Evaluation' : 'Add Evaluation'}</h2>
                <form onSubmit={handleEvalFormSubmit}>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Company</label>
                    <Select
                      value={evalForm.companyId}
                      onChange={e => setEvalForm(f => ({ ...f, companyId: e.target.value }))}
                      required
                      options={[{ value: '', label: 'Select company' }, ...companies.map(company => ({ value: company.id, label: company.name }))]}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Rating</label>
                    <Select
                      value={evalForm.rating.toString()}
                      onChange={e => setEvalForm(f => ({ ...f, rating: Number(e.target.value) }))}
                      required
                      options={[
                        { value: '0', label: 'Select rating' },
                        ...[1, 2, 3, 4, 5].map(r => ({ value: r.toString(), label: r.toString() })),
                      ]}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1">Comments</label>
                    <Textarea value={evalForm.comments} onChange={e => setEvalForm(f => ({ ...f, comments: e.target.value }))} required />
                  </div>
                  <div className="mb-3 flex items-center">
                    <input type="checkbox" id="recommend" checked={evalForm.recommend} onChange={e => setEvalForm(f => ({ ...f, recommend: e.target.checked }))} />
                    <label htmlFor="recommend" className="ml-2">I recommend this company to other students</label>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button type="button" variant="outline" onClick={() => setShowEvalForm(false)}>Cancel</Button>
                    <Button type="submit" variant="primary">{editingEval ? 'Update' : 'Add'}</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Appeal Modal */}
      {appealModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Appeal Rejected Report</h2>
            <form onSubmit={e => {
              e.preventDefault();
              if (appealReportId) {
                setAppeals(prev => ({ ...prev, [appealReportId]: appealMessage }));
                setAppealSuccess(true);
                setTimeout(() => { setAppealModalOpen(false); setAppealReportId(null); setAppealMessage(''); }, 1500);
              }
            }}>
              <label className="block font-medium mb-1">Appeal Message</label>
              <Textarea value={appealMessage} onChange={e => setAppealMessage(e.target.value)} required rows={4} placeholder="Explain why you are appealing this decision..." />
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setAppealModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Submit Appeal</Button>
              </div>
              {appealSuccess && <div className="text-green-600 mt-2">Appeal submitted successfully!</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // --- Handlers for CRUD and PDF ---
  function handleReportFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const content = `${reportForm.introduction}---BODY---${reportForm.body}`;
    if (editingReport) {
      setReports(reports.map(r => r.id === reportForm.id ? {
        ...r,
        title: reportForm.title,
        content,
        selectedCourses: reportForm.selectedCourses,
        attachments: reportForm.attachments,
        status: reportForm.status,
      } : r));
    } else {
      setReports([
        ...reports,
        {
          id: `r${Date.now()}`,
          internshipId: reportForm.internshipId,
          studentId,
          title: reportForm.title,
          content,
          attachments: reportForm.attachments,
          submissionDate: new Date().toISOString(),
          status: reportForm.status,
        } as Report,
      ]);
    }
    setShowReportForm(false);
    setEditingReport(null);
  }
  function handleDeleteReport(id: string) {
    setReports(reports.filter(r => r.id !== id));
  }
  function handleEvalFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingEval) {
      setEvaluations(evaluations.map(ev => ev.id === evalForm.id ? { ...evalForm } : ev));
    } else {
      setEvaluations([...evaluations, { ...evalForm, id: `e${Date.now()}` }]);
    }
    setShowEvalForm(false);
    setEditingEval(null);
  }
  function handleDeleteEval(id: string) {
    setEvaluations(evaluations.filter(ev => ev.id !== id));
  }
  function handleDownloadPDF(report: Report & { selectedCourses?: string[] }) {
    const [introduction, body] = report.content.split('---BODY---');
    const element = document.createElement('div');
    element.innerHTML = `
      <h2>${report.title}</h2>
      <h4>Introduction</h4>
      <p>${introduction || ''}</p>
      <h4>Body</h4>
      <p>${body || ''}</p>
      <h4>Courses that helped</h4>
      <ul>${(report.selectedCourses || []).map((c: string) => `<li>${c}</li>`).join('')}</ul>
    `;
    html2pdf().from(element).save(`${report.title}.pdf`);
  }
  function handleDownloadEvalPDF(evaluation: StudentCompanyEvaluation) {
    const company = companies.find(c => c.id === evaluation.companyId)?.name || 'Company';
    const element = document.createElement('div');
    element.innerHTML = `
      <h2>Company Evaluation</h2>
      <h3>Company: ${company}</h3>
      <h4>Rating: ${evaluation.rating}/5</h4>
      <h4>Recommendation: <span style='color:${evaluation.recommend ? 'green' : 'red'}'>${evaluation.recommend ? 'Recommended' : 'Not Recommended'}</span></h4>
      <h4>Comments:</h4>
      <p>${evaluation.comments}</p>
    `;
    html2pdf().from(element).save(`${company}-evaluation.pdf`);
  }
};

export default StudentReports;