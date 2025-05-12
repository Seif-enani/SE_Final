import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, Clock, Filter, Users, DollarSign } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyInternships } from '../../data/internships';

// Dummy suggested companies (in real app, use recommendations based on jobInterests, industry, etc.)
const suggestedCompanies = [
  { id: 'c1', name: 'TechCorp Solutions', industry: 'Engineering', reason: 'Matches your job interests' },
  { id: 'c2', name: 'FinBank International', industry: 'Finance', reason: 'Recommended by past interns' },
];

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business Analytics', label: 'Business Analytics' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
];
const durationOptions = [
  { value: '', label: 'Any Duration' },
  { value: 'short', label: 'Short (≤ 8 weeks)' },
  { value: 'medium', label: 'Medium (9-12 weeks)' },
  { value: 'long', label: 'Long (> 12 weeks)' },
];
const paidOptions = [
  { value: '', label: 'Paid or Unpaid' },
  { value: 'paid', label: 'Paid' },
  { value: 'unpaid', label: 'Unpaid' },
];

const BrowseInternships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    paid: '',
  });
  
  // Filter internships based on search and filters
  const filteredInternships = dummyInternships.filter(internship => {
    if (internship.status !== 'approved') return false;
    
    const matchesSearch = searchTerm === '' || 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.companyId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesIndustry = filters.industry === '' || internship.department === filters.industry;
      
    const matchesDuration = filters.duration === '' || 
      (filters.duration === 'short' && internship.duration <= 8) ||
      (filters.duration === 'medium' && internship.duration > 8 && internship.duration <= 12) ||
      (filters.duration === 'long' && internship.duration > 12);
      
    const matchesPaid = filters.paid === '' || 
      (filters.paid === 'paid' && internship.stipend > 0) ||
      (filters.paid === 'unpaid' && internship.stipend === 0);
      
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  useEffect(() => {
    // Simulate notification logic for new cycle
    // In a real app, this would push to a notification context or API
    // For now, notifications are static dummy data in StudentNotifications.tsx
  }, []);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Internships</h1>
        <p className="text-gray-600">Find and apply for internship opportunities</p>
      </div>
      
      {/* Suggested Companies */}
      <div className="mb-8">
        <Card>
          <CardHeader title="Suggested Companies" subtitle="Based on your interests and recommendations" />
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {suggestedCompanies.map(company => (
                <div key={company.id} className="p-4 border rounded-lg bg-gray-50 min-w-[220px]">
                  <div className="font-semibold text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-600">Industry: {company.industry}</div>
                  <div className="text-xs text-blue-600 mt-1">{company.reason}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 relative">
          <Input
            placeholder="Search by job title or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="md:col-span-2">
          <Select 
            name="industry"
            value={filters.industry}
            onChange={handleFilterChange}
            options={industryOptions}
          />
        </div>
        
        <div className="md:col-span-2">
          <Select 
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            options={durationOptions}
          />
        </div>
        
        <div className="md:col-span-2">
          <Select 
            name="paid"
            value={filters.paid}
            onChange={handleFilterChange}
            options={paidOptions}
          />
        </div>
      </div>
      
      {/* Internship Listings */}
      <div className="space-y-6">
        {filteredInternships.length > 0 ? (
          filteredInternships.map(internship => (
            <Card key={internship.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900">{internship.title}</h2>
                  <p className="text-gray-600 mb-4">{internship.companyId === 'c1' ? 'TechCorp Solutions' : 'FinBank International'}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase size={16} className="mr-1" />
                      <span>{internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{internship.duration} weeks</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-1" />
                      <span>{internship.stipend > 0 ? `EGP ${internship.stipend}/month` : 'Unpaid'}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {internship.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {internship.requirements.slice(0, 3).map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {req.length > 25 ? req.substring(0, 25) + '...' : req}
                      </span>
                    ))}
                    {internship.requirements.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{internship.requirements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6 md:border-l border-gray-100 flex flex-col justify-between">
                  <div className="text-right mb-4">
                    <span className="text-green-600 font-medium">
                      {internship.stipend > 0 ? `EGP ${internship.stipend}/month` : 'Unpaid'}
                    </span>
                  </div>
                  
                  <Link to={`/student/internship/${internship.id}`}>
                    <Button variant="primary" fullWidth>
                      View Details
                    </Button>
                  </Link>
                  <Button variant="success" fullWidth className="mt-2">
                    Apply
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matching internships found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseInternships;