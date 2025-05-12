import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import { Users } from 'lucide-react';

const SupervisorDashboard = () => {
  const { currentUser } = useAuth();
  const count = currentUser?.assignedStudents?.length || 0;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Supervisor Dashboard</h1>
        <p className="text-gray-600">Welcome, {currentUser?.name}</p>
      </div>
      <Card className="flex items-center p-6">
        <Users size={24} className="text-blue-600 mr-4" />
        <div>
          <p className="text-sm text-gray-500">Assigned Students</p>
          <h3 className="text-2xl font-bold">{count}</h3>
        </div>
      </Card>
    </div>
  );
};

export default SupervisorDashboard;