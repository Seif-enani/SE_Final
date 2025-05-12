import React, { useState } from 'react';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [themeDark, setThemeDark] = useState(false);

  const handleSave = () => {
    // placeholder save
    alert('Settings saved (mock)');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your preferences</p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium">Email Notifications</h2>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="h-5 w-5"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium">Dark Mode</h2>
              <p className="text-sm text-gray-500">Enable dark theme</p>
            </div>
            <input
              type="checkbox"
              checked={themeDark}
              onChange={() => setThemeDark(!themeDark)}
              className="h-5 w-5"
            />
          </div>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;