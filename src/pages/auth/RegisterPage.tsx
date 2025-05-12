// Updated RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/user';
import { Input, Select, RadioGroup, FileInput, Textarea } from '../../components/common/FormElements';
import Button from '../../components/common/Button';

const roleOptions = [
  { value: UserRole.STUDENT, label: 'Student' },
  { value: UserRole.COMPANY, label: 'Company' },
  { value: UserRole.SUPERVISOR, label: 'Supervisor' },
  { value: UserRole.ACADEMIC_STAFF, label: 'Academic Staff' },
  { value: UserRole.SCAD_OFFICE, label: 'SCAD Office' },
];

const initialFormData: any = {
  name: '', email: '', password: '', confirmPassword: '',
  studentId: '', faculty: '', major: '', gpa: '', graduationYear: new Date().getFullYear(),
  companyName: '', industry: '', companySize: 'small', companyLogo: null, website: '', location: '', description: '',
  department: '', position: '',
};

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [formData, setFormData] = useState<any>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  // Step 1 validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedRole) newErrors.role = 'Please select a role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 validation
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    // Common fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'At least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // Role-specific
    if (selectedRole === UserRole.STUDENT) {
      if (!formData.studentId) newErrors.studentId = 'Student ID required';
      if (!formData.faculty) newErrors.faculty = 'Faculty required';
      if (!formData.major) newErrors.major = 'Major required';
      if (!formData.gpa) newErrors.gpa = 'GPA required';
      else if (isNaN(Number(formData.gpa)) || Number(formData.gpa) < 0 || Number(formData.gpa) > 4) newErrors.gpa = 'GPA must be 0-4';
      if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year required';
    }
    if (selectedRole === UserRole.COMPANY) {
      if (!formData.companyName) newErrors.companyName = 'Company name required';
      if (!formData.industry) newErrors.industry = 'Industry required';
      if (!formData.companySize) newErrors.companySize = 'Company size required';
      if (!formData.companyLogo) newErrors.companyLogo = 'Logo required';
      if (!formData.website) newErrors.website = 'Website required';
      if (!formData.location) newErrors.location = 'Location required';
      if (!formData.description) newErrors.description = 'Description required';
    }
    if (selectedRole === UserRole.SUPERVISOR) {
      if (!formData.companyName) newErrors.companyName = 'Company name required';
      if (!formData.department) newErrors.department = 'Department required';
      if (!formData.position) newErrors.position = 'Position required';
    }
    if (selectedRole === UserRole.ACADEMIC_STAFF || selectedRole === UserRole.SCAD_OFFICE) {
      if (!formData.department) newErrors.department = 'Department required';
      if (!formData.position) newErrors.position = 'Position required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value as UserRole);
    setErrors({});
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev: any) => ({ ...prev, companyLogo: e.target.files![0] }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsLoading(true);
    const payload: any = { ...formData, role: selectedRole };
    if (selectedRole === UserRole.STUDENT) payload.gpa = parseFloat(formData.gpa);
    const success = await register(payload);
    setIsLoading(false);
    if (success) {
      addNotification('Account created successfully!', 'success');
      navigate('/login');
    } else {
      addNotification('Error creating account. Please try again.', 'error');
    }
  };

  // Dynamic fields for Step 2
  const renderRoleFields = () => {
    switch (selectedRole) {
      case UserRole.STUDENT:
        return (
          <>
            <Input label="Student ID" name="studentId" value={formData.studentId} onChange={handleInputChange} error={errors.studentId} required />
            <Input label="Faculty" name="faculty" value={formData.faculty} onChange={handleInputChange} error={errors.faculty} required />
            <Input label="Major" name="major" value={formData.major} onChange={handleInputChange} error={errors.major} required />
            <Input label="GPA" name="gpa" value={formData.gpa} onChange={handleInputChange} error={errors.gpa} required />
            <Select
              label="Graduation Year"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              options={Array.from({ length: 6 }, (_, i) => {
                const y = new Date().getFullYear() + i;
                return { value: y.toString(), label: y.toString() };
              })}
              error={errors.graduationYear}
              required
            />
          </>
        );
      case UserRole.COMPANY:
        return (
          <>
            <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} error={errors.companyName} required />
            <Input label="Industry" name="industry" value={formData.industry} onChange={handleInputChange} error={errors.industry} required />
            <Select
              label="Company Size"
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              options={[
                { value: 'small', label: 'Small (≤50)' },
                { value: 'medium', label: 'Medium (51-100)' },
                { value: 'large', label: 'Large (101-500)' },
                { value: 'corporate', label: 'Corporate (500+)' },
              ]}
              error={errors.companySize}
              required
            />
            <FileInput label="Company Logo" name="companyLogo" onChange={handleFileChange} error={errors.companyLogo} required />
            <Input label="Website" name="website" value={formData.website} onChange={handleInputChange} error={errors.website} required />
            <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} error={errors.location} required />
            <Textarea label="Description" name="description" value={formData.description} onChange={handleInputChange} error={errors.description} required />
          </>
        );
      case UserRole.SUPERVISOR:
        return (
          <>
            <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} error={errors.companyName} required />
            <Input label="Department" name="department" value={formData.department} onChange={handleInputChange} error={errors.department} required />
            <Input label="Position" name="position" value={formData.position} onChange={handleInputChange} error={errors.position} required />
          </>
        );
      case UserRole.ACADEMIC_STAFF:
      case UserRole.SCAD_OFFICE:
        return (
          <>
            <Input label="Department" name="department" value={formData.department} onChange={handleInputChange} error={errors.department} required />
            <Input label="Position" name="position" value={formData.position} onChange={handleInputChange} error={errors.position} required />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <Select
                label="Registering as"
                name="role"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value as UserRole);
                  setErrors((prev) => {
                    const { role, ...rest } = prev;
                    return rest;
                  });
                }}
                options={[
                  { value: '', label: 'Select a role' },
                  ...roleOptions,
                ]}
                error={errors.role}
                required
              />
              {errors.role && (
                <div className="text-red-600 text-sm mt-1">{errors.role}</div>
              )}
              <Button type="submit" fullWidth className="mt-4">Next</Button>
            </>
          ) : (
            <>
              <Input label="Full Name" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} required />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} required />
              <Input label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} error={errors.password} required />
              <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} required />
              {renderRoleFields()}
              <div className="flex gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)} fullWidth>Back</Button>
                <Button type="submit" fullWidth isLoading={isLoading}>Create Account</Button>
              </div>
            </>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
