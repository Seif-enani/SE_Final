import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import { dummyApplications, dummyInternships } from '../../data/internships';

const StudentApplications = () => {
  // Assuming the current student has ID 's1'
  const studentId = 's1';
  
  // Get applications for the student
  const applications = [
    ...dummyApplications.filter(app => app.studentId === studentId),
    {
      id: 'a10',
      internshipId: 'i1',
      studentId: 's1',
      status: 'pending',
      coverLetter: 'I am excited to join your engineering team.',
      resumeUrl: '/dummy-resume-1.pdf',
      appliedAt: '2024-06-01T10:00:00Z',
      updatedAt: '2024-06-01T10:00:00Z',
    },
    {
      id: 'a11',
      internshipId: 'i2',
      studentId: 's1',
      status: 'accepted',
      coverLetter: 'Business analytics is my passion.',
      resumeUrl: '/dummy-resume-2.pdf',
      appliedAt: '2024-05-15T09:00:00Z',
      updatedAt: '2024-05-20T10:00:00Z',
    },
    {
      id: 'a12',
      internshipId: 'i3',
      studentId: 's1',
      status: 'rejected',
      coverLetter: 'I have experience in mobile development.',
      resumeUrl: '/dummy-resume-3.pdf',
      appliedAt: '2024-04-10T08:00:00Z',
      updatedAt: '2024-04-15T10:00:00Z',
    },
    {
      id: 'a13',
      internshipId: 'i4',
      studentId: 's1',
      status: 'finalized',
      coverLetter: 'Frontend development is my strength.',
      resumeUrl: '/dummy-resume-4.pdf',
      appliedAt: '2024-03-20T11:00:00Z',
      updatedAt: '2024-03-25T10:00:00Z',
    },
  ];
  
  // Professional filter: 'Current' (accepted & active), 'Finalized' (accepted & ended), 'By Date'
  const [filter, setFilter] = useState<'all' | 'current' | 'finalized' | 'date'>('all');
  const [date, setDate] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  // Helper to check if internship is current/finalized
  const isCurrent = (internship: any, app: any) => {
    if (app.status !== 'accepted') return false;
    const now = new Date();
    return new Date(internship.startDate) <= now && now <= new Date(internship.endDate);
  };
  const isFinalized = (internship: any, app: any) => {
    if (app.status !== 'accepted') return false;
    const now = new Date();
    return now > new Date(internship.endDate);
  };

  const filteredApplications = applications.filter(app => {
    const internship = dummyInternships.find(i => i.id === app.internshipId);
    if (!internship) return false;
    if (filter === 'current') return isCurrent(internship, app);
    if (filter === 'finalized') return isFinalized(internship, app);
    if (filter === 'date' && date) {
      const start = new Date(internship.startDate);
      const end = new Date(internship.endDate);
      const d = new Date(date);
      return d >= start && d <= end;
    }
    return true;
  });
  
  useEffect(() => {
    // Simulate notification logic for acceptance
    // In a real app, this would push to a notification context or API
    // For now, notifications are static dummy data in StudentNotifications.tsx
  }, []);
  
  // Status badge styling
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      withdrawn: 'bg-gray-100 text-gray-800',
    };
    
    const statusIcons = {
      pending: <Clock size={16} className="mr-1" />,
      accepted: <CheckCircle size={16} className="mr-1" />,
      rejected: <XCircle size={16} className="mr-1" />,
      withdrawn: <AlertCircle size={16} className="mr-1" />,
    };
    
    return {
      className: `px-2 py-1 rounded-full flex items-center text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`,
      icon: statusIcons[status as keyof typeof statusIcons]
    };
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600">Track the status of your internship applications</p>
      </div>
      <div className="mb-4 flex gap-4 flex-wrap items-center">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="current">Current Internships</option>
          <option value="finalized">Finalized Internships</option>
          <option value="date">By Date</option>
        </select>
        {filter === 'date' && (
          <label className="text-sm text-gray-700">Date:
            <input
              type="date"
              className="ml-1 border rounded px-2 py-1 text-sm"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        )}
      </div>
      <div className="space-y-6">
        {filteredApplications.length > 0 ? (
          filteredApplications.map(application => {
            const internship = dummyInternships.find(i => i.id === application.internshipId);
            if (!internship) return null;
            
            const companyName = internship.companyId === 'c1' ? 'TechCorp Solutions' : 'FinBank International';
            const statusBadge = getStatusBadge(application.status);
            
            return (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/student/internship/${internship.id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        {internship.title}
                      </Link>
                      <p className="text-gray-600">{companyName}</p>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
                        {application.status === 'accepted' && (
                          <p className="mt-1 text-green-600">
                            Start date: {new Date(internship.startDate).toLocaleDateString()}<br />
                            End date: {new Date(internship.endDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={statusBadge.className}>
                        {statusBadge.icon}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                      <button
                        className="mt-2 text-xs text-blue-600 hover:underline"
                        onClick={() => setExpanded(expanded === application.id ? null : application.id)}
                      >
                        {expanded === application.id ? 'Hide Details' : 'Show Details'}
                      </button>
                      {application.status === 'pending' && (
                        <button className="mt-4 text-sm text-red-600 hover:text-red-800">
                          Withdraw Application
                        </button>
                      )}
                    </div>
                  </div>
                  {expanded === application.id && (
                    <div className="mt-4 bg-gray-50 border rounded p-4 text-sm">
                      <div><strong>Internship Description:</strong> {internship.description || 'No description available.'}</div>
                      <div className="mt-2"><strong>Location:</strong> {internship.location || 'N/A'}</div>
                      <div className="mt-2"><strong>Duration:</strong> {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}</div>
                      <div className="mt-2"><strong>Supervisor:</strong> {internship.supervisor || 'N/A'}</div>
                      <div className="mt-2"><strong>Stipend:</strong> {internship.stipend ? `EGP ${internship.stipend}/month` : 'Unpaid'}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent>
              <div className="text-center py-8">
                <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-4">You haven't applied to any internships</p>
                <Link to="/student/internships" className="text-blue-600 hover:text-blue-800">
                  Browse available internships
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentApplications;