import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, ArrowRight, Briefcase, FileCheck, Users, Award } from 'lucide-react';
import Button from '../../components/common/Button';
import { UserRole } from '../../types/user';

const LandingPage = () => {
  const { isAuthenticated, currentUser } = useAuth();

  const redirectPath = currentUser ? {
    [UserRole.STUDENT]: '/student',
    [UserRole.COMPANY]: '/company',
    [UserRole.SCAD_OFFICE]: '/scad',
    [UserRole.SUPERVISOR]: '/supervisor',
    [UserRole.ACADEMIC_STAFF]: '/academic',
  }[currentUser.role] : '/login';

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">GUC Internship Report Submission System</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Connecting students, companies, and academic staff in one streamlined platform</p>
            {isAuthenticated ? (
              <Link to={redirectPath}>
                <Button 
                  variant="primary"
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50"
                  rightIcon={<ArrowRight size={20} />}
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button 
                    variant="primary"
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 w-full sm:w-auto shadow-md"
                  >
                    Register Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-700 w-full sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="h-16 bg-white transform -translate-y-8 skew-y-1"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Streamlined Internship Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our platform connects all stakeholders in the internship process with a seamless, intuitive interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <Briefcase size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Internship Opportunities</h3>
              <p className="text-gray-600">Companies can post positions while students can easily browse and apply to relevant internships.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-green-600 mb-4">
                <FileCheck size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Report Submission</h3>
              <p className="text-gray-600">Students can submit and track their internship reports throughout the entire process.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-orange-600 mb-4">
                <Users size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Supervisor Evaluation</h3>
              <p className="text-gray-600">Supervisors can easily evaluate student performance and provide valuable feedback.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-purple-600 mb-4">
                <Award size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Academic Assessment</h3>
              <p className="text-gray-600">Academic staff can review reports and evaluations to provide comprehensive assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For All Stakeholders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our platform serves the needs of everyone involved in the internship process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-blue-600"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Browse and apply to internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Submit and track internship reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Receive feedback from supervisors and academic staff</span>
                  </li>
                </ul>
                <Link to="/for-students">
                  <Button variant="outline" fullWidth rightIcon={<ArrowRight size={16} />}>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-green-600"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Companies</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Post and manage internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Review and select student applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Assign supervisors to manage interns</span>
                  </li>
                </ul>
                <Link to="/for-companies">
                  <Button variant="outline" fullWidth rightIcon={<ArrowRight size={16} />}>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-purple-600"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Academic Staff</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Evaluate student reports and performance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Collaborate with industry supervisors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Track student progress and achievements</span>
                  </li>
                </ul>
                <Link to="/about">
                  <Button variant="outline" fullWidth rightIcon={<ArrowRight size={16} />}>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Join the GUC Internship platform today and unlock a world of opportunities.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button 
                  variant="primary"
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
                >
                  Register Now
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-blue-700 w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GUC Internships</h3>
              <p className="text-gray-400">Connecting students, companies, and academic staff for successful internship experiences.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/for-students" className="text-gray-400 hover:text-white">For Students</Link></li>
                <li><Link to="/for-companies" className="text-gray-400 hover:text-white">For Companies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-gray-400 hover:text-white">Help & Support</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>GUC New Cairo Campus</li>
                <li>5th Settlement, New Cairo</li>
                <li>Egypt</li>
                <li>info@guc-internships.edu</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GUC Internship System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;