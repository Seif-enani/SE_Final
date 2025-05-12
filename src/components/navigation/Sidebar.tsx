import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/user';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Users, 
  BarChart, 
  Settings, 
  User,
  Building2,
  GraduationCap,
  ClipboardList,
  CheckSquare,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<string | null>(null);

  if (!currentUser) return null;

  const toggleSubmenu = (menu: string) => {
    if (isSubmenuOpen === menu) {
      setIsSubmenuOpen(null);
    } else {
      setIsSubmenuOpen(menu);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [];

  switch (currentUser.role) {
    case UserRole.STUDENT:
      navItems.push(
        { path: '/student', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/student/internships', label: 'Browse Internships', icon: <Briefcase size={20} /> },
        { path: '/student/applications', label: 'My Applications', icon: <ClipboardList size={20} /> },
        { path: '/student/reports', label: 'Reports & Evaluations', icon: <FileText size={20} /> },
      );
      break;
    case UserRole.COMPANY:
      navItems.push(
        { path: '/company', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/company/post-internship', label: 'Post Internship', icon: <FileText size={20} /> },
        { path: '/company/internships', label: 'Manage Internships', icon: <Briefcase size={20} /> },
        { path: '/company/applicants', label: 'Applicants', icon: <Users size={20} /> },
      );
      break;
    case UserRole.SCAD_OFFICE:
      navItems.push(
        { path: '/scad', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/scad/companies', label: 'Companies', icon: <Building2 size={20} /> },
        { path: '/scad/students', label: 'Students', icon: <GraduationCap size={20} /> },
        { path: '/scad/internships', label: 'Internships', icon: <Briefcase size={20} /> },
        { path: '/scad/reports', label: 'Reports', icon: <FileText size={20} /> },
      );
      break;
    case UserRole.SUPERVISOR:
      navItems.push(
        { path: '/supervisor', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/supervisor/students', label: 'My Students', icon: <Users size={20} /> },
        { path: '/supervisor/evaluations', label: 'Evaluations', icon: <CheckSquare size={20} /> },
      );
      break;
    case UserRole.ACADEMIC_STAFF:
      navItems.push(
        { path: '/academic', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/academic/reports', label: 'Assigned Reports', icon: <FileText size={20} /> },
        { path: '/academic/evaluations', label: 'Evaluations', icon: <CheckSquare size={20} /> },
      );
      break;
    default:
      break;
  }

  // Add common menu items for all roles
  navItems.push(
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/support', label: 'Help & Support', icon: <HelpCircle size={20} /> },
  );

  return (
    <aside
      className={`h-full bg-white border-r border-gray-200 fixed top-16 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
        isOpen ? 'transform-none' : '-translate-x-full'
      } md:transform-none`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="space-y-2 font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-2 rounded-lg ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggle();
                }
              }}
            >
              <div className="mr-3">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;