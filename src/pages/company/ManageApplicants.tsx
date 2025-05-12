import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Download, FileText,
  Eye, CheckCircle, XCircle, UserCheck,
  Mail, Briefcase, Calendar, MapPin, Clock
} from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyApplications, dummyInternships } from '../../data/internships';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Company } from '../../types/user';

// Dummy applicant data
const dummyApplicants: Record<string, {
  name: string;
  photo: string;
  major: string;
  email: string;
  phone: string;
  jobTitle: string;
}> = {
  s1: {
    name: 'Ahmed Mohamed',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    major: 'Computer Science',
    email: 'ahmed.mohamed@email.com',
    phone: '+20 100 123 4567',
    jobTitle: 'Software Engineering Intern',
  },
  s2: {
    name: 'Sara Ali',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    major: 'Business Informatics',
    email: 'sara.ali@email.com',
    phone: '+20 100 987 6543',
    jobTitle: 'Business Analyst Intern',
  },
  s3: {
    name: 'Omar Hassan',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    major: 'Information Systems',
    email: 'omar.hassan@email.com',
    phone: '+20 100 555 1234',
    jobTitle: 'QA Tester Intern',
  },
  s4: {
    name: 'Mona Youssef',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    major: 'Marketing',
    email: 'mona.youssef@email.com',
    phone: '+20 100 222 3344',
    jobTitle: 'Frontend Developer Intern',
  },
  s5: {
    name: 'Khaled Samir',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    major: 'Computer Engineering',
    email: 'khaled.samir@email.com',
    phone: '+20 100 333 4455',
    jobTitle: 'Mobile App Development Intern',
  },
  s6: {
    name: 'Laila Nabil',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    major: 'Business Administration',
    email: 'laila.nabil@email.com',
    phone: '+20 100 666 7788',
    jobTitle: 'Business Analyst Intern',
  },
};

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'finalized', label: 'Finalized' },
  { value: 'current', label: 'Current Intern' },
  { value: 'complete', label: 'Internship Complete' },
];

const ManageApplicants = () => {
  const { currentUser } = useAuth();
  const company = currentUser as Company;
  const { addNotification } = useNotification();
  const companyId = company?.id || 'c1';

  // Get company's internships
  const companyInternships = dummyInternships.filter(internship =>
    internship.companyId === companyId
  );

  // Get applications for company's internships
  const [applications, setApplications] = useState(
    [
      ...dummyApplications.map(app => ({ ...app, status: app.status as string })),
      {
        id: 'a4',
        internshipId: 'i1',
        studentId: 's3',
        status: 'current',
        coverLetter: 'I am passionate about software testing and eager to join your QA team.',
        resumeUrl: '/dummy-resume-3.pdf',
        appliedAt: '2024-05-20T09:00:00Z',
        updatedAt: '2024-05-21T10:00:00Z',
      },
      {
        id: 'a5',
        internshipId: 'i4',
        studentId: 's4',
        status: 'pending',
        coverLetter: 'Frontend development is my passion and I have experience with React and Tailwind.',
        resumeUrl: '/dummy-resume-4.pdf',
        appliedAt: '2024-05-22T11:00:00Z',
        updatedAt: '2024-05-22T11:00:00Z',
      },
      {
        id: 'a6',
        internshipId: 'i3',
        studentId: 's5',
        status: 'complete',
        coverLetter: 'I have developed several mobile apps and want to learn more about cross-platform development.',
        resumeUrl: '/dummy-resume-5.pdf',
        appliedAt: '2024-04-15T08:00:00Z',
        updatedAt: '2024-06-01T12:00:00Z',
      },
      {
        id: 'a7',
        internshipId: 'i2',
        studentId: 's6',
        status: 'accepted',
        coverLetter: 'Business analytics is my field and I am excited to join your team.',
        resumeUrl: '/dummy-resume-6.pdf',
        appliedAt: '2024-05-25T10:30:00Z',
        updatedAt: '2024-05-26T09:00:00Z',
      },
      {
        id: 'a8',
        internshipId: 'i4',
        studentId: 's1',
        status: 'finalized',
        coverLetter: 'I want to contribute to your frontend projects and learn from your team.',
        resumeUrl: '/dummy-resume-1.pdf',
        appliedAt: '2024-05-28T14:00:00Z',
        updatedAt: '2024-05-29T10:00:00Z',
      },
      {
        id: 'a9',
        internshipId: 'i5',
        studentId: 's2',
        status: 'rejected',
        coverLetter: 'I am interested in QA and have a keen eye for detail.',
        resumeUrl: '/dummy-resume-2.pdf',
        appliedAt: '2024-05-30T13:00:00Z',
        updatedAt: '2024-05-31T09:00:00Z',
      },
    ]
  );

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [internTab, setInternTab] = useState<'current' | 'complete'>('current');
  const [internSearch, setInternSearch] = useState('');

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(application => {
    const internship = companyInternships.find(i => i.id === application.internshipId);
    if (!internship) return false;
    const matchesSearch = searchTerm === '' ||
      application.coverLetter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dummyApplicants[application.studentId]?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === '' || application.status === statusFilter;
    const matchesPosition = positionFilter === '' || internship.id === positionFilter;
    return matchesSearch && matchesStatus && matchesPosition;
  });

  // Interns (current and completed)
  const interns = applications.filter(app =>
    app.status === 'current' || app.status === 'complete'
  );
  const filteredInterns = interns.filter(app => {
    const isCurrent = internTab === 'current' ? app.status === 'current' : app.status === 'complete';
    const applicant = dummyApplicants[app.studentId];
    const matchesSearch = internSearch === '' ||
      applicant?.name.toLowerCase().includes(internSearch.toLowerCase()) ||
      applicant?.jobTitle.toLowerCase().includes(internSearch.toLowerCase());
    return isCurrent && matchesSearch;
  });

  // Set application status
  const updateAppStatus = (id: string, status: string) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status } : app
    ));
    addNotification(`Application status set to ${status}`, 'success');
  };

  // View details of selected application
  const selectedApp = selectedAppId
    ? applications.find(app => app.id === selectedAppId)
    : null;
  const selectedApplicant = selectedApp ? dummyApplicants[selectedApp.studentId] : null;
  const selectedInternship = selectedApp
    ? companyInternships.find(i => i.id === selectedApp.internshipId)
    : null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Applicants</h1>
          <p className="text-gray-600">Review and respond to internship applications</p>
        </div>
        <Button leftIcon={<Download size={18} />} variant="outline">
          Export Data
        </Button>
      </div>
      {/* Search & Filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Input
            placeholder="Search applicants, positions, or names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="md:col-span-3">
          <Select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            options={[
              { value: '', label: 'All Positions' },
              ...companyInternships.map(internship => ({ value: internship.id, label: internship.title }))
            ]}
          />
        </div>
        <div className="md:col-span-3">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
        <div className="md:col-span-1 flex items-center justify-center">
          <button
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            title="More filters"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>
      {/* Applicants List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Applications" />
            <CardContent>
              {filteredApplications.length > 0 ? (
                <div className="space-y-4">
                  {filteredApplications.map(application => {
                    const internship = companyInternships.find(i => i.id === application.internshipId);
                    const applicant = dummyApplicants[application.studentId];
                    const statusColors = {
                      pending: 'bg-yellow-100 text-yellow-800',
                      accepted: 'bg-green-100 text-green-800',
                      rejected: 'bg-red-100 text-red-800',
                      finalized: 'bg-blue-100 text-blue-800',
                      current: 'bg-purple-100 text-purple-800',
                      complete: 'bg-gray-100 text-gray-800',
                    };
                    return (
                      <div key={application.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                          <img src={applicant.photo} alt={applicant.name} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <div className="font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-xs text-gray-500">{internship?.title}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[application.status as keyof typeof statusColors]}`}>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                          <Button size="sm" variant="outline" onClick={() => setSelectedAppId(application.id)}>
                            View
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No applications found.</div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Application Details */}
        <div className="space-y-6">
          {selectedApp && selectedApplicant && selectedInternship && (
            <Card>
              <CardHeader title="Applicant Details" />
              <CardContent>
                <div className="flex flex-col items-center">
                  <img src={selectedApplicant.photo} alt={selectedApplicant.name} className="h-20 w-20 rounded-full object-cover mb-3" />
                  <h3 className="text-lg font-bold text-gray-900">{selectedApplicant.name}</h3>
                  <div className="text-gray-600 mb-2">{selectedApplicant.major}</div>
                  <div className="text-gray-500 text-sm mb-2">{selectedApplicant.email} | {selectedApplicant.phone}</div>
                  <div className="mb-2"><strong>Applied for:</strong> {selectedInternship.title}</div>
                  <div className="mb-2"><strong>Status:</strong> {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}</div>
                  <div className="mb-2"><strong>Cover Letter:</strong> <div className="text-gray-700 mt-1">{selectedApp.coverLetter}</div></div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button size="sm" variant="outline" leftIcon={<Eye size={16} />} onClick={() => addNotification('Resume would open in a real application', 'info')}>View Resume</Button>
                    <Button size="sm" variant="outline" leftIcon={<Mail size={16} />}>Contact</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button size="sm" variant="primary" onClick={() => updateAppStatus(selectedApp.id, 'finalized')}>Set as Finalized</Button>
                    <Button size="sm" variant="success" onClick={() => updateAppStatus(selectedApp.id, 'accepted')}>Accept</Button>
                    <Button size="sm" variant="danger" onClick={() => updateAppStatus(selectedApp.id, 'rejected')}>Reject</Button>
                    <Button size="sm" variant="outline" onClick={() => updateAppStatus(selectedApp.id, 'current')}>Set as Current Intern</Button>
                    <Button size="sm" variant="outline" onClick={() => updateAppStatus(selectedApp.id, 'complete')}>Set as Internship Complete</Button>
                  </div>
                  <Button size="sm" variant="outline" className="mt-4" onClick={() => setSelectedAppId(null)}>Close</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {/* Interns Section */}
      <div className="mt-10">
        <Card>
          <CardHeader
            title="My Interns"
            subtitle="View and filter your current and completed interns"
            action={
              <div className="flex gap-2">
                <Button size="sm" variant={internTab === 'current' ? 'primary' : 'outline'} onClick={() => setInternTab('current')}>Current Interns</Button>
                <Button size="sm" variant={internTab === 'complete' ? 'primary' : 'outline'} onClick={() => setInternTab('complete')}>Internship Complete</Button>
              </div>
            }
          />
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by name or job title..."
                value={internSearch}
                onChange={e => setInternSearch(e.target.value)}
              />
            </div>
            {filteredInterns.length > 0 ? (
              <div className="space-y-4">
                {filteredInterns.map(app => {
                  const applicant = dummyApplicants[app.studentId];
                  const internship = companyInternships.find(i => i.id === app.internshipId);
                  return (
                    <div key={app.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img src={applicant.photo} alt={applicant.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <div className="font-medium text-gray-900">{applicant.name}</div>
                          <div className="text-xs text-gray-500">{internship?.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">{app.status === 'current' ? 'Current Intern' : 'Internship Complete'}</span>
                        <Button size="sm" variant="outline" onClick={() => setSelectedAppId(app.id)}>
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No interns found.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageApplicants;