import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  BarChart, 
  CalendarDays,
  Search 
} from 'lucide-react';
import { dummyInternships } from '../../data/internships';
import { Student } from '../../types/user';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;

  const pendingApplications = student?.appliedInternships?.length || 0;
  const activeInternship = student?.activeInternship ? 1 : 0;
  const completedInternships = student?.completedInternships?.length || 0;

  // Filter internships to get the active one
  const activeInternshipDetails = student?.activeInternship 
    ? dummyInternships.find(internship => internship.id === student.activeInternship)
    : null;
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {student?.name?.split(' ')[0]}</p>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Applications</p>
            <h3 className="text-2xl font-bold text-gray-900">{pendingApplications}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Internships</p>
            <h3 className="text-2xl font-bold text-gray-900">{activeInternship}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Internships</p>
            <h3 className="text-2xl font-bold text-gray-900">{completedInternships}</h3>
          </div>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Internship Card */}
          {activeInternshipDetails ? (
            <Card>
              <CardHeader 
                title="Current Internship" 
                subtitle="Your active internship details" 
                action={
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                }
              />
              <CardContent>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{activeInternshipDetails.title}</h4>
                      <p className="text-gray-600">{activeInternshipDetails.companyId === 'c1' ? 'TechCorp Solutions' : 'FinBank International'}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p className="font-medium text-gray-900">{activeInternshipDetails.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{activeInternshipDetails.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p className="font-medium text-gray-900">{new Date(activeInternshipDetails.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End Date</p>
                      <p className="font-medium text-gray-900">{new Date(activeInternshipDetails.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button
                      size="sm"
                      leftIcon={<FileText size={16} />}
                      variant="primary"
                    >
                      Submit Report
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<AlertCircle size={16} />}
                      variant="outline"
                    >
                      Report Issue
                    </Button>
                  </div>
                </div>
                
                <h5 className="font-medium text-gray-900 mb-2">Upcoming Deadlines</h5>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-orange-100 text-orange-600 mr-3 mt-0.5">
                      <CalendarDays size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mid-term Report</p>
                      <p className="text-sm text-gray-600">Due in 5 days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                      <CalendarDays size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Supervisor Meeting</p>
                      <p className="text-sm text-gray-600">Tomorrow at 2:00 PM</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader title="No Active Internship" />
              <CardContent>
                <div className="text-center py-8">
                  <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">You don't have an active internship</h3>
                  <p className="text-gray-600 mb-4">Browse available internships and apply to get started</p>
                  <Link to="/student/internships">
                    <Button
                      variant="primary"
                      leftIcon={<Search size={18} />}
                    >
                      Browse Internships
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Recent Applications */}
          <Card>
            <CardHeader 
              title="Recent Applications" 
              subtitle="Track your internship applications" 
              action={
                <Link to="/student/applications">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              }
            />
            <CardContent>
              {student?.appliedInternships?.length > 0 ? (
                <div className="space-y-4">
                  {student.appliedInternships.map((internshipId) => {
                    const internship = dummyInternships.find(i => i.id === internshipId);
                    if (!internship) return null;
                    
                    return (
                      <div key={internship.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{internship.title}</h4>
                            <p className="text-sm text-gray-600">{internship.companyId === 'c1' ? 'TechCorp Solutions' : 'FinBank International'}</p>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Pending</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          Applied on {new Date(internship.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't applied to any internships yet.</p>
                  <Link to="/student/internships" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    Browse available internships
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader title="Your Profile" />
            <CardContent>
              <div className="flex flex-col items-center">
                <img 
                  src={student?.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">{student?.name}</h3>
                <p className="text-gray-600 mb-4">{student?.studentId}</p>
                
                <div className="w-full mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Faculty:</span>
                    <span className="font-medium text-gray-900">{student?.faculty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Major:</span>
                    <span className="font-medium text-gray-900">{student?.major}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">GPA:</span>
                    <span className="font-medium text-gray-900">{student?.gpa}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Graduation Year:</span>
                    <span className="font-medium text-gray-900">{student?.graduationYear}</span>
                  </div>
                </div>
                
                <Link to="/profile" className="mt-4 w-full">
                  <Button variant="outline" fullWidth>
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Progress Card */}
          <Card>
            <CardHeader title="Internship Progress" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Applications</span>
                    <span className="text-sm font-medium text-gray-700">{pendingApplications}/5</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: `${(pendingApplications / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Active Internships</span>
                    <span className="text-sm font-medium text-gray-700">{activeInternship}/1</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-600 rounded-full" 
                      style={{ width: `${activeInternship * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Completed Internships</span>
                    <span className="text-sm font-medium text-gray-700">{completedInternships}/2</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-purple-600 rounded-full" 
                      style={{ width: `${(completedInternships / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-3">Internship Requirements</h5>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className={`p-1 rounded-full ${completedInternships >= 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} mr-3`}>
                      <CheckCircle size={16} />
                    </div>
                    <span className={`text-sm ${completedInternships >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                      Complete at least 1 internship
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className={`p-1 rounded-full ${completedInternships >= 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} mr-3`}>
                      <CheckCircle size={16} />
                    </div>
                    <span className={`text-sm ${completedInternships >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                      Complete 2 internships (graduation requirement)
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;