import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyUsers } from '../../data/users';
import { UserRole, Company } from '../../types/user';
import { dummyInternships } from '../../data/internships';
import { useNotification } from '../../context/NotificationContext';

const SCADCompanies = () => {
  const { addNotification } = useNotification();
  
  // Get companies from dummy data
  const companies = dummyUsers.filter(user => user.role === UserRole.COMPANY) as Company[];
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Get unique industries for filter
  const industries = Array.from(new Set(companies.map(company => company.industry)));

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesIndustry = industryFilter === '' || company.industry === industryFilter;
    const matchesStatus = statusFilter === '' || 
      (statusFilter === 'verified' && company.verified) ||
      (statusFilter === 'pending' && !company.verified);
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const handleVerifyCompany = (companyId: string) => {
    // In a real application, this would make an API call to verify the company
    addNotification('Company successfully verified', 'success');
  };

  const handleRejectCompany = (companyId: string) => {
    // In a real application, this would make an API call to reject the company
    addNotification('Company verification rejected', 'success');
  };

  // Get internship counts for each company
  const getInternshipCount = (companyId: string) => {
    return dummyInternships.filter(internship => internship.companyId === companyId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Companies</h1>
          <p className="text-gray-600">View and manage registered companies</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={18} />}>
          Export Data
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 relative">
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="md:w-48">
          <Select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            placeholder="All Industries"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
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
            <option value="verified">Verified</option>
            <option value="pending">Pending Verification</option>
          </Select>
        </div>
      </div>

      {/* Companies List */}
      {filteredCompanies.length > 0 ? (
        <div className="space-y-6">
          {filteredCompanies.map((company) => {
            const internshipCount = getInternshipCount(company.id);
            
            return (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="md:flex justify-between">
                    {/* Company Info */}
                    <div className="flex items-start mb-4 md:mb-0">
                      <div className="h-16 w-16 rounded-md overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
                        {company.companyLogo ? (
                          <img 
                            src={company.companyLogo} 
                            alt={company.companyName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Building2 size={32} className="text-gray-400" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">{company.companyName}</h3>
                        <p className="text-gray-600">{company.industry}</p>
                        <div className="flex items-center mt-2">
                          {company.verified ? (
                            <div className="flex items-center text-green-600 text-sm">
                              <CheckCircle size={14} className="mr-1" />
                              <span>Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-yellow-600 text-sm">
                              <Filter size={14} className="mr-1" />
                              <span>Pending Verification</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Company Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{company.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{company.size}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Globe size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{company.website}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Briefcase size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {internshipCount} {internshipCount === 1 ? 'Internship' : 'Internships'}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">
                          Joined {new Date(company.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex mt-4 md:mt-0 md:flex-col md:justify-between items-end">
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<Eye size={16} />}
                        className="mr-2 md:mr-0 md:mb-2"
                      >
                        View Details
                      </Button>
                      
                      {!company.verified && (
                        <div className="flex space-x-2 md:space-x-0 md:space-y-2">
                          <Button
                            size="sm"
                            variant="primary"
                            leftIcon={<CheckCircle size={16} />}
                            onClick={() => handleVerifyCompany(company.id)}
                          >
                            Verify
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="danger"
                            leftIcon={<XCircle size={16} />}
                            onClick={() => handleRejectCompany(company.id)}
                            className="md:mt-2"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Company Description */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600 line-clamp-2">{company.description}</div>
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
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600 mb-4">
                {companies.length === 0 
                  ? "There are no registered companies yet" 
                  : "No companies match your search criteria"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SCADCompanies;