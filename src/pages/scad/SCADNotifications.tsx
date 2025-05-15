import React from 'react';
import Card, { CardContent } from '../../components/common/Card';
import { Mail, Bell } from 'lucide-react';

const dummySCADNotifications = [
  {
    id: 1,
    type: 'company',
    message: 'A new company has applied to post internships. Review their application now.',
    timestamp: '2025-05-15 09:00',
  },
  {
    id: 2,
    type: 'student',
    message: 'A student has submitted a new internship report. Please review it.',
    timestamp: '2025-05-15 09:30',
  },
  {
    id: 3,
    type: 'appointment',
    message: 'A student has accepted your appointment request. Check the schedule for details.',
    timestamp: '2025-05-15 10:00',
  },
  {
    id: 4,
    type: 'call',
    message: 'Incoming call from a student. Please join the meeting room.',
    timestamp: '2025-05-15 11:05',
  },
];

const SCADNotifications = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Stay up to date with company applications, student reports, and appointments</p>
      </div>
      <div className="space-y-4">
        {dummySCADNotifications.map((notif) => (
          <Card key={notif.id}>
            <CardContent className="flex items-center space-x-4">
              <div>
                {notif.type === 'company' && (
                  <Bell className="text-blue-500" size={24} />
                )}
                {notif.type === 'student' && (
                  <Mail className="text-green-500" size={24} />
                )}
                {notif.type === 'appointment' && (
                  <Bell className="text-yellow-500" size={24} />
                )}
                {notif.type === 'call' && (
                  <Bell className="text-red-500" size={24} />
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

export default SCADNotifications;
