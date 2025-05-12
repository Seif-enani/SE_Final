import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, Clock, Filter, Users } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyInternships, dummyApplications } from '../../data/internships';
import { useAuth } from '../../context/AuthContext';

const BrowseInternships = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    duration: ''
  });
  const [showMineOnly, setShowMineOnly] = useState(false);

  // Filter internships based on search and filters
  const filteredInternships = dummyInternships.filter(internship => {
    if (internship.status !== 'approved') return false;
    if (showMineOnly && currentUser) {
      if (internship.companyId !== currentUser.id) return false;
    }
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
        <p className="text-gray-600">View all available internships and see how many applications each has received.</p>
      </div>
      {/* Show Mine Only Toggle */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="showMineOnly"
          checked={showMineOnly}
          onChange={() => setShowMineOnly(v => !v)}
          className="mr-2"
        />
        <label htmlFor="showMineOnly" className="text-sm text-gray-700">Show only my posts</label>
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
            options={[
              { value: '', label: 'All Departments' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Business Analytics', label: 'Business Analytics' },
              { value: 'Mobile Development', label: 'Mobile Development' },
              { value: 'Marketing', label: 'Marketing' },
              { value: 'Finance', label: 'Finance' },
            ]}
          />
        </div>
        <div className="md:col-span-2">
          <Select 
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            options={[
              { value: '', label: 'All Types' },
              { value: 'remote', label: 'Remote' },
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'onsite', label: 'Onsite' },
            ]}
          />
        </div>
        <div className="md:col-span-2">
          <Select 
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            options={[
              { value: '', label: 'Any Duration' },
              { value: 'short', label: 'Short (≤ 8 weeks)' },
              { value: 'medium', label: 'Medium (9-12 weeks)' },
              { value: 'long', label: 'Long (> 12 weeks)' },
            ]}
          />
        </div>
      </div>
      {/* Internship Listings */}
      <div className="space-y-6">
        {filteredInternships.length > 0 ? (
          filteredInternships.map(internship => {
            const applicationsCount = dummyApplications.filter(app => app.internshipId === internship.id).length;
            return (
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
                        <Users size={16} className="mr-1" />
                        <span>{applicationsCount} Applications</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {internship.description}
                    </p>
                  </div>
                  <div className="p-6 md:border-l border-gray-100 flex flex-col justify-between">
                    <div className="text-right mb-4">
                      <span className="text-green-600 font-medium">
                        EGP {internship.stipend}/month
                      </span>
                    </div>
                    <Link to={`/company/internships/${internship.id}`}>
                      <Button variant="primary" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })
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