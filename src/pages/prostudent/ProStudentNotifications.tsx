import React from 'react';
import Card, { CardContent } from '../../components/common/Card';
import { Mail, Bell } from 'lucide-react';

// Add more diverse notifications for prostudent
const dummyProStudentNotifications = [
	{
		id: 1,
		type: 'system',
		message:
			'The new internship cycle (Summer 2024) has started! Browse new opportunities now.',
		timestamp: '2024-06-10 09:00',
	},
	{
		id: 2,
		type: 'workshop',
		message:
			'Reminder: You are registered for the "Ace Your Interview" workshop on 2025-06-01.',
		timestamp: '2025-05-30 12:00',
	},
	{
		id: 3,
		type: 'assessment',
		message:
			'Your React Skills Assessment score is 92. You can now post it to your profile.',
		timestamp: '2025-05-28 15:00',
	},
	{
		id: 4,
		type: 'certificate',
		message:
			'You have received a Certificate of Attendance for the "Ace Your Interview" workshop.',
		timestamp: '2025-06-01 17:00',
	},
	{
		id: 5,
		type: 'chat',
		message: 'New message from attendee: "Great question in the workshop!"',
		timestamp: '2025-06-01 16:10',
	},
];

const ProStudentNotifications = () => {
	return (
		<div>
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
				<p className="text-gray-600">
					Stay up to date with your internship journey, workshops, and
					assessments
				</p>
			</div>
			<div className="space-y-4">
				{dummyProStudentNotifications.map((notif) => (
					<Card key={notif.id}>
						<CardContent className="flex items-center space-x-4">
							<div>
								{notif.type === 'email' && (
									<Mail className="text-blue-500" size={24} />
								)}
								{notif.type === 'system' && (
									<Bell className="text-yellow-500" size={24} />
								)}
								{notif.type === 'workshop' && (
									<Bell className="text-green-500" size={24} />
								)}
								{notif.type === 'assessment' && (
									<Bell className="text-purple-500" size={24} />
								)}
								{notif.type === 'certificate' && (
									<Bell className="text-indigo-500" size={24} />
								)}
								{notif.type === 'chat' && (
									<Mail className="text-pink-500" size={24} />
								)}
							</div>
							<div className="flex-1">
								<div className="text-gray-900">{notif.message}</div>
								<div className="text-xs text-gray-500 mt-1">
									{notif.timestamp}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ProStudentNotifications;