import React from 'react';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const SupportPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Help & Support</h1>
      <p className="text-gray-600">How can we assist you?</p>
    </div>
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <HelpCircle size={24} className="text-blue-600 mr-2" />
          <p className="text-gray-700">
            Check our <Link to="/faq" className="text-blue-600">FAQ</Link> for common questions.
          </p>
        </div>
        <div>
          <h2 className="font-medium">Still need help?</h2>
          <p className="text-gray-600">
            Email us at{' '}
            <a href="mailto:support@guc-internships.edu" className="text-blue-600">
              support@guc-internships.edu
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SupportPage;