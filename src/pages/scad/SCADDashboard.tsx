import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Briefcase, FileText, 
  CheckCircle, XCircle, Clock, AlertTriangle,
  BarChart4, TrendingUp, PieChart, Search,
  Video
} from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { dummyInternships, dummyApplications, dummyReports } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { useAuth } from '../../context/AuthContext';

const SCADDashboard = () => {
  const { currentUser } = useAuth();
  
  // Calculate key statistics
  const totalCompanies = dummyUsers.filter(user => user.role === UserRole.COMPANY).length;
  const totalStudents = dummyUsers.filter(user => user.role === UserRole.STUDENT).length;
  const totalInternships = dummyInternships.length;
  const totalApplications = dummyApplications.length;
  
  const pendingInternships = dummyInternships.filter(i => i.status === 'pending').length;
  const approvedInternships = dummyInternships.filter(i => i.status === 'approved').length;
  const rejectedInternships = dummyInternships.filter(i => i.status === 'rejected').length;
  
  const pendingApplications = dummyApplications.filter(a => a.status === 'pending').length;
  const acceptedApplications = dummyApplications.filter(a => a.status === 'accepted').length;
  const rejectedApplications = dummyApplications.filter(a => a.status === 'rejected').length;
  
  const reports = dummyReports;
  const pendingReports = reports.filter(r => ['submitted', 'revised'].includes(r.status)).length;
  const evaluatedReports = reports.filter(r => r.status === 'evaluated').length;
  const approvedReports = reports.filter(r => r.status === 'approved').length;
  
  // Tabs for quick access reports
  const [activeTab, setActiveTab] = useState<'internships' | 'applications' | 'reports'>('internships');

  // Sidebar links (for demo, normally in layout/sidebar component)
  const sidebarLinks = [
    { label: 'Dashboard', to: '/scad', icon: <BarChart4 size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Companies', to: '/scad/companies', icon: <Building2 size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Students', to: '/scad/students', icon: <Users size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Internships', to: '/scad/internships', icon: <Briefcase size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Reports', to: '/scad/reports', icon: <FileText size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Evaluations', to: '/scad/evaluations', icon: <CheckCircle size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Appointments & Video Calls', to: '/scad/appointments', icon: <Video size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Profile', to: '/profile', icon: <Users size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Settings', to: '/settings', icon: <Clock size={18} />, roles: [UserRole.SCAD_OFFICE] },
    { label: 'Help & Support', to: '/support', icon: <AlertTriangle size={18} />, roles: [UserRole.SCAD_OFFICE] },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SCAD Office Dashboard</h1>
          <p className="text-gray-600">Welcome, {currentUser?.name || 'Mohamed Hassan'}</p>
        </div>
        <div className="space-x-3">
          <Link to="/scad/internships">
            <Button variant="outline" leftIcon={<Search size={18} />}>
              Review Internships
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Companies</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalCompanies}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Students</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalStudents}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Internships</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalInternships}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Reports</p>
            <h3 className="text-2xl font-bold text-gray-900">{reports.length}</h3>
          </div>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader 
              title="Pending Approvals" 
              subtitle="Items requiring your review and action"
            />
            <CardContent>
              <div className="flex mb-4 border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'internships'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('internships')}
                >
                  Internships ({pendingInternships})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'applications'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('applications')}
                >
                  Applications ({pendingApplications})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'reports'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('reports')}
                >
                  Reports ({pendingReports})
                </button>
              </div>
              
              {activeTab === 'internships' && (
                pendingInternships > 0 ? (
                  <div className="space-y-4">
                    {dummyInternships
                      .filter(internship => internship.status === 'pending')
                      .map(internship => {
                        const company = dummyUsers.find(
                          u => u.role === UserRole.COMPANY && u.id === internship.companyId
                        );
                        
                        return (
                          <div 
                            key={internship.id} 
                            className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{internship.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {company?.companyName || 'Unknown Company'}
                                </p>
                              </div>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                Pending
                              </span>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Department:</span>
                                <p className="font-medium text-gray-900">{internship.department}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Type:</span>
                                <p className="font-medium text-gray-900">
                                  {internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">Posted:</span>
                                <p className="font-medium text-gray-900">
                                  {new Date(internship.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="primary">
                                Approve
                              </Button>
                              <Button size="sm" variant="danger">
                                Reject
                              </Button>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending internships</h3>
                    <p className="text-gray-600">All internship postings have been reviewed</p>
                  </div>
                )
              )}
              
              {activeTab === 'applications' && (
                pendingApplications > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-2">
                      There are {pendingApplications} applications waiting for company action
                    </p>
                    <Link to="/scad/students">
                      <Button size="sm" variant="outline">
                        View All Applications
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending applications</h3>
                    <p className="text-gray-600">All applications have been processed by companies</p>
                  </div>
                )
              )}
              
              {activeTab === 'reports' && (
                pendingReports > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-2">
                      There are {pendingReports} reports waiting for evaluation
                    </p>
                    <Link to="/scad/reports">
                      <Button size="sm" variant="outline">
                        View All Reports
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reports</h3>
                    <p className="text-gray-600">All submitted reports have been evaluated</p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader 
              title="Recent Activity" 
              subtitle="Latest actions in the system" 
            />
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-2 mr-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Internship <span className="text-blue-600">Business Analyst</span> was approved
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-2 mr-3">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      New company <span className="text-blue-600">TechCorp Solutions</span> registered
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-2 mr-3">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Student report was evaluated by academic staff
                    </p>
                    <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2 mr-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      New internship <span className="text-blue-600">Software Engineering Intern</span> needs approval
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Status Summary */}
          <Card>
            <CardHeader title="Internship Status" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Pending</span>
                    <span className="text-sm font-medium text-gray-700">{pendingInternships}/{totalInternships}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-500 rounded-full" 
                      style={{ width: `${(pendingInternships / totalInternships) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Approved</span>
                    <span className="text-sm font-medium text-gray-700">{approvedInternships}/{totalInternships}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ width: `${(approvedInternships / totalInternships) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Rejected</span>
                    <span className="text-sm font-medium text-gray-700">{rejectedInternships}/{totalInternships}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-red-500 rounded-full" 
                      style={{ width: `${(rejectedInternships / totalInternships) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-3">Application Status</h5>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">{pendingApplications}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-500 font-bold text-lg">{acceptedApplications}</div>
                    <div className="text-xs text-gray-500">Accepted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-lg">{rejectedApplications}</div>
                    <div className="text-xs text-gray-500">Rejected</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <div className="space-y-3">
                <Link to="/scad/companies">
                  <Button variant="outline" fullWidth leftIcon={<Building2 size={16} />}>
                    Manage Companies
                  </Button>
                </Link>
                <Link to="/scad/students">
                  <Button variant="outline" fullWidth leftIcon={<Users size={16} />}>
                    Manage Students
                  </Button>
                </Link>
                <Link to="/scad/internships">
                  <Button variant="outline" fullWidth leftIcon={<Briefcase size={16} />}>
                    Manage Internships
                  </Button>
                </Link>
                <Link to="/scad/reports">
                  <Button variant="outline" fullWidth leftIcon={<FileText size={16} />}>
                    View Reports
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Alert Card */}
          {pendingInternships > 0 || pendingReports > 0 ? (
            <Card>
              <CardContent>
                <div className="flex items-start p-4 bg-yellow-50 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800 mb-1">Attention Required</h5>
                    <p className="text-sm text-yellow-700">
                      {pendingInternships > 0 && `${pendingInternships} internship${pendingInternships > 1 ? 's' : ''} pending review. `}
                      {pendingReports > 0 && `${pendingReports} student report${pendingReports > 1 ? 's' : ''} need evaluation.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SCADDashboard;