import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/user';
import { Input, Select, RadioGroup } from '../../components/common/FormElements';
import Button from '../../components/common/Button';
import { User, Building, AtSign, Lock } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: UserRole.STUDENT as string,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as UserRole,
      });
      
      if (success) {
        addNotification('Account created successfully!', 'success');
        navigate('/login');
      } else {
        addNotification('Error creating account. Please try again.', 'error');
      }
    } catch (error) {
      addNotification('An unexpected error occurred.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join the GUC Internship platform</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <Input
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  error={errors.name}
                  leftIcon={<User className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  error={errors.email}
                  leftIcon={<AtSign className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  error={errors.password}
                  leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  error={errors.confirmPassword}
                  leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                />
                
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  onClick={handleNextStep}
                  className="py-2.5"
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <RadioGroup
                  label="I am registering as a"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={[
                    { value: UserRole.STUDENT, label: 'Student' },
                    { value: UserRole.COMPANY, label: 'Company' },
                    { value: UserRole.SUPERVISOR, label: 'Supervisor' },
                  ]}
                  error={errors.role}
                />
                
                {formData.role === UserRole.COMPANY && (
                  <Input
                    label="Company Name"
                    id="companyName"
                    name="companyName"
                    type="text"
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    leftIcon={<Building className="h-5 w-5 text-gray-400" />}
                  />
                )}
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={handlePrevStep}
                    className="py-2.5"
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                    className="py-2.5"
                  >
                    Create Account
                  </Button>
                </div>
              </>
            )}
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;