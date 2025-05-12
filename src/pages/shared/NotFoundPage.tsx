import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Search } from 'lucide-react';

const NotFoundPage = () => (
  <div className="flex items-center justify-center h-full p-6">
    <Card className="max-w-md w-full">
      <CardContent className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Page Not Found</p>
        <p className="text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button variant="primary" leftIcon={<Search size={16} />}>
            Go to Homepage
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);

export default NotFoundPage;