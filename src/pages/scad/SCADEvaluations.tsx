import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/FormElements';
import { dummyApplications, dummyInternships } from '../../data/internships';

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

const SCADEvaluations = () => {
  try {
    // Find all completed interns
    const completedApps = dummyApplications.filter(app => app.status === 'accepted');
    const completedInterns = completedApps.map(app => ({
      ...app,
      ...(dummyApplicants[app.studentId] || {}),
      internship: dummyInternships.find(i => i.id === app.internshipId) || {},
    }));

    const [evaluations, setEvaluations] = useState(initialEvaluations);
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
    const [form, setForm] = useState({ content: '', rating: 5 });
    const [isEditing, setIsEditing] = useState(false);

    // Find evaluation for selected application
    const selectedEval = selectedAppId
      ? evaluations.find(ev => ev.applicationId === selectedAppId)
      : null;
    const selectedIntern = selectedAppId
      ? completedInterns.find(app => app.id === selectedAppId)
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
                  {completedInterns.map(intern => {
                    const evalForIntern = evaluations.find(ev => ev.applicationId === intern.id);
                    return (
                      <div key={intern.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                          <img src={intern.photo} alt={intern.name} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <div className="font-medium text-gray-900">{intern.name}</div>
                            <div className="text-xs text-gray-500">{String(intern.internship && 'title' in intern.internship ? intern.internship.title : 'Unknown Internship')}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {evalForIntern ? (
                            <>
                              <Button size="sm" variant="outline" onClick={() => { setSelectedAppId(intern.id); setIsEditing(false); }}>View</Button>
                              <Button size="sm" variant="primary" onClick={() => handleEdit(intern.id)}>Edit</Button>
                              <Button size="sm" variant="danger" onClick={() => handleDelete(intern.id)}>Delete</Button>
                            </>
                          ) : (
                            <Button size="sm" variant="primary" onClick={() => handleEdit(intern.id)}>Create Evaluation</Button>
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
          {/* Evaluation Modal/Panel */}
          {selectedAppId && selectedIntern && (
            <Card>
              <CardHeader title={`Evaluation for ${selectedIntern.name}`} />
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      label="Evaluation Content"
                      value={form.content}
                      onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                      rows={4}
                    />
                    <Input
                      label="Rating (1-5)"
                      type="number"
                      min={1}
                      max={5}
                      value={form.rating}
                      onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
                    />
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={handleSave}>Save</Button>
                      <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedAppId(null); }}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div><strong>Content:</strong> {selectedEval?.content || 'No evaluation yet.'}</div>
                    <div><strong>Rating:</strong> {selectedEval?.rating || '-'}</div>
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(selectedAppId)}>Delete</Button>
                      <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedAppId(null); }}>Close</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
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