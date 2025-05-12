import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyInternships } from '../../data/internships';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const internship = dummyInternships.find(i => i.id === id && i.companyId === currentUser?.id);

  if (!internship) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Internship Not Found</h2>
        <p className="text-gray-600 mb-6">The internship you're looking for doesn't exist or does not belong to your company.</p>
        <Button variant="outline" onClick={() => navigate('/company/internships')}>
          Back to Manage Internships
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button variant="outline" onClick={() => navigate('/company/internships')} className="mr-4">
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
      </div>
      <Card>
        <CardHeader title="Internship Details" />
        <CardContent>
          <div className="space-y-2">
            <div><strong>Department:</strong> {internship.department}</div>
            <div><strong>Description:</strong> {internship.description}</div>
            <div><strong>Requirements:</strong>
              <ul className="list-disc pl-6">
                {internship.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
              </ul>
            </div>
            <div><strong>Location:</strong> {internship.location}</div>
            <div><strong>Type:</strong> {internship.type}</div>
            <div><strong>Duration:</strong> {internship.duration} weeks</div>
            <div><strong>Start Date:</strong> {internship.startDate}</div>
            <div><strong>End Date:</strong> {internship.endDate}</div>
            <div><strong>Stipend:</strong> {internship.stipend} EGP</div>
            <div><strong>Status:</strong> {internship.status}</div>
            <div><strong>Applicants:</strong> {internship.applicantsCount}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternshipDetails; 