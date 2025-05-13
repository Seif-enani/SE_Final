import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/user';

// Layouts
import AppLayout from '../layouts/AppLayout';

// Authentication Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import AboutPage from '../pages/public/AboutPage';
import ForStudentsPage from '../pages/public/ForStudentsPage';
import ForCompaniesPage from '../pages/public/ForCompaniesPage';
import ContactPage from '../pages/public/ContactPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import BrowseInternships from '../pages/student/BrowseInternships';
import InternshipDetails from '../pages/student/InternshipDetails';
import StudentApplications from '../pages/student/StudentApplications';
import StudentReports from '../pages/student/StudentReports';
import StudentNotifications from '../pages/student/StudentNotifications';

// Company Pages
import CompanyDashboard from '../pages/company/CompanyDashboard';
import PostInternship from '../pages/company/PostInternship';
import ManageInternships from '../pages/company/ManageInternships';
import ManageApplicants from '../pages/company/ManageApplicants';
import EditInternship from '../pages/company/EditInternship';
import CompanyInternshipDetails from '../pages/company/InternshipDetails';
import Notifications from '../pages/company/Notifications';
import CompanyBrowseInternships from '../pages/company/BrowseInternships';
import CompanyEvaluations from '../pages/company/CompanyEvaluations';

// SCAD Office Pages
import SCADDashboard from '../pages/scad/SCADDashboard';
import SCADCompanies from '../pages/scad/SCADCompanies';
import SCADStudents from '../pages/scad/SCADStudents';
import SCADInternships from '../pages/scad/SCADInternships';
import SCADReports from '../pages/scad/SCADReports';
import SCADInternshipDetails from '../pages/scad/SCADInternshipDetails';
import SCADStudentProfile from '../pages/scad/SCADStudentProfile';
import SCADEvaluations from '../pages/scad/SCADEvaluations';
import SCADAppointments from '../pages/scad/SCADAppointments';
import SCADWorkshops from '../pages/scad/SCADWorkshops';

// Supervisor Pages
import SupervisorDashboard from '../pages/supervisor/SupervisorDashboard';
import SupervisorStudents from '../pages/supervisor/SupervisorStudents';
import SupervisorEvaluations from '../pages/supervisor/SupervisorEvaluations';

// Academic Staff Pages
import AcademicDashboard from '../pages/academic/AcademicDashboard';
import AcademicReports from '../pages/academic/AcademicReports';
import AcademicEvaluations from '../pages/academic/AcademicEvaluations';

// Shared Pages
import ProfilePage from '../pages/shared/ProfilePage';
import SettingsPage from '../pages/shared/SettingsPage';
import SupportPage from '../pages/shared/SupportPage';
import NotFoundPage from '../pages/shared/NotFoundPage';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: UserRole[];
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && currentUser && !requiredRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on role
    switch (currentUser.role) {
      case UserRole.STUDENT:
        return <Navigate to="/student" />;
      case UserRole.COMPANY:
        return <Navigate to="/company" />;
      case UserRole.SCAD_OFFICE:
        return <Navigate to="/scad" />;
      case UserRole.SUPERVISOR:
        return <Navigate to="/supervisor" />;
      case UserRole.ACADEMIC_STAFF:
        return <Navigate to="/academic" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AppLayout><LandingPage /></AppLayout>} />
      <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
      <Route path="/for-students" element={<AppLayout><ForStudentsPage /></AppLayout>} />
      <Route path="/for-companies" element={<AppLayout><ForCompaniesPage /></AppLayout>} />
      <Route path="/contact" element={<AppLayout><ContactPage /></AppLayout>} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute requiredRoles={[UserRole.STUDENT]}>
            <AppLayout><StudentDashboard /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/internships"
        element={
          <ProtectedRoute requiredRoles={[UserRole.STUDENT]}>
            <AppLayout><BrowseInternships /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/internship/:id"
        element={
          <ProtectedRoute requiredRoles={[UserRole.STUDENT]}>
            <AppLayout><InternshipDetails /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/applications"
        element={
          <ProtectedRoute requiredRoles={[UserRole.STUDENT]}>
            <AppLayout><StudentApplications /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/reports"
        element={
          <ProtectedRoute requiredRoles={[UserRole.STUDENT]}>
            <AppLayout><StudentReports /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/notifications"
        element={
          <ProtectedRoute requiredRoles={[UserRole.STUDENT]}>
            <AppLayout><StudentNotifications /></AppLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Company Routes */}
      <Route
        path="/company"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><CompanyDashboard /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/post-internship"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><PostInternship /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/internships"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><ManageInternships /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/applicants"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><ManageApplicants /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/internships/:id"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><CompanyInternshipDetails /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/internships/:id/edit"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><EditInternship /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/notifications"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><Notifications /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/browse-internships"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><CompanyBrowseInternships /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/evaluations"
        element={
          <ProtectedRoute requiredRoles={[UserRole.COMPANY]}>
            <AppLayout><CompanyEvaluations /></AppLayout>
          </ProtectedRoute>
        }
      />
      
      {/* SCAD Office Routes */}
      <Route
        path="/scad"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADDashboard /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/companies"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADCompanies /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/students"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADStudents /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/students/:id"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADStudentProfile /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/internships"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADInternships /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/internship/:id"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADInternshipDetails /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/reports"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADReports /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/evaluations"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADEvaluations /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/appointments"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADAppointments /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scad/workshops"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SCAD_OFFICE]}>
            <AppLayout><SCADWorkshops /></AppLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Supervisor Routes */}
      <Route
        path="/supervisor"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SUPERVISOR]}>
            <AppLayout><SupervisorDashboard /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/students"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SUPERVISOR]}>
            <AppLayout><SupervisorStudents /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/evaluations"
        element={
          <ProtectedRoute requiredRoles={[UserRole.SUPERVISOR]}>
            <AppLayout><SupervisorEvaluations /></AppLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Academic Staff Routes */}
      <Route
        path="/academic"
        element={
          <ProtectedRoute requiredRoles={[UserRole.ACADEMIC_STAFF]}>
            <AppLayout><AcademicDashboard /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic/reports"
        element={
          <ProtectedRoute requiredRoles={[UserRole.ACADEMIC_STAFF]}>
            <AppLayout><AcademicReports /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic/evaluations"
        element={
          <ProtectedRoute requiredRoles={[UserRole.ACADEMIC_STAFF]}>
            <AppLayout><AcademicEvaluations /></AppLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Shared Routes (Protected) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout><ProfilePage /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout><SettingsPage /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <AppLayout><SupportPage /></AppLayout>
          </ProtectedRoute>
        }
      />
      
      {/* 404 Route */}
      <Route path="*" element={<AppLayout><NotFoundPage /></AppLayout>} />
    </Routes>
  );
};

export default AppRoutes;