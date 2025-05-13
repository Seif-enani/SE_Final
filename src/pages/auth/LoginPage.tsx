import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { UserRole } from '../../types/user';
import { Input } from '../../components/common/FormElements';
import Button from '../../components/common/Button';
import { AtSign, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        addNotification('Successfully logged in!', 'success');
        
        // Get user role from localStorage to determine redirect
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
          const user = JSON.parse(userStr);
          
          switch (user.role) {
            case UserRole.STUDENT:
              navigate('/student');
              break;
            case UserRole.COMPANY:
              navigate('/company');
              break;
            case UserRole.SCAD_OFFICE:
              navigate('/scad');
              break;
            case UserRole.SUPERVISOR:
              navigate('/faculty');
              break;
            case UserRole.PRO_STUDENT:
              navigate('/prostudent');
              break;
            default:
              navigate('/');
          }
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid email or password');
        addNotification('Failed to login. Please check your credentials.', 'error');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      addNotification('An unexpected error occurred.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    let demoEmail = '';
    let demoPassword = 'password123';
    switch (role) {
      case UserRole.STUDENT:
        demoEmail = 'ahmed.mohamed@student.guc.edu.eg';
        break;
      case UserRole.COMPANY:
        demoEmail = 'john.smith@techcorp.com';
        break;
      case UserRole.SCAD_OFFICE:
        demoEmail = 'mohamed.hassan@guc.edu.eg';
        break;
      case UserRole.SUPERVISOR:
        demoEmail = 'sara.ahmed@techcorp.com';
        break;
      case UserRole.PRO_STUDENT:
        demoEmail = 'prostudentdemo@guc.edu.eg';
        break;
      default:
        break;
    }
    setEmail(demoEmail);
    setPassword(demoPassword);
    setTimeout(() => {
      // Simulate form submit
      document.getElementById('login-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your GUC Internship account</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              className="py-2.5"
            >
              Sign in
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Create an account
              </Link>
            </p>
          </div>

          {/* Demo accounts section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Demo Accounts:</h3>
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <p><strong>Student:</strong> ahmed.mohamed@student.guc.edu.eg</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Button size="xs" variant="outline" onClick={() => handleDemoLogin(UserRole.STUDENT)}>Login</Button>
              </div>
              <div className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <p><strong>Company:</strong> john.smith@techcorp.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Button size="xs" variant="outline" onClick={() => handleDemoLogin(UserRole.COMPANY)}>Login</Button>
              </div>
              <div className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <p><strong>SCAD Office:</strong> mohamed.hassan@guc.edu.eg</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Button size="xs" variant="outline" onClick={() => handleDemoLogin(UserRole.SCAD_OFFICE)}>Login</Button>
              </div>
              <div className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <p><strong>Faculty Member:</strong> sara.ahmed@techcorp.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Button size="xs" variant="outline" onClick={() => handleDemoLogin(UserRole.SUPERVISOR)}>Login</Button>
              </div>
              <div className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <p><strong>ProStudent Demo:</strong> prostudentdemo@guc.edu.eg</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Button size="xs" variant="outline" onClick={() => handleDemoLogin(UserRole.PRO_STUDENT)}>Login</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;