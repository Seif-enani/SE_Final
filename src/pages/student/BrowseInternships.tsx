import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, Clock, Filter } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyInternships } from '../../data/internships';

const BrowseInternships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    duration: ''
  });
  
  // Filter internships based on search and filters
  const filteredInternships = dummyInternships.filter(internship => {
    if (internship.status !== 'approved') return false;
    
    const matchesSearch = searchTerm === '' || 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = filters.department === '' || 
      internship.department === filters.department;
      
    const matchesType = filters.type === '' || 
      internship.type === filters.type;
      
    const matchesDuration = filters.duration === '' || 
      (filters.duration === 'short' && internship.duration <= 8) ||
      (filters.duration === 'medium' && internship.duration > 8 && internship.duration <= 12) ||
      (filters.duration === 'long' && internship.duration > 12);
      
    return matchesSearch && matchesDepartment && matchesType && matchesDuration;
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Internships</h1>
        <p className="text-gray-600">Find and apply for internship opportunities</p>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 relative">
          <Input
            placeholder="Search for internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="md:col-span-2">
          <Select 
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            placeholder="Department"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Business Analytics">Business Analytics</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </Select>
        </div>
        
        <div className="md:col-span-2">
          <Select 
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            placeholder="Type"
          >
            <option value="">All Types</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </Select>
        </div>
        
        <div className="md:col-span-2">
          <Select 
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            placeholder="Duration"
          >
            <option value="">Any Duration</option>
            <option value="short">Short (≤ 8 weeks)</option>
            <option value="medium">Medium (9-12 weeks)</option>
            <option value="long">Long (&gt; 12 weeks)</option>
          </Select>
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
                      EGP {internship.stipend}/month
                    </span>
                  </div>
                  
                  <Link to={`/student/internship/${internship.id}`}>
                    <Button variant="primary" fullWidth>
                      View Details
                    </Button>
                  </Link>
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