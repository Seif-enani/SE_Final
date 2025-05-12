import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, Clock, Calendar, DollarSign, 
  Building2, ArrowLeft 
} from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';

const SCADInternshipDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const internship = dummyInternships.find(i => i.id === id);

  if (!internship) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Internship Not Found</h2>
        <p className="text-gray-600 mb-6">The internship you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" onClick={() => navigate('/scad/internships')}>
          Back to Internships
        </Button>
      </div>
    );
  }

  // Get company name
  const company = dummyUsers.find(u => u.id === internship.companyId && u.role === UserRole.COMPANY);
  const companyName = company?.companyName || company?.name || 'Unknown Company';

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/scad/internships')} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
          <p className="text-gray-600">{companyName}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Internship Details" />
            <CardContent>
              <div className="prose max-w-none">
                <p>{internship.description}</p>
                <h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {internship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="About the Company" />
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  {companyName === 'TechCorp Solutions' 
                    ? 'TechCorp Solutions is a leading technology company specializing in software solutions across multiple industries. With a focus on innovation and user experience, we develop cutting-edge applications for clients worldwide.' 
                    : 'FinBank International is one of the largest financial institutions in the region, providing a wide range of banking and financial services. Our technology department works on innovative solutions for digital banking and financial analytics.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Building2 className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Department: {internship.department}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Location: {internship.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Type: {internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Duration: {internship.duration} weeks</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Period: {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Stipend: {internship.stipend > 0 ? `EGP ${internship.stipend}/month` : 'Unpaid'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SCADInternshipDetails; 