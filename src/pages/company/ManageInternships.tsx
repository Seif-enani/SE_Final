import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, Search, Filter, Plus, ExternalLink } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyInternships } from '../../data/internships';
import { useNotification } from '../../context/NotificationContext';

const ManageInternships = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  // Assuming the current company has ID 'c1'
  const companyId = 'c1';
  
  // Filter internships for this company
  const companyInternships = dummyInternships.filter(internship => internship.companyId === companyId);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Filter internships based on search and filters
  const filteredInternships = companyInternships.filter(internship => {
    const matchesSearch = searchTerm === '' || 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.department.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === '' || internship.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (internshipId: string) => {
    // In a real app, this would make an API call to delete the internship
    addNotification('Internship deleted successfully', 'success');
    // Then would refresh the data
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Internships</h1>
          <p className="text-gray-600">View and manage all your posted internship opportunities</p>
        </div>
        <Link to="/company/post-internship">
          <Button leftIcon={<Plus size={18} />}>
            Post New Internship
          </Button>
        </Link>
      </div>
      
      {/* Search & Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by Status"
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
      
      {/* Internships List */}
      {filteredInternships.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500">
            <div className="md:col-span-4">Internship</div>
            <div className="md:col-span-2">Department</div>
            <div className="md:col-span-2">Duration</div>
            <div className="md:col-span-2">Status</div>
            <div className="md:col-span-2 text-right">Actions</div>
          </div>
          
          {filteredInternships.map(internship => {
            const statusColors = {
              draft: 'bg-gray-100 text-gray-800',
              pending: 'bg-yellow-100 text-yellow-800',
              approved: 'bg-green-100 text-green-800',
              rejected: 'bg-red-100 text-red-800',
              closed: 'bg-purple-100 text-purple-800',
              completed: 'bg-blue-100 text-blue-800',
            };
            
            return (
              <div 
                key={internship.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="md:grid md:grid-cols-12 md:items-center gap-4">
                  <div className="md:col-span-4">
                    <h3 className="font-medium text-gray-900">{internship.title}</h3>
                    <p className="text-sm text-gray-500 md:hidden mt-1">Department: {internship.department}</p>
                    <p className="text-sm text-gray-500 md:hidden mt-1">Duration: {internship.duration} weeks</p>
                    <p className="text-sm text-gray-500 md:hidden mt-1">
                      Posted: {new Date(internship.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 hidden md:block">
                    {internship.department}
                  </div>
                  
                  <div className="md:col-span-2 hidden md:block">
                    {internship.duration} weeks
                  </div>
                  
                  <div className="md:col-span-2 mt-2 md:mt-0">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[internship.status as keyof typeof statusColors]}`}>
                      {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end items-center space-x-2 mt-3 md:mt-0">
                    <Link to={`/company/internships/${internship.id}/applicants`}>
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded" 
                        title="View Applicants"
                        disabled={internship.applicantsCount === 0}
                      >
                        <Eye size={18} className={internship.applicantsCount === 0 ? "text-gray-400" : ""} />
                      </button>
                    </Link>
                    
                    <Link to={`/company/internships/${internship.id}/edit`}>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                        title="Edit Internship"
                        disabled={['completed', 'closed'].includes(internship.status)}
                      >
                        <Edit size={18} className={['completed', 'closed'].includes(internship.status) ? "text-gray-400" : ""} />
                      </button>
                    </Link>
                    
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      onClick={() => handleDelete(internship.id)}
                      title="Delete Internship"
                      disabled={['approved', 'completed'].includes(internship.status)}
                    >
                      <Trash2 size={18} className={['approved', 'completed'].includes(internship.status) ? "text-gray-400" : ""} />
                    </button>
                    
                    <Link to={`/internships/${internship.id}`} target="_blank">
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                        title="View Public Listing"
                      >
                        <ExternalLink size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-3 md:hidden">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">Applicants:</span>
                    <span className="text-sm text-gray-700">{internship.applicantsCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-8">
              <div className="rounded-full bg-gray-100 p-4 inline-block mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
              <p className="text-gray-600 mb-4">
                {companyInternships.length === 0 
                  ? "You haven't posted any internships yet" 
                  : "No internships match your search criteria"
                }
              </p>
              {companyInternships.length === 0 && (
                <Link to="/company/post-internship">
                  <Button variant="primary" leftIcon={<Plus size={18} />}>
                    Post New Internship
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

export default ManageInternships;