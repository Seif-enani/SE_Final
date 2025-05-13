import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/FormElements';
import { dummyApplications, dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { Internship } from '../../types/internship';
import { Company } from '../../types/user';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

const dummyApplicants: Record<string, {
  name: string;
  photo: string;
  major: string;
  email: string;
  jobTitle: string;
}> = {
  s1: {
    name: 'Ahmed Mohamed',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    major: 'Computer Science',
    email: 'ahmed.mohamed@email.com',
    jobTitle: 'Software Engineering Intern',
  },
  s2: {
    name: 'Sara Ali',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    major: 'Business Informatics',
    email: 'sara.ali@email.com',
    jobTitle: 'Business Analyst Intern',
  },
  s5: {
    name: 'Khaled Samir',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    major: 'Computer Engineering',
    email: 'khaled.samir@email.com',
    jobTitle: 'Mobile App Development Intern',
  },
};

// Dummy evaluations
const initialEvaluations = [
  {
    id: 'e1',
    applicationId: 'a6',
    studentId: 's5',
    content: 'Khaled showed excellent skills in mobile development and teamwork.',
    rating: 5,
  },
  {
    id: 'e2',
    applicationId: 'a6',
    studentId: 's2',
    content: 'Sara completed her internship with great dedication and professionalism.',
    rating: 4,
  },
];

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

const SCADEvaluations = () => {
  try {
    // Find all completed interns
    const completedApps = dummyApplications.filter(app => app.status === 'accepted');
    const completedInterns = completedApps.map(app => ({
      ...app,
      ...(dummyApplicants[app.studentId] || {}),
      internship: dummyInternships.find(i => i.id === app.internshipId) as Internship | undefined,
    }));

    const [evaluations, setEvaluations] = useState(initialEvaluations);
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
    const [form, setForm] = useState({ content: '', rating: 5 });
    const [isEditing, setIsEditing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState<any>(null);
    const [expandedInternId, setExpandedInternId] = useState<string | null>(null);

    // Find evaluation for selected application
    const selectedEval = selectedAppId
      ? evaluations.find(ev => ev.applicationId === selectedAppId)
      : null;

    const handleEdit = (appId: string) => {
      setSelectedAppId(appId);
      setIsEditing(true);
      if (selectedEval) {
        setForm({ content: selectedEval.content, rating: selectedEval.rating });
      } else {
        setForm({ content: '', rating: 5 });
      }
    };

    const handleDelete = (appId: string) => {
      setEvaluations(evals => evals.filter(ev => ev.applicationId !== appId));
      setSelectedAppId(null);
      setIsEditing(false);
    };

    const handleSave = () => {
      if (!selectedAppId) return;
      setEvaluations(evals => {
        const exists = evals.find(ev => ev.applicationId === selectedAppId);
        if (exists) {
          return evals.map(ev =>
            ev.applicationId === selectedAppId ? { ...ev, ...form } : ev
          );
        } else {
          return [
            ...evals,
            {
              id: 'e' + (evals.length + 1),
              applicationId: selectedAppId,
              studentId: selectedIntern?.studentId || '',
              ...form,
            },
          ];
        }
      });
      setIsEditing(false);
      setSelectedAppId(null);
    };

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Intern Evaluations</h1>
          <p className="text-gray-600">Create, read, update, or delete evaluations for students who have completed their internships.</p>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader title="Completed Interns" />
            <CardContent>
              {completedInterns.length > 0 ? (
                <div className="space-y-4">
                  {completedInterns.map(intern => (
                    <div key={intern.id} className="border-b last:border-b-0">
                      <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedInternId(expandedInternId === intern.id ? null : intern.id)}>
                        <div className="flex items-center gap-3">
                          <img src={intern.photo} alt={intern.name} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <div className="font-medium text-gray-900">{intern.name}</div>
                            <div className="text-xs text-gray-500">{String(intern.internship && 'title' in intern.internship ? intern.internship.title : 'Unknown Internship')}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {expandedInternId === intern.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                      {expandedInternId === intern.id && (
                        <div className="p-6 bg-gray-50">
                          <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-2">Evaluation for {intern.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Student Details */}
                              <div>
                                <h3 className="font-semibold text-lg mb-2">Student Details</h3>
                                <div className="flex items-center gap-3 mb-2">
                                  <img src={intern.photo} alt={intern.name} className="h-12 w-12 rounded-full object-cover" />
                                  <div>
                                    <div className="font-medium text-gray-900">{intern.name}</div>
                                    <div className="text-xs text-gray-500">{intern.major}</div>
                                    <div className="text-xs text-gray-500">{intern.email}</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 mb-2">Job Title: {intern.jobTitle}</div>
                                <div className="text-xs text-gray-500 mb-2">Application ID: {intern.id}</div>
                              </div>
                              {/* Internship Details */}
                              <div>
                                <h3 className="font-semibold text-lg mb-2">Internship Details</h3>
                                {intern.internship && (
                                  <>
                                    <div className="flex items-center gap-2 mb-2">
                                      {(() => {
                                        const company = dummyUsers.find(u => u.id === intern.internship?.companyId && u.role === UserRole.COMPANY);
                                        return company?.companyLogo ? (
                                          <img src={company.companyLogo} alt={company.companyName} className="h-8 w-8 rounded object-cover" />
                                        ) : null;
                                      })()}
                                      <div>
                                        <strong>Company:</strong> {(() => {
                                          const company = dummyUsers.find(u => u.id === intern.internship?.companyId && u.role === UserRole.COMPANY);
                                          return company?.companyName || company?.name || 'Unknown Company';
                                        })()}
                                      </div>
                                    </div>
                                    <div className="mb-1"><strong>Department:</strong> {intern.internship.department}</div>
                                    <div className="mb-1"><strong>Title:</strong> {intern.internship.title}</div>
                                    <div className="mb-1"><strong>Description:</strong> {intern.internship.description}</div>
                                    <div className="mb-1"><strong>Requirements:</strong> <ul className="list-disc ml-5 text-xs">{intern.internship.requirements.map((req: string, idx: number) => <li key={idx}>{req}</li>)}</ul></div>
                                    <div className="mb-1"><strong>Location:</strong> {intern.internship.location}</div>
                                    <div className="mb-1"><strong>Type:</strong> {intern.internship.type}</div>
                                    <div className="mb-1"><strong>Stipend:</strong> {intern.internship.stipend > 0 ? `${intern.internship.stipend} EGP` : 'Unpaid'}</div>
                                    <div className="mb-1"><strong>Website:</strong> {(() => {
                                      const company = dummyUsers.find(u => u.id === intern.internship?.companyId && u.role === UserRole.COMPANY);
                                      if (company && 'website' in company && typeof company.website === 'string') {
                                        return <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{company.website}</a>;
                                      }
                                      return 'N/A';
                                    })()}</div>
                                    <div className="mb-1"><strong>Main Supervisor:</strong> {(() => {
                                      let supervisorId: string | undefined = undefined;
                                      if (intern.internship && 'supervisorId' in intern.internship) {
                                        supervisorId = (intern.internship as any).supervisorId;
                                      }
                                      const supervisor = supervisorId ? dummyUsers.find(u => u.id === supervisorId) : undefined;
                                      return supervisor?.name || 'Unknown Supervisor';
                                    })()}</div>
                                    <div className="mb-1"><strong>Supervisor Email:</strong> {(() => {
                                      let supervisorId: string | undefined = undefined;
                                      if (intern.internship && 'supervisorId' in intern.internship) {
                                        supervisorId = (intern.internship as any).supervisorId;
                                      }
                                      const supervisor = supervisorId ? dummyUsers.find(u => u.id === supervisorId) : undefined;
                                      return supervisor?.email || 'N/A';
                                    })()}</div>
                                    <div className="mb-1"><strong>Start Date:</strong> {intern.internship.startDate ? new Date(intern.internship.startDate).toLocaleDateString() : '-'}</div>
                                    <div className="mb-1"><strong>End Date:</strong> {intern.internship.endDate ? new Date(intern.internship.endDate).toLocaleDateString() : '-'}</div>
                                  </>
                                )}
                              </div>
                            </div>
                            {/* Evaluations Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                              {/* Company Evaluation */}
                              <div className="bg-gray-50 rounded p-4">
                                <h4 className="font-semibold mb-2">Company Evaluation</h4>
                                {/* TODO: Fetch and show real company evaluation for this intern */}
                                <div className="mb-2">(Not implemented: show company evaluation here)</div>
                              </div>
                              {/* Student Evaluation */}
                              <div className="bg-gray-50 rounded p-4">
                                <h4 className="font-semibold mb-2">Student Evaluation</h4>
                                {/* TODO: Fetch and show real student evaluation for this intern */}
                                <div className="mb-2">(Not implemented: show student evaluation here)</div>
                              </div>
                              {/* SCAD/Academic Evaluation */}
                              <div className="bg-gray-50 rounded p-4">
                                <h4 className="font-semibold mb-2">SCAD/Academic Evaluation</h4>
                                <div className="mb-2"><strong>Content:</strong> {(() => {
                                  const evalForIntern = evaluations.find(ev => ev.applicationId === intern.id);
                                  return evalForIntern?.content || 'No evaluation yet.';
                                })()}</div>
                                <div><strong>Rating:</strong> <span className="text-yellow-600 font-bold">{(() => {
                                  const evalForIntern = evaluations.find(ev => ev.applicationId === intern.id);
                                  return evalForIntern?.rating || '-';
                                })()}/5</span></div>
                                <div className="flex gap-2 mt-4">
                                  <Button variant="primary" onClick={() => { setIsEditing(true); setSelectedAppId(intern.id); }}>Edit</Button>
                                  <Button variant="danger" onClick={() => handleDelete(intern.id)}>Delete</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No completed interns found.</div>
              )}
            </CardContent>
          </Card>
          {/* Evaluation Modal */}
          {modalOpen && selectedIntern && (
            <Modal onClose={() => { setModalOpen(false); setSelectedIntern(null); }}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Evaluation for {selectedIntern.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Student Details</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <img src={selectedIntern.photo} alt={selectedIntern.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-gray-900">{selectedIntern.name}</div>
                        <div className="text-xs text-gray-500">{selectedIntern.major}</div>
                        <div className="text-xs text-gray-500">{selectedIntern.email}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">Job Title: {selectedIntern.jobTitle}</div>
                    <div className="text-xs text-gray-500 mb-2">Application ID: {selectedIntern.id}</div>
                  </div>
                  {/* Internship Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Internship Details</h3>
                    {selectedIntern.internship && (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          {(() => {
                            const company = dummyUsers.find(u => u.id === selectedIntern.internship?.companyId && u.role === UserRole.COMPANY);
                            return company?.companyLogo ? (
                              <img src={company.companyLogo} alt={company.companyName} className="h-8 w-8 rounded object-cover" />
                            ) : null;
                          })()}
                          <div>
                            <strong>Company:</strong> {(() => {
                              const company = dummyUsers.find(u => u.id === selectedIntern.internship?.companyId && u.role === UserRole.COMPANY);
                              return company?.companyName || company?.name || 'Unknown Company';
                            })()}
                          </div>
                        </div>
                        <div className="mb-1"><strong>Department:</strong> {selectedIntern.internship.department}</div>
                        <div className="mb-1"><strong>Title:</strong> {selectedIntern.internship.title}</div>
                        <div className="mb-1"><strong>Description:</strong> {selectedIntern.internship.description}</div>
                        <div className="mb-1"><strong>Requirements:</strong> <ul className="list-disc ml-5 text-xs">{selectedIntern.internship.requirements.map((req: string, idx: number) => <li key={idx}>{req}</li>)}</ul></div>
                        <div className="mb-1"><strong>Location:</strong> {selectedIntern.internship.location}</div>
                        <div className="mb-1"><strong>Type:</strong> {selectedIntern.internship.type}</div>
                        <div className="mb-1"><strong>Stipend:</strong> {selectedIntern.internship.stipend > 0 ? `${selectedIntern.internship.stipend} EGP` : 'Unpaid'}</div>
                        <div className="mb-1"><strong>Website:</strong> {(() => {
                          const company = dummyUsers.find(u => u.id === selectedIntern.internship?.companyId && u.role === UserRole.COMPANY);
                          if (company && 'website' in company && typeof company.website === 'string') {
                            return <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{company.website}</a>;
                          }
                          return 'N/A';
                        })()}</div>
                        <div className="mb-1"><strong>Main Supervisor:</strong> {(() => {
                          let supervisorId: string | undefined = undefined;
                          if (selectedIntern.internship && 'supervisorId' in selectedIntern.internship) {
                            supervisorId = (selectedIntern.internship as any).supervisorId;
                          }
                          const supervisor = supervisorId ? dummyUsers.find(u => u.id === supervisorId) : undefined;
                          return supervisor?.name || 'Unknown Supervisor';
                        })()}</div>
                        <div className="mb-1"><strong>Supervisor Email:</strong> {(() => {
                          let supervisorId: string | undefined = undefined;
                          if (selectedIntern.internship && 'supervisorId' in selectedIntern.internship) {
                            supervisorId = (selectedIntern.internship as any).supervisorId;
                          }
                          const supervisor = supervisorId ? dummyUsers.find(u => u.id === supervisorId) : undefined;
                          return supervisor?.email || 'N/A';
                        })()}</div>
                        <div className="mb-1"><strong>Start Date:</strong> {selectedIntern.internship.startDate ? new Date(selectedIntern.internship.startDate).toLocaleDateString() : '-'}</div>
                        <div className="mb-1"><strong>End Date:</strong> {selectedIntern.internship.endDate ? new Date(selectedIntern.internship.endDate).toLocaleDateString() : '-'}</div>
                      </>
                    )}
                  </div>
                </div>
                {/* Evaluations Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {/* Company Evaluation */}
                  <div className="bg-gray-50 rounded p-4">
                    <h4 className="font-semibold mb-2">Company Evaluation</h4>
                    {/* TODO: Fetch and show real company evaluation for this intern */}
                    <div className="mb-2">(Not implemented: show company evaluation here)</div>
                  </div>
                  {/* Student Evaluation */}
                  <div className="bg-gray-50 rounded p-4">
                    <h4 className="font-semibold mb-2">Student Evaluation</h4>
                    {/* TODO: Fetch and show real student evaluation for this intern */}
                    <div className="mb-2">(Not implemented: show student evaluation here)</div>
                  </div>
                  {/* SCAD/Academic Evaluation */}
                  <div className="bg-gray-50 rounded p-4">
                    <h4 className="font-semibold mb-2">SCAD/Academic Evaluation</h4>
                    <div className="mb-2"><strong>Content:</strong> {(() => {
                      const evalForIntern = evaluations.find(ev => ev.applicationId === selectedIntern.id);
                      return evalForIntern?.content || 'No evaluation yet.';
                    })()}</div>
                    <div><strong>Rating:</strong> <span className="text-yellow-600 font-bold">{(() => {
                      const evalForIntern = evaluations.find(ev => ev.applicationId === selectedIntern.id);
                      return evalForIntern?.rating || '-';
                    })()}/5</span></div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="primary" onClick={() => { setIsEditing(true); setModalOpen(false); setSelectedAppId(selectedIntern.id); }}>Edit</Button>
                      <Button variant="danger" onClick={() => { setModalOpen(false); handleDelete(selectedIntern.id); }}>Delete</Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button variant="outline" onClick={() => { setModalOpen(false); setSelectedIntern(null); }}>Close</Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    console.error(e);
    return <div>Error: {errorMsg}</div>;
  }
};

export default SCADEvaluations; 