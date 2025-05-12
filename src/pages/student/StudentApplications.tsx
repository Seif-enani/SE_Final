import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import { dummyApplications, dummyInternships } from '../../data/internships';

const StudentApplications = () => {
  // Assuming the current student has ID 's1'
  const studentId = 's1';
  
  // Get applications for the student
  const applications = dummyApplications.filter(app => app.studentId === studentId);
  
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
      
      <div className="space-y-6">
        {applications.length > 0 ? (
          applications.map(application => {
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
                            Start date: {new Date(internship.startDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className={statusBadge.className}>
                        {statusBadge.icon}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                      
                      {application.status === 'pending' && (
                        <button className="mt-4 text-sm text-red-600 hover:text-red-800">
                          Withdraw Application
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {application.status === 'pending' && (
                    <div className="mt-4 bg-blue-50 text-blue-700 px-4 py-3 rounded-md">
                      <p className="text-sm">Your application is under review. We'll notify you when there's an update.</p>
                    </div>
                  )}
                  
                  {application.status === 'accepted' && (
                    <div className="mt-4 bg-green-50 text-green-700 px-4 py-3 rounded-md">
                      <p className="text-sm">Congratulations! Your application has been accepted. Check your email for further instructions.</p>
                    </div>
                  )}
                  
                  {application.status === 'rejected' && (
                    <div className="mt-4 bg-red-50 text-red-700 px-4 py-3 rounded-md">
                      <p className="text-sm">We're sorry, but your application wasn't selected for this opportunity. Keep applying!</p>
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