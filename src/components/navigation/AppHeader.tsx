import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Bell, Search, ChevronDown } from 'lucide-react';
import { UserRole } from '../../types/user';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  const getLogoText = () => {
    if (!currentUser) return 'GUC Internships';

    switch (currentUser.role) {
      case UserRole.STUDENT:
        return 'Student Dashboard';
      case UserRole.COMPANY:
        return 'Company Dashboard';
      case UserRole.SCAD_OFFICE:
        return 'SCAD Office';
      case UserRole.SUPERVISOR:
        return 'Supervisor Dashboard';
      case UserRole.ACADEMIC_STAFF:
        return 'Academic Staff';
      default:
        return 'GUC Internships';
    }
  };

  const navLinks = [];
  
  if (currentUser) {
    switch (currentUser.role) {
      case UserRole.STUDENT:
        navLinks.push(
          { text: 'Dashboard', href: '/student' },
          { text: 'Browse Internships', href: '/student/internships' },
          { text: 'My Applications', href: '/student/applications' },
          { text: 'Reports', href: '/student/reports' }
        );
        break;
      case UserRole.COMPANY:
        navLinks.push(
          { text: 'Dashboard', href: '/company' },
          { text: 'Post Internship', href: '/company/post-internship' },
          { text: 'Manage Internships', href: '/company/internships' },
          { text: 'Applicants', href: '/company/applicants' }
        );
        break;
      case UserRole.SCAD_OFFICE:
        navLinks.push(
          { text: 'Dashboard', href: '/scad' },
          { text: 'Companies', href: '/scad/companies' },
          { text: 'Students', href: '/scad/students' },
          { text: 'Internships', href: '/scad/internships' },
          { text: 'Reports', href: '/scad/reports' }
        );
        break;
      case UserRole.SUPERVISOR:
        navLinks.push(
          { text: 'Dashboard', href: '/supervisor' },
          { text: 'My Students', href: '/supervisor/students' },
          { text: 'Evaluations', href: '/supervisor/evaluations' }
        );
        break;
      case UserRole.ACADEMIC_STAFF:
        navLinks.push(
          { text: 'Dashboard', href: '/academic' },
          { text: 'Assigned Reports', href: '/academic/reports' },
          { text: 'Evaluations', href: '/academic/evaluations' }
        );
        break;
      default:
        break;
    }
  } else {
    navLinks.push(
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'For Students', href: '/for-students' },
      { text: 'For Companies', href: '/for-companies' },
      { text: 'Contact', href: '/contact' }
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className={`text-xl font-semibold ${isScrolled ? 'text-blue-600' : 'text-blue-600'}`}>
                {getLogoText()}
              </span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-gray-700'
                }`}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                {/* Search Button */}
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={toggleNotifications}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">Your report was evaluated</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                        <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">New internship opportunity posted</p>
                          <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                        </div>
                        <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">Application status updated</p>
                          <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 text-center border-t border-gray-200">
                        <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-800">
                          View all notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                    onClick={toggleProfileDropdown}
                  >
                    <img
                      src={currentUser.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="ml-2">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>
          
          {/* Mobile Profile Section */}
          {currentUser ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    src={currentUser.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                  <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-4 flex flex-col space-y-2">
              <Link
                to="/login"
                className="block w-full py-2 text-center rounded-md text-base font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block w-full py-2 text-center rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;