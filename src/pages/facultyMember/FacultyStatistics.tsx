import React from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { dummyReports, dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { BarChart4, PieChart, Download, Award, TrendingUp } from 'lucide-react';

const FacultyStatistics = () => {
  // Dummy statistics calculations
  const approved = dummyReports.filter(r => r.status === 'approved').length;
  const rejected = dummyReports.filter(r => r.status === 'rejected').length;
  const evaluated = dummyReports.filter(r => r.status === 'evaluated').length;
  const total = dummyReports.length;
  const avgReviewTime = '2.3 days'; // Dummy value

  // Most used courses (dummy)
  const topCourses = [
    { name: 'Data Structures', count: 12 },
    { name: 'Business Analytics', count: 9 },
    { name: 'Web Development', count: 7 },
  ];

  // Top rated companies (dummy)
  const topCompanies = [
    { name: 'TechCorp Solutions', rating: 4.8 },
    { name: 'FinBank International', rating: 4.5 },
    { name: 'MediLife', rating: 4.2 },
  ];

  // Top companies by internship count (dummy)
  const topByCount = [
    { name: 'TechCorp Solutions', count: 15 },
    { name: 'FinBank International', count: 10 },
    { name: 'StartupX', count: 8 },
  ];

  const handleDownload = (type: string) => {
    alert('Downloading ' + type + ' report (dummy)');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Statistics Dashboard</h1>
          <p className="text-gray-600">Real-time insights and analytics for internship reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download size={16} />} onClick={() => handleDownload('PDF')}>Download PDF</Button>
          <Button variant="outline" leftIcon={<Download size={16} />} onClick={() => handleDownload('CSV')}>Download CSV</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="Reports by Status" />
          <CardContent>
            <div className="flex items-center mb-2"><BarChart4 size={24} className="text-blue-500 mr-2" /><span className="font-semibold">Reports by Status</span></div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between"><span>Approved</span><span className="font-bold text-green-600">{approved}</span></div>
              <div className="flex justify-between"><span>Rejected</span><span className="font-bold text-red-600">{rejected}</span></div>
              <div className="flex justify-between"><span>Evaluated</span><span className="font-bold text-yellow-600">{evaluated}</span></div>
              <div className="flex justify-between"><span>Total</span><span className="font-bold">{total}</span></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Average Review Time" />
          <CardContent>
            <div className="flex items-center mb-2"><TrendingUp size={24} className="text-purple-500 mr-2" /><span className="font-semibold">Average Review Time</span></div>
            <div className="text-3xl font-bold text-purple-700">{avgReviewTime}</div>
            <div className="text-gray-500 text-sm mt-2">(from submission to decision)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Most Used Courses" />
          <CardContent>
            <div className="flex items-center mb-2"><PieChart size={24} className="text-orange-500 mr-2" /><span className="font-semibold">Most Used Courses</span></div>
            <ul className="space-y-1">
              {topCourses.map(c => (
                <li key={c.name} className="flex justify-between"><span>{c.name}</span><span className="font-semibold">{c.count}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Top Rated Companies" />
          <CardContent>
            <div className="flex items-center mb-2"><Award size={24} className="text-yellow-500 mr-2" /><span className="font-semibold">Top Rated Companies</span></div>
            <ul className="space-y-1">
              {topCompanies.map(c => (
                <li key={c.name} className="flex justify-between"><span>{c.name}</span><span className="font-semibold">{c.rating}/5</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Top Companies by Internship Count" />
          <CardContent>
            <div className="flex items-center mb-2"><BarChart4 size={24} className="text-blue-500 mr-2" /><span className="font-semibold">Top Companies by Internship Count</span></div>
            <ul className="space-y-1">
              {topByCount.map(c => (
                <li key={c.name} className="flex justify-between"><span>{c.name}</span><span className="font-semibold">{c.count}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyStatistics; 