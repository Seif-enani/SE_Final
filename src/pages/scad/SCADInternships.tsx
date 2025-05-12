import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  Clock, 
  Building2, 
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { useNotification } from '../../context/NotificationContext';

const SCADInternships = () => {
  const { addNotification } = useNotification();
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  
  // Get companies for filter
  const companies = dummyUsers
    .filter(user => user.role === UserRole.COMPANY)
    .map(company => ({ 
      id: company.id, 
      name: company.companyName || company.name 
    }));

  // Filter internships based on search and filters
  const filteredInternships = dummyInternships.filter(internship => {
    const matchesSearch = searchTerm === '' || 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === '' || internship.status === statusFilter;
    const matchesCompany = companyFilter === '' || internship.companyId === companyFilter;
    
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const handleApproveInternship = (internshipId: string) => {
    // In a real application, this would make an API call to approve the internship
    addNotification('Internship successfully approved', 'success');
  };

  const handleRejectInternship = (internshipId: string) => {
    // In a real application, this would make an API call to reject the internship
    addNotification('Internship rejected', 'success');
  };

  // Get company name by company ID
  const getCompanyName = (companyId: string) => {
    const company = dummyUsers.find(u => u.id === companyId && u.role === UserRole.COMPANY);
    return company?.companyName || company?.name || 'Unknown Company';
  };

  // Calculate remaining days for internships
  const getRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Internships</h1>
          <p className="text-gray-600">Review and approve internship postings</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={18} />}>
          Export Data
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 relative">
          <Input
            placeholder="Search internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="md:w-48">
          <Select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            placeholder="All Companies"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="md:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="All Statuses"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="closed">Closed</option>
            <option value="completed">Completed</option>
          </Select>
        </div>
      </div>

      {/* Internship Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="font-medium text-lg">
              {dummyInternships.filter(i => i.status === 'pending').length}
            </p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Approved</p>
            <p className="font-medium text-lg">
              {dummyInternships.filter(i => i.status === 'approved').length}
            </p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
            <XCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="font-medium text-lg">
              {dummyInternships.filter(i => i.status === 'rejected').length}
            </p>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Applicants</p>
            <p className="font-medium text-lg">
              {dummyInternships.reduce((sum, i) => sum + i.applicantsCount, 0)}
            </p>
          </div>
        </Card>
      </div>

      {/* Internships List */}
      {filteredInternships.length > 0 ? (
        <div className="space-y-6">
          {filteredInternships.map((internship) => {
            const companyName = getCompanyName(internship.companyId);
            const remainingDays = getRemainingDays(internship.endDate);
            const statusColors = {
              draft: 'bg-gray-100 text-gray-800',
              pending: 'bg-yellow-100 text-yellow-800',
              approved: 'bg-green-100 text-green-800',
              rejected: 'bg-red-100 text-red-800',
              closed: 'bg-purple-100 text-purple-800',
              completed: 'bg-blue-100 text-blue-800',
            };
            
            return (
              <Card key={internship.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="md:flex justify-between">
                    {/* Internship Info */}
                    <div className="mb-4 md:mb-0 md:w-3/5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-lg text-gray-900">{internship.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[internship.status as keyof typeof statusColors]}`}>
                          {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <Building2 size={16} className="mr-2" />
                        <span>{companyName}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                        <div className="flex items-center">
                          <MapPin size={14} className="text-gray-400 mr-1" />
                          <span>{internship.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase size={14} className="text-gray-400 mr-1" />
                          <span>{internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="text-gray-400 mr-1" />
                          <span>{internship.duration} weeks</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span>{new Date(internship.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span>{new Date(internship.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={14} className="text-gray-400 mr-1" />
                          <span>{internship.stipend} EGP/month</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{internship.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {internship.requirements.slice(0, 3).map((req, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            {req.length > 30 ? req.substring(0, 30) + '...' : req}
                          </span>
                        ))}
                        {internship.requirements.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            +{internship.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Stats & Actions */}
                    <div className="md:w-2/5 md:pl-6 md:border-l md:border-gray-100 md:flex md:flex-col md:justify-between">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Department:</span>
                          <span className="text-sm font-medium text-gray-700">{internship.department}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Applicants:</span>
                          <span className="text-sm font-medium text-gray-700">{internship.applicantsCount}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Posted:</span>
                          <span className="text-sm font-medium text-gray-700">{new Date(internship.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Eye size={16} />}
                          fullWidth
                        >
                          View Details
                        </Button>
                        
                        {internship.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              leftIcon={<CheckCircle size={16} />}
                              onClick={() => handleApproveInternship(internship.id)}
                              fullWidth
                            >
                              Approve
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="danger"
                              leftIcon={<XCircle size={16} />}
                              onClick={() => handleRejectInternship(internship.id)}
                              fullWidth
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
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
                <Briefcase className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
              <p className="text-gray-600 mb-4">
                {dummyInternships.length === 0 
                  ? "There are no internships posted yet" 
                  : "No internships match your search criteria"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SCADInternships;