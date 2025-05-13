import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Users, FileText, CheckSquare, BarChart4, AlertCircle } from 'lucide-react';
import { dummyReports } from '../../data/internships';

const FacultyMemberDashboard = () => {
  const { currentUser } = useAuth();
  // Dummy stats
  const toReview = dummyReports.filter(r => r.status === 'submitted' || r.status === 'revised').length;
  const completed = dummyReports.filter(r => r.status === 'evaluated' || r.status === 'approved').length;

  const goTo = (url: string) => window.location.assign(url);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}</h1>
          <p className="text-gray-600">Faculty Member Dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<FileText size={18} />} onClick={() => goTo('/faculty/reports')}>Review Reports</Button>
          <Button variant="outline" leftIcon={<CheckSquare size={18} />} onClick={() => goTo('/faculty/evaluations')}>Evaluations</Button>
          <Button variant="outline" leftIcon={<BarChart4 size={18} />} onClick={() => goTo('/faculty/statistics')}>Statistics</Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <FileText size={32} className="text-blue-500" />
            <div>
              <div className="text-lg font-semibold">Reports to Review</div>
              <div className="text-2xl font-bold text-blue-700">{toReview}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <CheckSquare size={32} className="text-green-500" />
            <div>
              <div className="text-lg font-semibold">Completed Evaluations</div>
              <div className="text-2xl font-bold text-green-700">{completed}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <FileText size={28} className="text-blue-500 mb-2" />
            <div className="text-lg font-semibold mb-1">Review Internship Reports</div>
            <Button variant="primary" onClick={() => goTo('/faculty/reports')} fullWidth>Go to Reports</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <CheckSquare size={28} className="text-green-500 mb-2" />
            <div className="text-lg font-semibold mb-1">Evaluate Reports</div>
            <Button variant="primary" onClick={() => goTo('/faculty/evaluations')} fullWidth>Go to Evaluations</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <BarChart4 size={28} className="text-purple-500 mb-2" />
            <div className="text-lg font-semibold mb-1">View Statistics</div>
            <Button variant="primary" onClick={() => goTo('/faculty/statistics')} fullWidth>Go to Statistics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyMemberDashboard;