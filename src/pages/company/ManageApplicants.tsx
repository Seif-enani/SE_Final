import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Download, FileText, 
  Eye, CheckCircle, XCircle, UserCheck, 
  Mail, Briefcase, Calendar, MapPin 
} from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyApplications, dummyInternships } from '../../data/internships';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Company } from '../../types/user';

const ManageApplicants = () => {
  const { currentUser } = useAuth();
  const company = currentUser as Company;
  const { addNotification } = useNotification();
  
  // Assuming the current company has ID 'c1'
  const companyId = company?.id || 'c1';
  
  // Get company's internships
  const companyInternships = dummyInternships.filter(internship => 
    internship.companyId === companyId
  );
  
  // Get applications for company's internships
  const companyApplications = dummyApplications.filter(application => 
    companyInternships.some(internship => internship.id === application.internshipId)
  );
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  
  // Filter applications based on search and filters
  const filteredApplications = companyApplications.filter(application => {
    const internship = companyInternships.find(i => i.id === application.internshipId);
    if (!internship) return false;
    
    const matchesSearch = searchTerm === '' || 
      application.coverLetter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.title.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === '' || application.status === statusFilter;
    
    const matchesPosition = positionFilter === '' || internship.id === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });
  
  const handleAccept = (applicationId: string) => {
    // In a real app, this would make an API call to update the application status
    addNotification('Application accepted successfully', 'success');
    // Then would refresh the data
  };
  
  const handleReject = (applicationId: string) => {
    // In a real app, this would make an API call to update the application status
    addNotification('Application rejected', 'success');
    // Then would refresh the data
  };
  
  const handleViewResume = (resumeUrl: string) => {
    // In a real app, this would open the resume in a new tab or modal
    addNotification('Resume would open in a real application', 'info');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Applicants</h1>
          <p className="text-gray-600">Review and respond to internship applications</p>
        </div>
        <Button 
          leftIcon={<Download size={18} />}
          variant="outline"
        >
          Export Data
        </Button>
      </div>
      
      {/* Search & Filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Input
            placeholder="Search applicants or positions..."
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
            placeholder="Filter by Position"
          >
            <option value="">All Positions</option>
            {companyInternships.map(internship => (
              <option key={internship.id} value={internship.id}>
                {internship.title}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="md:col-span-3">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by Status"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </Select>
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
      {filteredApplications.length > 0 ? (
        <div className="space-y-6">
          {filteredApplications.map(application => {
            const internship = companyInternships.find(i => i.id === application.internshipId);
            if (!internship) return null;
            
            const statusColors = {
              pending: 'bg-yellow-100 text-yellow-800',
              accepted: 'bg-green-100 text-green-800',
              rejected: 'bg-red-100 text-red-800',
              withdrawn: 'bg-gray-100 text-gray-800',
            };
            
            // In a real app, this would fetch the student data
            const studentName = application.studentId === 's1' ? 'Ahmed Mohamed' : 'Sara Ali';
            const studentPhoto = application.studentId === 's1' 
              ? 'https://randomuser.me/api/portraits/men/1.jpg'
              : 'https://randomuser.me/api/portraits/women/2.jpg';
            const studentMajor = application.studentId === 's1' ? 'Computer Science' : 'Business Informatics';
            
            return (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="md:flex justify-between items-start">
                    {/* Applicant Info */}
                    <div className="flex items-start mb-4 md:mb-0">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={studentPhoto} 
                          alt={studentName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">{studentName}</h3>
                        <p className="text-gray-600">{studentMajor}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full flex items-center ${statusColors[application.status as keyof typeof statusColors]}`}>
                            {application.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {application.status === 'accepted' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {application.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                            {application.status === 'withdrawn' && <UserCheck className="h-3 w-3 mr-1" />}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Position Info */}
                    <div className="bg-gray-50 px-4 py-3 rounded-md">
                      <h4 className="font-medium text-gray-900">
                        <Link to={`/company/internships/${internship.id}`} className="hover:text-blue-600">
                          {internship.title}
                        </Link>
                      </h4>
                      <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1 space-x-4">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {internship.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Application Cover Letter */}
                  <div className="mt-4 bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
                    <p className="text-gray-700">
                      {application.coverLetter.length > 200 
                        ? `${application.coverLetter.substring(0, 200)}...` 
                        : application.coverLetter
                      }
                    </p>
                    {application.coverLetter.length > 200 && (
                      <button className="text-blue-600 mt-2 text-sm font-medium hover:text-blue-800">
                        Read full letter
                      </button>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<Eye size={16} />}
                        onClick={() => handleViewResume(application.resumeUrl)}
                      >
                        View Resume
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<Mail size={16} />}
                      >
                        Contact
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<FileText size={16} />}
                      >
                        Notes
                      </Button>
                    </div>
                    
                    {application.status === 'pending' && (
                      <div className="flex space-x-3 mt-3 md:mt-0">
                        <Button
                          size="sm"
                          variant="primary"
                          leftIcon={<CheckCircle size={16} />}
                          onClick={() => handleAccept(application.id)}
                        >
                          Accept
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="danger"
                          leftIcon={<XCircle size={16} />}
                          onClick={() => handleReject(application.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-10">
              <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
              <p className="text-gray-600 mb-4">
                {companyApplications.length === 0 
                  ? "You don't have any applications yet" 
                  : "No applications match your search criteria"
                }
              </p>
              {companyInternships.length > 0 ? (
                <Link to="/company/internships">
                  <Button variant="outline">
                    Manage Internships
                  </Button>
                </Link>
              ) : (
                <Link to="/company/post-internship">
                  <Button variant="primary">
                    Post an Internship
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageApplicants;