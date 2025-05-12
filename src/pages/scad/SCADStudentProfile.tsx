import React from 'react';
import { useParams } from 'react-router-dom';
import Card, { CardContent } from '../../components/common/Card';
import { dummyUsers } from '../../data/users';
import { dummyInternships, dummyApplications, dummyReports } from '../../data/internships';
import { UserRole, Student } from '../../types/user';

const SCADStudentProfile = () => {
  const { id } = useParams();
  const student = dummyUsers.find(u => u.role === UserRole.STUDENT && u.id === id) as Student | undefined;

  if (!student) {
    return <div className="p-8 text-center text-red-600 font-bold">Student not found.</div>;
  }

  const applications = dummyApplications.filter(a => a.studentId === student.id);
  const reports = dummyReports.filter(r => r.studentId === student.id);
  const internships = student.appliedInternships?.map(iid => dummyInternships.find(i => i.id === iid)).filter(Boolean) || [];

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            <img src={student.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={student.name} className="h-20 w-20 rounded-full object-cover" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-sm text-gray-500">ID: {student.studentId}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><strong>Faculty:</strong> {student.faculty}</div>
            <div><strong>Major:</strong> {student.major}</div>
            <div><strong>GPA:</strong> {student.gpa}</div>
            <div><strong>Graduation Year:</strong> {student.graduationYear}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="font-semibold text-lg mb-2">Internships Applied</h2>
          {internships.length === 0 ? <div className="text-gray-400">No internships applied.</div> : (
            <ul className="list-disc ml-6">
              {internships.map(i => i && <li key={i.id}>{i.title} at {i.location} ({i.status})</li>)}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="font-semibold text-lg mb-2">Applications</h2>
          {applications.length === 0 ? <div className="text-gray-400">No applications found.</div> : (
            <ul className="list-disc ml-6">
              {applications.map(a => {
                const internship = dummyInternships.find(i => i.id === a.internshipId);
                return <li key={a.id}>{internship?.title || 'Unknown Internship'} - Status: {a.status}</li>;
              })}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="font-semibold text-lg mb-2">Reports</h2>
          {reports.length === 0 ? <div className="text-gray-400">No reports found.</div> : (
            <ul className="list-disc ml-6">
              {reports.map(r => <li key={r.id}>{r.title} - Status: {r.status}</li>)}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SCADStudentProfile; 