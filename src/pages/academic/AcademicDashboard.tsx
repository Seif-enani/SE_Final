import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import { FileText } from 'lucide-react';

const AcademicDashboard = () => {
  const { currentUser } = useAuth();
  const count = currentUser?.assignedReports?.length || 0;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Academic Staff Dashboard</h1>
        <p className="text-gray-600">Welcome, {currentUser?.name}</p>
      </div>
      <Card className="flex items-center p-6">
        <FileText size={24} className="text-blue-600 mr-4" />
        <div>
          <p className="text-sm text-gray-500">Assigned Reports</p>
          <h3 className="text-2xl font-bold">{count}</h3>
        </div>
      </Card>
    </div>
  );
};

export default AcademicDashboard;