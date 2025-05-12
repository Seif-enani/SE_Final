import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Briefcase, Users, ArrowRight } from 'lucide-react';

const ForCompaniesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">For Companies</h1>
      <p className="text-gray-700 mb-8">
        Post and manage internship opportunities, review applications and connect with talented GUC students.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-blue-600 mb-4"><Briefcase size={48} /></div>
          <h2 className="text-2xl font-semibold mb-2">Post Internships</h2>
          <p className="text-gray-600">Create new internship listings and track their status.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-green-600 mb-4"><Users size={48} /></div>
          <h2 className="text-2xl font-semibold mb-2">Review Applications</h2>
          <p className="text-gray-600">View, accept or reject student applications.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <Link to="/company/post-internship">
            <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForCompaniesPage;