import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyInternships } from '../../data/internships';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import { Input, Textarea, RadioGroup } from '../../components/common/FormElements';
import Button from '../../components/common/Button';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  const internship = dummyInternships.find(i => i.id === id && i.companyId === currentUser?.id);

  const [formData, setFormData] = useState(
    internship ? {
      title: internship.title,
      department: internship.department,
      description: internship.description,
      requirements: [...internship.requirements],
      location: internship.location,
      type: internship.type,
      duration: internship.duration,
      startDate: internship.startDate,
      endDate: internship.endDate,
      stipend: internship.stipend,
    } : null
  );

  if (!internship || !formData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Internship Not Found</h2>
        <p className="text-gray-600 mb-6">The internship you're trying to edit doesn't exist or does not belong to your company.</p>
        <Button variant="outline" onClick={() => navigate('/company/internships')}>
          Back to Manage Internships
        </Button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, type: e.target.value as 'remote' | 'onsite' | 'hybrid' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate API update
    addNotification('Internship updated successfully!', 'success');
    navigate('/company/internships');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Internship</h1>
        <p className="text-gray-600">Update the details of your internship opportunity</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader title="Internship Details" />
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Internship Title"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Department"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Location"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <RadioGroup
                    label="Internship Type"
                    name="type"
                    value={formData.type}
                    onChange={handleRadioChange}
                    options={[
                      { value: 'remote', label: 'Remote' },
                      { value: 'onsite', label: 'On-site' },
                      { value: 'hybrid', label: 'Hybrid' },
                    ]}
                    inline
                  />
                  <Textarea
                    label="Description"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader 
                title="Requirements" 
                subtitle="List the qualifications and skills required for this internship"
              />
              <CardContent>
                <div className="space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <Input
                        id={`requirement-${index}`}
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        placeholder="e.g. Knowledge of JavaScript"
                        className="flex-1"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Requirement
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Side Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader title="Duration & Compensation" />
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Duration (weeks)"
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      label="Start Date"
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="End Date"
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    label="Monthly Stipend (EGP)"
                    id="stipend"
                    name="stipend"
                    type="number"
                    value={formData.stipend}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Actions" />
              <CardContent>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    leftIcon={<Save size={18} />}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    leftIcon={<X size={18} />}
                    onClick={() => navigate('/company/internships')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInternship; 