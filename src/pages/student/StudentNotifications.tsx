import React from 'react';
import Card, { CardContent } from '../../components/common/Card';
import { Mail, Bell } from 'lucide-react';

const dummyStudentNotifications = [
  {
    id: 1,
    type: 'system',
    message: 'The new internship cycle (Summer 2024) has started! Browse new opportunities now.',
    timestamp: '2024-06-10 09:00',
  },
  {
    id: 2,
    type: 'system',
    message: 'The next internship cycle will begin in 7 days. Prepare your documents and update your profile.',
    timestamp: '2024-06-03 08:00',
  },
  {
    id: 3,
    type: 'email',
    message: 'Congratulations! You have been accepted for the Software Engineering Intern position at TechCorp Solutions.',
    timestamp: '2024-05-28 14:30',
  },
  {
    id: 4,
    type: 'email',
    message: 'Your application for Business Analyst Intern at FinBank International has been accepted.',
    timestamp: '2024-05-20 10:00',
  },
];

const StudentNotifications = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Stay up to date with your internship journey</p>
      </div>
      <div className="space-y-4">
        {dummyStudentNotifications.map((notif) => (
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

export default StudentNotifications; 