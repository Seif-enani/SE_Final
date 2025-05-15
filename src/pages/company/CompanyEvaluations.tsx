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

// --- SCAD Office Professional Evaluations ---
// Dummy professional evaluations for completed interns
const initialScadEvaluations = [
  {
    id: 'scad1',
    studentId: 's1',
    internshipId: 'i1',
    content: 'Ahmed demonstrated strong technical skills and adaptability throughout his internship. He consistently met deadlines and contributed valuable ideas to the team.',
    rating: 5,
    evaluator: 'SCAD Office',
    date: '2025-05-10',
  },
  {
    id: 'scad2',
    studentId: 's2',
    internshipId: 'i2',
    content: 'Sara showed excellent analytical thinking and professionalism. She was proactive in seeking feedback and improving her work.',
    rating: 4,
    evaluator: 'SCAD Office',
    date: '2025-05-10',
  },
];

const CompanyEvaluations = () => {
  const { currentUser } = useAuth();
  const companyId = currentUser?.id || 'c1';

  // --- SCAD Office Evaluation State ---
  const [scadEvaluations, setScadEvaluations] = useState(initialScadEvaluations);
  const [scadForm, setScadForm] = useState({ studentId: '', internshipId: '', content: '', rating: 5 });
  const [scadEditingId, setScadEditingId] = useState<string | null>(null);
  const [scadShowForm, setScadShowForm] = useState(false);

  // Find all completed internships (status: 'complete')
  const completedApps = dummyApplications.filter(app => (app.status as string) === 'complete');
  const completedInterns = completedApps.map(app => ({
    ...app,
    ...dummyApplicants[app.studentId],
    internship: dummyInternships.find(i => i.id === app.internshipId),
  }));

  // Only show students who have completed internships and are not yet evaluated by SCAD
  const evaluatedStudentIds = new Set(scadEvaluations.map(ev => ev.studentId + '-' + ev.internshipId));
  const unevaluatedInterns = completedInterns.filter(app => !evaluatedStudentIds.has(app.studentId + '-' + app.internshipId));

  // CRUD Handlers
  const handleScadAddNew = () => {
    setScadForm({ studentId: unevaluatedInterns[0]?.studentId || '', internshipId: unevaluatedInterns[0]?.internshipId || '', content: '', rating: 5 });
    setScadShowForm(true);
    setScadEditingId(null);
  };
  const handleScadEdit = (ev: any) => {
    setScadForm({ studentId: ev.studentId, internshipId: ev.internshipId, content: ev.content, rating: ev.rating });
    setScadEditingId(ev.id);
    setScadShowForm(true);
  };
  const handleScadDelete = (id: string) => {
    setScadEvaluations(evs => evs.filter(ev => ev.id !== id));
    setScadEditingId(null);
    setScadShowForm(false);
  };
  const handleScadSave = () => {
    if (!scadForm.studentId || !scadForm.internshipId) return;
    setScadEvaluations(evs => {
      if (scadEditingId) {
        // Update
        return evs.map(ev => ev.id === scadEditingId ? { ...ev, ...scadForm } : ev);
      } else {
        // Add new
        return [
          ...evs,
          {
            id: 'scad' + (evs.length + 1),
            ...scadForm,
            evaluator: 'SCAD Office',
            date: new Date().toISOString().slice(0, 10),
          },
        ];
      }
    });
    setScadShowForm(false);
    setScadEditingId(null);
  };

  // --- SCAD Office UI ---
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SCAD Office: Student Internship Evaluations</h1>
          <p className="text-gray-600">Create, read, update, or delete professional evaluations for students who have completed their internships. These evaluations are confidential and only visible to the SCAD office.</p>
        </div>
        <Button variant="primary" onClick={handleScadAddNew} disabled={unevaluatedInterns.length === 0}>
          Add New Evaluation
        </Button>
      </div>
      <div className="space-y-6">
        {/* Add/Edit Evaluation Form */}
        {scadShowForm && (
          <Card>
            <CardHeader title={scadEditingId ? 'Edit Evaluation' : 'Add New Evaluation'} />
            <CardContent>
              <form onSubmit={e => { e.preventDefault(); handleScadSave(); }} className="space-y-4">
                {!scadEditingId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={scadForm.studentId + '-' + scadForm.internshipId}
                      onChange={e => {
                        const [studentId, internshipId] = e.target.value.split('-');
                        setScadForm(f => ({ ...f, studentId, internshipId }));
                      }}
                      required
                    >
                      {unevaluatedInterns.map(intern => (
                        <option key={intern.studentId + '-' + intern.internshipId} value={intern.studentId + '-' + intern.internshipId}>
                          {intern.name} ({intern.internship?.title})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <Textarea
                  label="Evaluation Content"
                  value={scadForm.content}
                  onChange={e => setScadForm(f => ({ ...f, content: e.target.value }))}
                  rows={4}
                  required
                />
                <Input
                  label="Rating (1-5)"
                  type="number"
                  min={1}
                  max={5}
                  value={scadForm.rating}
                  onChange={e => setScadForm(f => ({ ...f, rating: Number(e.target.value) }))}
                  required
                />
                <div className="flex gap-2">
                  <Button variant="primary" type="submit">Save</Button>
                  <Button variant="outline" type="button" onClick={() => { setScadShowForm(false); setScadEditingId(null); }}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader title="Completed Interns Evaluations" />
          <CardContent>
            {scadEvaluations.length > 0 ? (
              <div className="space-y-4">
                {scadEvaluations.map(ev => {
                  const intern = dummyApplicants[ev.studentId];
                  const internship = dummyInternships.find(i => i.id === ev.internshipId);
                  return (
                    <div key={ev.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img src={intern?.photo} alt={intern?.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <div className="font-medium text-gray-900">{intern?.name}</div>
                          <div className="text-xs text-gray-500">{internship?.title}</div>
                          <div className="text-xs text-gray-400">Evaluated: {ev.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleScadEdit(ev)}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => handleScadDelete(ev.id)}>Delete</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No evaluations found.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyEvaluations;