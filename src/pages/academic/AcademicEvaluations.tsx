import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import { dummyReports } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { CheckCircle, FileText } from 'lucide-react';

const AcademicEvaluations = () => {
  const { currentUser } = useAuth();
  // Reports where academicEvaluation exists and currentUser assigned
  const evaluatedReports = dummyReports.filter(report => 
    report.academicEvaluation?.evaluatorId === currentUser?.id
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Evaluations</h1>
        <p className="text-gray-600">Reports you have evaluated</p>
      </div>
      {evaluatedReports.length > 0 ? (
        <div className="space-y-4">
          {evaluatedReports.map(report => {
            const student = dummyUsers.find(u => u.id === report.studentId && u.role === UserRole.STUDENT);
            const evalData = report.academicEvaluation!;
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{report.title}</h3>
                      <p className="text-sm text-gray-600">Student: {student?.name}</p>
                      <p className="text-sm text-gray-600">Rating: {evalData.rating}/5</p>
                      <p className="text-xs text-gray-500">{evalData.comments}</p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle size={24} className="mr-2" />
                      <span className="text-sm">Evaluated</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-10">
            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">You haven't evaluated any reports yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AcademicEvaluations;