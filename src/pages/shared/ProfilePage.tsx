import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center space-y-4">
          <img
            src={currentUser.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg'}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <h2 className="text-lg font-medium text-gray-900">{currentUser.name}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
          <p className="text-sm text-gray-500 capitalize">Role: {currentUser.role.replace('_', ' ').toLowerCase()}</p>
          <Link to="/settings" className="w-full">
            <Button fullWidth variant="outline">
              Edit Profile Settings
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;