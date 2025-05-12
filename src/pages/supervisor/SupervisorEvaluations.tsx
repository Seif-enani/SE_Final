import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { dummyReports } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const SupervisorEvaluations = () => {
  const { currentUser } = useAuth();
  const reports = dummyReports.filter(r => r.supervisorId === currentUser?.id);
  const [completed, setCompleted] = useState<string[]>([]);

  const handleEvaluate = (id: string) => {
    setCompleted(prev => [...prev, id]); // placeholder
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Evaluate Reports</h1>
        <p className="text-gray-600">Submit evaluations for your students' reports</p>
      </div>
      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map(report => {
            const student = dummyUsers.find(u => u.id === report.studentId);
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{report.title}</h3>
                    <p className="text-sm text-gray-600">Student: {student?.name}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {new Date(report.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
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
              </Card>
            );
          })}
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

export default SupervisorEvaluations;