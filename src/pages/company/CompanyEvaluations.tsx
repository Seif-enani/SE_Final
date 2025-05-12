import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/FormElements';
import { dummyApplications, dummyInternships } from '../../data/internships';
import { useAuth } from '../../context/AuthContext';

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
  s3: {
    name: 'Omar Hassan',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    major: 'Information Systems',
    email: 'omar.hassan@email.com',
    jobTitle: 'QA Tester Intern',
  },
  s4: {
    name: 'Mona Youssef',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    major: 'Marketing',
    email: 'mona.youssef@email.com',
    jobTitle: 'Frontend Developer Intern',
  },
  s5: {
    name: 'Khaled Samir',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    major: 'Computer Engineering',
    email: 'khaled.samir@email.com',
    jobTitle: 'Mobile App Development Intern',
  },
  s6: {
    name: 'Laila Nabil',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    major: 'Business Administration',
    email: 'laila.nabil@email.com',
    jobTitle: 'Business Analyst Intern',
  },
};

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
    applicationId: 'a8',
    studentId: 's1',
    content: 'Ahmed completed his internship with great dedication and professionalism.',
    rating: 4,
  },
  {
    id: 'e3',
    applicationId: 'a4',
    studentId: 's3',
    content: 'Omar was a reliable QA intern and contributed to several successful releases.',
    rating: 4,
  },
];

const CompanyEvaluations = () => {
  const { currentUser } = useAuth();
  const companyId = currentUser?.id || 'c1';

  // Find all completed interns for this company
  const completedApps = dummyApplications.filter(app => {
    if ((app.status as string) !== 'complete') return false;
    const internship = dummyInternships.find(i => i.id === app.internshipId);
    return internship && internship.companyId === companyId;
  });
  const completedInterns = completedApps.map(app => ({
    ...app,
    ...dummyApplicants[app.studentId],
    internship: dummyInternships.find(i => i.id === app.internshipId),
  }));

  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [form, setForm] = useState({ studentAppId: '', content: '', rating: 5 });
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Find evaluation for selected application
  const selectedEval = selectedAppId
    ? evaluations.find(ev => ev.applicationId === selectedAppId)
    : null;
  const selectedIntern = selectedAppId
    ? completedInterns.find(app => app.id === selectedAppId)
    : null;

  // Get completed interns who do NOT have an evaluation yet
  const evaluatedAppIds = new Set(evaluations.map(ev => ev.applicationId));
  const unevaluatedInterns = completedInterns.filter(app => !evaluatedAppIds.has(app.id));

  const handleAddNew = () => {
    setForm({ studentAppId: unevaluatedInterns[0]?.id || '', content: '', rating: 5 });
    setShowAddForm(true);
    setIsEditing(false);
    setSelectedAppId(null);
  };

  const handleEdit = (appId: string) => {
    const evalToEdit = evaluations.find(ev => ev.applicationId === appId);
    setSelectedAppId(appId);
    setIsEditing(true);
    setShowAddForm(true);
    if (evalToEdit) {
      setForm({ studentAppId: appId, content: evalToEdit.content, rating: evalToEdit.rating });
    } else {
      setForm({ studentAppId: appId, content: '', rating: 5 });
    }
  };

  const handleDelete = (appId: string) => {
    setEvaluations(evals => evals.filter(ev => ev.applicationId !== appId));
    setSelectedAppId(null);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleSave = () => {
    if (!form.studentAppId) return;
    setEvaluations(evals => {
      const exists = evals.find(ev => ev.applicationId === form.studentAppId);
      if (exists) {
        // Update
        return evals.map(ev =>
          ev.applicationId === form.studentAppId ? { ...ev, content: form.content, rating: form.rating } : ev
        );
      } else {
        // Add new
        const intern = completedInterns.find(app => app.id === form.studentAppId);
        return [
          ...evals,
          {
            id: 'e' + (evals.length + 1),
            applicationId: form.studentAppId,
            studentId: intern?.studentId || '',
            content: form.content,
            rating: form.rating,
          },
        ];
      }
    });
    setIsEditing(false);
    setShowAddForm(false);
    setSelectedAppId(null);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Intern Evaluations</h1>
          <p className="text-gray-600">Create, read, update, or delete evaluations for students who have completed their internships at your company.</p>
        </div>
        <Button variant="primary" onClick={handleAddNew} disabled={unevaluatedInterns.length === 0}>
          Add New Evaluation
        </Button>
      </div>
      <div className="space-y-6">
        {/* Add/Edit Evaluation Form */}
        {showAddForm && (
          <Card>
            <CardHeader title={isEditing ? 'Edit Evaluation' : 'Add New Evaluation'} />
            <CardContent>
              <form onSubmit={e => { e.preventDefault(); handleSave(); }} className="space-y-4">
                {!isEditing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={form.studentAppId}
                      onChange={e => setForm(f => ({ ...f, studentAppId: e.target.value }))}
                      required
                    >
                      {unevaluatedInterns.map(intern => (
                        <option key={intern.id} value={intern.id}>
                          {intern.name} ({intern.internship?.title})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <Textarea
                  label="Evaluation Content"
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={4}
                  required
                />
                <Input
                  label="Rating (1-5)"
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
                  required
                />
                <div className="flex gap-2">
                  <Button variant="primary" type="submit">Save</Button>
                  <Button variant="outline" type="button" onClick={() => { setShowAddForm(false); setIsEditing(false); setSelectedAppId(null); }}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader title="Completed Interns" />
          <CardContent>
            {completedInterns.length > 0 ? (
              <div className="space-y-4">
                {completedInterns.map(intern => {
                  const evalForIntern = evaluations.find(ev => ev.applicationId === intern.id);
                  return (
                    <div key={intern.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img src={intern.photo} alt={intern.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <div className="font-medium text-gray-900">{intern.name}</div>
                          <div className="text-xs text-gray-500">{intern.internship?.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {evalForIntern ? (
                          <>
                            <Button size="sm" variant="outline" onClick={() => { setSelectedAppId(intern.id); setIsEditing(false); setShowAddForm(false); }}>View</Button>
                            <Button size="sm" variant="primary" onClick={() => handleEdit(intern.id)}>Edit</Button>
                            <Button size="sm" variant="danger" onClick={() => handleDelete(intern.id)}>Delete</Button>
                          </>
                        ) : (
                          <Button size="sm" variant="primary" onClick={() => { setForm({ studentAppId: intern.id, content: '', rating: 5 }); setShowAddForm(true); setIsEditing(false); setSelectedAppId(null); }}>Create Evaluation</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No completed interns found.</div>
            )}
          </CardContent>
        </Card>
        {/* Evaluation Modal/Panel (View Only) */}
        {selectedAppId && selectedIntern && !isEditing && !showAddForm && (
          <Card>
            <CardHeader title={`Evaluation for ${selectedIntern.name}`} />
            <CardContent>
              <div className="space-y-4">
                <div><strong>Content:</strong> {selectedEval?.content || 'No evaluation yet.'}</div>
                <div><strong>Rating:</strong> {selectedEval?.rating || '-'}</div>
                <div className="flex gap-2">
                  <Button variant="primary" onClick={() => handleEdit(selectedAppId)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(selectedAppId)}>Delete</Button>
                  <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedAppId(null); setShowAddForm(false); }}>Close</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyEvaluations; 