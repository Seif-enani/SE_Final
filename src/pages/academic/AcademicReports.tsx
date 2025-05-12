import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { dummyReports } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { Clock, CheckCircle, FileText } from 'lucide-react';

const AcademicReports = () => {
  const { currentUser } = useAuth();
  const assignedIds = currentUser?.assignedReports || [];
  const reports = dummyReports.filter(r => assignedIds.includes(r.id));
  const [reviewed, setReviewed] = useState<string[]>([]);

  const handleReview = (id: string) => {
    setReviewed(prev => [...prev, id]); // placeholder
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Assigned Reports</h1>
        <p className="text-gray-600">Reports awaiting your evaluation</p>
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
                    {reviewed.includes(report.id) ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="mr-1" /> Reviewed
                      </span>
                    ) : (
                      <Button size="sm" variant="primary" onClick={() => handleReview(report.id)}>
                        Review
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
            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reports assigned to you.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AcademicReports;