import React from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import { Mail, Bell } from 'lucide-react';

const dummyNotifications = [
  {
    id: 1,
    type: 'system',
    message: 'You received a new application for Software Engineering Intern.',
    timestamp: '2024-06-01 10:15',
  },
  {
    id: 2,
    type: 'email',
    message: 'Your application for Mobile App Development Intern has been accepted.',
    timestamp: '2024-06-01 09:00',
  },
  {
    id: 3,
    type: 'email',
    message: 'Your application for QA Tester Intern has been rejected.',
    timestamp: '2024-05-31 18:30',
  },
  {
    id: 4,
    type: 'system',
    message: 'You received a new application for Frontend Developer Intern.',
    timestamp: '2024-05-31 15:20',
  },
];

const Notifications = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">View your latest system and email notifications</p>
      </div>
      <div className="space-y-4">
        {dummyNotifications.map((notif) => (
          <Card key={notif.id}>
            <CardContent className="flex items-center space-x-4">
              <div>
                {notif.type === 'email' ? (
                  <Mail className="text-blue-500" size={24} />
                ) : (
                  <Bell className="text-yellow-500" size={24} />
                )}
              </div>
              <div className="flex-1">
                <div className="text-gray-900">{notif.message}</div>
                <div className="text-xs text-gray-500 mt-1">{notif.timestamp}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications; 