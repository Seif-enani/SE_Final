import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

// Dummy evaluation/report data for faculty member
const dummyEvaluations = [
  {
    id: 'r1',
    title: 'AI in Healthcare',
    student: 'Ahmed Mohamed',
    company: 'TechCorp Solutions',
    status: 'pending',
    submissionDate: '2024-06-01T10:00:00Z',
    details: 'A report on the use of AI in modern healthcare systems.'
  },
  {
    id: 'r2',
    title: 'Business Analytics Project',
    student: 'Sara Ali',
    company: 'FinBank International',
    status: 'completed',
    submissionDate: '2024-05-20T09:30:00Z',
    details: 'Analysis of financial data using business analytics tools.'
  },
  {
    id: 'r3',
    title: 'Mobile App for E-Learning',
    student: 'Omar Khaled',
    company: 'StartupX',
    status: 'pending',
    submissionDate: '2024-06-10T14:15:00Z',
    details: 'Development of a cross-platform mobile app for e-learning.'
  },
  {
    id: 'r4',
    title: 'Digital Health Solutions',
    student: 'Mona Fathy',
    company: 'MediLife',
    status: 'completed',
    submissionDate: '2024-05-28T11:45:00Z',
    details: 'Implementation of digital health solutions in clinics.'
  },
  {
    id: 'r5',
    title: 'Banking Security Audit',
    student: 'Fatima Ibrahim',
    company: 'FinBank International',
    status: 'pending',
    submissionDate: '2024-06-12T13:00:00Z',
    details: 'Security audit of online banking systems.'
  },
];

const FacultyMemberEvaluations = () => {
  const [completed, setCompleted] = useState<string[]>(['r2', 'r4']);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleEvaluate = (id: string) => {
    setCompleted(prev => [...prev, id]); // placeholder
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Evaluate Reports</h1>
        <p className="text-gray-600">Submit evaluations for your students' reports</p>
      </div>
      {dummyEvaluations.length > 0 ? (
        <div className="space-y-4">
          {dummyEvaluations.map(report => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">{report.title}</h3>
                  <p className="text-sm text-gray-600">Student: {report.student}</p>
                  <p className="text-sm text-gray-600">Company: {report.company}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {new Date(report.submissionDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Button size="sm" variant="outline" onClick={() => setShowDetails(report.id)}>View Details</Button>
                  {completed.includes(report.id) ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="mr-1" /> Completed
                    </span>
                  ) : (
                    <Button size="sm" variant="primary" onClick={() => handleEvaluate(report.id)}>
                      Evaluate
                    </Button>
                  )}
                </div>
              </CardContent>
              {/* Details Modal */}
              {showDetails === report.id && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-lg w-full relative">
                    <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold" onClick={() => setShowDetails(null)} aria-label="Close">×</button>
                    <h2 className="text-xl font-bold mb-2">{report.title}</h2>
                    <div className="mb-2 text-gray-600">Student: {report.student}</div>
                    <div className="mb-2 text-gray-600">Company: {report.company}</div>
                    <div className="mb-2 text-gray-600">Status: <span className="capitalize font-semibold">{report.status}</span></div>
                    <div className="mb-4 text-gray-700 whitespace-pre-line">{report.details}</div>
                    <Button size="sm" variant="outline" onClick={() => setShowDetails(null)}>Close</Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-10">
            <XCircle size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reports available for evaluation.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FacultyMemberEvaluations;