import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Textarea, Select } from '../../components/common/FormElements';
import { Link } from 'react-router-dom';
import { FileInput } from '../../components/common/FormElements';
import { UserRole, Student } from '../../types/user';
import MajorSemesterCourses from '../../components/common/MajorSemesterCourses';

const majorsList = [
  'Computer Science',
  'Business Informatics',
  'Information Systems',
  'Marketing',
  'Finance',
  'Engineering',
  'Mobile Development',
  'Business Administration',
];
const semesterNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

type PreviousJob = { company: string; responsibilities: string; duration: string };
type StudentProfile = {
  jobInterests: string;
  major: string;
  semester: number;
  previousJobs: PreviousJob[];
  activities: string[];
};

const coursesByMajor: Record<string, string[]> = {
  'Computer Science': [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Database Systems',
    'Web Development',
    'Mobile App Development',
    'Software Engineering',
    'Computer Networks',
    'Artificial Intelligence',
    'Machine Learning',
  ],
  'Business Informatics': [
    'Business Analytics',
    'Financial Accounting',
    'Information Systems',
    'Data Visualization',
    'Project Management',
    'Database Systems',
    'Business Intelligence',
  ],
  'Information Systems': [
    'Systems Analysis',
    'Database Management',
    'Enterprise Systems',
    'IT Project Management',
    'Business Process Modeling',
  ],
  'Marketing': [
    'Principles of Marketing',
    'Consumer Behavior',
    'Digital Marketing',
    'Market Research',
    'Brand Management',
  ],
  'Finance': [
    'Corporate Finance',
    'Financial Markets',
    'Investment Analysis',
    'Banking Operations',
    'Risk Management',
  ],
  'Engineering': [
    'Engineering Mathematics',
    'Thermodynamics',
    'Fluid Mechanics',
    'Control Systems',
    'Materials Science',
  ],
  'Mobile Development': [
    'Mobile App Development',
    'Cross-Platform Development',
    'User Interface Design',
    'Mobile Security',
  ],
  'Business Administration': [
    'Organizational Behavior',
    'Business Law',
    'Strategic Management',
    'Operations Management',
    'Human Resource Management',
  ],
};

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only for students: local state for editable fields
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    (currentUser?.role === UserRole.STUDENT || currentUser?.role === UserRole.PRO_STUDENT)
      ? {
          jobInterests: '',
          major: (currentUser as Student).major || '',
          semester: 1,
          previousJobs: [],
          activities: [''],
        }
      : null
  );

  // Handlers for dynamic fields
  const handleJobChange = (idx: number, field: keyof PreviousJob, value: string) => {
    setStudentProfile((prev) => {
      if (!prev) return prev;
      const jobs = [...prev.previousJobs];
      jobs[idx] = { ...jobs[idx], [field]: value };
      return { ...prev, previousJobs: jobs };
    });
  };
  const addJob = () => {
    setStudentProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, previousJobs: [...prev.previousJobs, { company: '', responsibilities: '', duration: '' }] };
    });
  };
  const removeJob = (idx: number) => {
    setStudentProfile((prev) => {
      if (!prev) return prev;
      const jobs = prev.previousJobs.filter((_, i) => i !== idx);
      return { ...prev, previousJobs: jobs };
    });
  };
  const handleActivityChange = (idx: number, value: string) => {
    setStudentProfile((prev) => {
      if (!prev) return prev;
      const acts = [...prev.activities];
      acts[idx] = value;
      return { ...prev, activities: acts };
    });
  };
  const addActivity = () => {
    setStudentProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, activities: [...prev.activities, ''] };
    });
  };
  const removeActivity = (idx: number) => {
    setStudentProfile((prev) => {
      if (!prev) return prev;
      const acts = prev.activities.filter((_, i) => i !== idx);
      return { ...prev, activities: acts };
    });
  };

  const handleSave = () => {
    // Here you would call an API to save the profile
    setEditMode(false);
  };
  const handleCancel = () => {
    setEditMode(false);
    // Optionally reset to original values
  };

  if (!currentUser) return null;

  // STUDENT PROFILE UI
  if (currentUser.role === UserRole.STUDENT || currentUser.role === UserRole.PRO_STUDENT) {
    if (!studentProfile) return null;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={currentUser.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              <h2 className="text-lg font-medium text-gray-900">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
              <p className="text-sm text-gray-500 capitalize">Role: Student</p>
            </div>
            {!editMode ? (
              <>
                <div>
                  <strong>Major:</strong> {studentProfile.major}<br />
                  <strong>Semester:</strong> {studentProfile.semester}
                </div>
                <div>
                  <strong>Job Interests:</strong> {studentProfile.jobInterests || <span className="text-gray-400">Not specified</span>}
                </div>
                <div>
                  <strong>Previous Internships / Part-time Jobs:</strong>
                  {studentProfile.previousJobs.length === 0 ? (
                    <div className="text-gray-400">None added</div>
                  ) : (
                    <ul className="list-disc ml-6">
                      {studentProfile.previousJobs.map((job, idx) => (
                        <li key={idx}>
                          <strong>Company:</strong> {job.company} | <strong>Responsibilities:</strong> {job.responsibilities} | <strong>Duration:</strong> {job.duration}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <strong>College Activities:</strong>
                  {studentProfile.activities.length === 0 || studentProfile.activities.every(a => !a) ? (
                    <div className="text-gray-400">None added</div>
                  ) : (
                    <ul className="list-disc ml-6">
                      {studentProfile.activities.map((act, idx) => act && <li key={idx}>{act}</li>)}
                    </ul>
                  )}
                </div>
                <Button variant="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
                {/* Courses in Major Section */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Courses in My Major</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    {(coursesByMajor[studentProfile.major] || []).map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                </div>
                {/* Extra Documents Upload Section */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Extra Documents</h3>
                  <p className="text-gray-600 text-sm mb-2">Upload certificates, cover letter, CV, or any documents that showcase your fit for internships.</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={e => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setUploadedFiles(prev => [...prev, ...Array.from(files)]);
                      }
                    }}
                  />
                  <Button size="sm" variant="outline" type="button" onClick={() => fileInputRef.current?.click()}>
                    Upload Documents
                  </Button>
                  {uploadedFiles.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                          <span className="truncate max-w-xs text-gray-700 text-sm">{file.name}</span>
                          <Button size="sm" variant="danger" type="button" onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}>
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* New: Major & Semester Courses Selection */}
                <MajorSemesterCourses />
              </>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <label className="block font-medium mb-1">Major</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={studentProfile.major}
                  onChange={e => setStudentProfile(prev => prev ? { ...prev, major: e.target.value } : prev)}
                  required
                >
                  {majorsList.map((major, idx) => (
                    <option key={idx} value={major}>{major}</option>
                  ))}
                </select>
                <label className="block font-medium mb-1">Semester</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={studentProfile.semester}
                  onChange={e => setStudentProfile(prev => prev ? { ...prev, semester: Number(e.target.value) } : prev)}
                  required
                >
                  {semesterNumbers.map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <Textarea
                  label="Job Interests"
                  value={studentProfile.jobInterests}
                  onChange={e => setStudentProfile(prev => prev ? { ...prev, jobInterests: e.target.value } : prev)}
                  placeholder="e.g. Software Engineering, Data Science, Marketing..."
                />
                <div>
                  <label className="block font-medium mb-1">Previous Internships / Part-time Jobs</label>
                  {studentProfile.previousJobs.map((job, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2 items-end">
                      <Input
                        placeholder="Company Name"
                        value={job.company}
                        onChange={e => handleJobChange(idx, 'company', e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Responsibilities"
                        value={job.responsibilities}
                        onChange={e => handleJobChange(idx, 'responsibilities', e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Duration (e.g. 3 months)"
                        value={job.duration}
                        onChange={e => handleJobChange(idx, 'duration', e.target.value)}
                        required
                      />
                      <Button size="sm" variant="danger" type="button" onClick={() => removeJob(idx)}>Remove</Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" type="button" onClick={addJob}>Add Job</Button>
                </div>
                <div>
                  <label className="block font-medium mb-1">College Activities</label>
                  {studentProfile.activities.map((act, idx) => (
                    <div key={idx} className="flex gap-2 mb-2 items-end">
                      <Input
                        placeholder="Activity (e.g. Student Union, Hackathon)"
                        value={act}
                        onChange={e => handleActivityChange(idx, e.target.value)}
                      />
                      <Button size="sm" variant="danger" type="button" onClick={() => removeActivity(idx)}>Remove</Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" type="button" onClick={addActivity}>Add Activity</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" type="submit">Save</Button>
                  <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // NON-STUDENT PROFILE UI (existing logic)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center space-y-4">
          <img
            src={currentUser.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg'}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <h2 className="text-lg font-medium text-gray-900">{currentUser.name}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
          <p className="text-sm text-gray-500 capitalize">Role: {currentUser.role.replace('_', ' ').toLowerCase()}</p>
          <Link to="/settings" className="w-full">
            <Button fullWidth variant="outline">
              Edit Profile Settings
            </Button>
          </Link>
          {currentUser.role === 'company' && (
            <div className="w-full mt-4">
              <FileInput
                id="taxDocument"
                name="taxDocument"
                accept="application/pdf,image/*"
                buttonText="Upload Document"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;