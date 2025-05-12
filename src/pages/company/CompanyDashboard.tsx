import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart4, 
  Clock, 
  CheckCircle, 
  Building, 
  UserCheck,
  PlusCircle
} from 'lucide-react';
import { dummyInternships, dummyApplications } from '../../data/internships';
import { Company } from '../../types/user';

const CompanyDashboard = () => {
  const { currentUser } = useAuth();
  const company = currentUser as Company;

  // Get company's internships
  const companyInternships = dummyInternships.filter(internship => 
    internship.companyId === company.id
  );
  
  // Count statistics
  const totalInternships = companyInternships.length;
  const activeInternships = companyInternships.filter(i => i.status === 'approved').length;
  const pendingInternships = companyInternships.filter(i => i.status === 'pending').length;
  
  // Get applications for company's internships
  const companyApplications = dummyApplications.filter(application => 
    companyInternships.some(internship => internship.id === application.internshipId)
  );
  
  const pendingApplications = companyApplications.filter(a => a.status === 'pending').length;
  const acceptedApplications = companyApplications.filter(a => a.status === 'accepted').length;
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
          <p className="text-gray-600">Welcome back, {company?.companyName}</p>
        </div>
        <Link to="/company/post-internship">
          <Button leftIcon={<PlusCircle size={18} />}>
            Post New Internship
          </Button>
        </Link>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Posted Internships</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalInternships}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Applicants</p>
            <h3 className="text-2xl font-bold text-gray-900">{companyApplications.length}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Accepted Students</p>
            <h3 className="text-2xl font-bold text-gray-900">{acceptedApplications}</h3>
          </div>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Internships */}
          <Card>
            <CardHeader 
              title="Your Internships" 
              subtitle="Recently posted internship opportunities" 
              action={
                <Link to="/company/internships">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              }
            />
            <CardContent>
              {companyInternships.length > 0 ? (
                <div className="space-y-4">
                  {companyInternships.map((internship) => {
                    const statusColors = {
                      draft: 'bg-gray-100 text-gray-800',
                      pending: 'bg-yellow-100 text-yellow-800',
                      approved: 'bg-green-100 text-green-800',
                      rejected: 'bg-red-100 text-red-800',
                      closed: 'bg-purple-100 text-purple-800',
                      completed: 'bg-blue-100 text-blue-800',
                    };
                    
                    return (
                      <div key={internship.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{internship.title}</h4>
                            <p className="text-sm text-gray-600">{internship.department}</p>
                          </div>
                          <span className={`px-2 py-1 ${statusColors[internship.status]} text-xs font-medium rounded`}>
                            {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <p className="font-medium text-gray-900">{internship.duration} weeks</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Applicants:</span>
                            <p className="font-medium text-gray-900">{internship.applicantsCount}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Posted:</span>
                            <p className="font-medium text-gray-900">{new Date(internship.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {internship.applicantsCount > 0 && (
                            <Button size="sm" variant="outline">
                              Review Applicants
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No internships posted yet</h3>
                  <p className="text-gray-600 mb-4">Create your first internship posting to start receiving applications</p>
                  <Link to="/company/post-internship">
                    <Button
                      variant="primary"
                      leftIcon={<PlusCircle size={18} />}
                    >
                      Post New Internship
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Applications */}
          <Card>
            <CardHeader 
              title="Recent Applications" 
              subtitle="Students who applied to your internships" 
              action={
                <Link to="/company/applicants">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              }
            />
            <CardContent>
              {companyApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companyApplications.slice(0, 5).map((application) => {
                        const internship = dummyInternships.find(i => i.id === application.internshipId);
                        const statusColors = {
                          pending: 'bg-yellow-100 text-yellow-800',
                          accepted: 'bg-green-100 text-green-800',
                          rejected: 'bg-red-100 text-red-800',
                          withdrawn: 'bg-gray-100 text-gray-800',
                        };
                        
                        return (
                          <tr key={application.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">Ahmed Mohamed</div>
                                  <div className="text-sm text-gray-500">Computer Science</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{internship?.title}</div>
                              <div className="text-sm text-gray-500">{internship?.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(application.appliedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[application.status]}`}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button size="sm" variant="outline" className="mr-2">
                                View
                              </Button>
                              {application.status === 'pending' && (
                                <>
                                  <Button size="sm" variant="primary" className="mr-2">
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="danger">
                                    Reject
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No applications received yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Company Profile Card */}
          <Card>
            <CardHeader title="Company Profile" />
            <CardContent>
              <div className="flex flex-col items-center">
                <img 
                  src={company?.companyLogo || "https://placehold.co/200x200?text=Logo"} 
                  alt="Company Logo" 
                  className="h-24 w-24 rounded-lg object-cover mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">{company?.companyName}</h3>
                <p className="text-gray-600 mb-4">{company?.industry}</p>
                
                <div className="w-full mt-2 space-y-3">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{company?.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Company Size</p>
                      <p className="font-medium text-gray-900">{company?.size}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium text-gray-900">{company?.website}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 w-full">
                  <p className="text-sm text-gray-500 mb-2">About</p>
                  <p className="text-sm text-gray-700">{company?.description}</p>
                </div>
                
                <Link to="/profile" className="mt-6 w-full">
                  <Button variant="outline" fullWidth>
                    Edit Company Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Internship Stats Card */}
          <Card>
            <CardHeader title="Internship Statistics" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Active Internships</span>
                    <span className="text-sm font-medium text-gray-700">{activeInternships}/{totalInternships}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-600 rounded-full" 
                      style={{ width: totalInternships ? `${(activeInternships / totalInternships) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Pending Internships</span>
                    <span className="text-sm font-medium text-gray-700">{pendingInternships}/{totalInternships}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-500 rounded-full" 
                      style={{ width: totalInternships ? `${(pendingInternships / totalInternships) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Applications Pending Review</span>
                    <span className="text-sm font-medium text-gray-700">{pendingApplications}/{companyApplications.length || 1}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: companyApplications.length ? `${(pendingApplications / companyApplications.length) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-3">Quick Actions</h5>
                <div className="space-y-2">
                  <Link to="/company/post-internship">
                    <Button variant="outline" size="sm" fullWidth leftIcon={<PlusCircle size={16} />}>
                      Post New Internship
                    </Button>
                  </Link>
                  <Link to="/company/applicants">
                    <Button variant="outline" size="sm" fullWidth leftIcon={<Users size={16} />}>
                      Review Applicants
                    </Button>
                  </Link>
                  <Link to="/company/internships">
                    <Button variant="outline" size="sm" fullWidth leftIcon={<FileText size={16} />}>
                      Manage Internships
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Add the missing Globe component
const Globe = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
};

export default CompanyDashboard;