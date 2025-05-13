import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Video, PhoneCall, UserCheck, UserX, Bell, Mic, MicOff, VideoOff, Monitor, MonitorOff, User, CheckCircle, XCircle, Circle, CircleDot, LogOut } from 'lucide-react';

// Dummy users and appointments
const dummyUsers = [
  { id: 's1', name: 'Ahmed Mostafa', role: 'student', online: true },
  { id: 's2', name: 'Sara Khaled', role: 'student', online: false },
  { id: 'scad1', name: 'SCAD Officer', role: 'scad', online: true },
];
const dummyAppointments = [
  { id: 'a1', userId: 's1', userName: 'Ahmed Mostafa', status: 'pending', type: 'Career Guidance', online: true },
  { id: 'a2', userId: 's2', userName: 'Sara Khaled', status: 'accepted', type: 'Report Clarification', online: false },
  { id: 'a3', userId: 's1', userName: 'Ahmed Mostafa', status: 'rejected', type: 'Career Guidance', online: true },
];

const SCADAppointments = () => {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState('Career Guidance');
  const [requestUser, setRequestUser] = useState('s1');
  const [notification, setNotification] = useState<string | null>(null);
  const [incomingCall, setIncomingCall] = useState<{ userName: string; appointmentId: string } | null>(null);
  const [inCall, setInCall] = useState(false);
  const [callSettings, setCallSettings] = useState({ video: true, mic: true, screen: false });
  const [otherUserOnline, setOtherUserOnline] = useState(true);

  // Request appointment
  const handleRequest = () => {
    setAppointments(prev => [
      ...prev,
      {
        id: 'a' + (prev.length + 1),
        userId: requestUser,
        userName: dummyUsers.find(u => u.id === requestUser)?.name || 'Unknown',
        status: 'pending',
        type: requestType,
        online: dummyUsers.find(u => u.id === requestUser)?.online || false,
      },
    ]);
    setShowRequestForm(false);
    setNotification('Appointment request sent!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Accept/reject appointment
  const handleStatus = (id: string, status: 'accepted' | 'rejected') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setNotification(`Appointment ${status}`);
    setTimeout(() => setNotification(null), 3000);
    if (status === 'accepted') {
      // Simulate incoming call after accept
      setTimeout(() => setIncomingCall({ userName: appointments.find(a => a.id === id)?.userName || '', appointmentId: id }), 2000);
    }
  };

  // Accept/reject incoming call
  const handleCall = (accept: boolean) => {
    if (accept) {
      setInCall(true);
      setNotification('Call started');
      setTimeout(() => setNotification(null), 2000);
    }
    setIncomingCall(null);
  };

  // Leave call
  const handleLeaveCall = () => {
    setInCall(false);
    setNotification('You left the call');
    setTimeout(() => setNotification(null), 2000);
  };

  // Simulate other user leaving
  const handleOtherUserLeaves = () => {
    setInCall(false);
    setNotification('The other caller left the call');
    setTimeout(() => setNotification(null), 3000);
  };

  // Toggle call settings
  const toggleSetting = (key: 'video' | 'mic' | 'screen') => {
    setCallSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments & Video Calls</h1>
          <p className="text-gray-600">Manage and join video calls for career guidance and report clarifications</p>
        </div>
        <Button leftIcon={<Video />} variant="primary" onClick={() => setShowRequestForm(true)}>
          Request Appointment
        </Button>
      </div>
      {notification && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded flex items-center gap-2">
          <Bell size={18} /> {notification}
        </div>
      )}
      {/* Request Form */}
      {showRequestForm && (
        <Card className="max-w-lg mx-auto">
          <CardHeader title="Request Appointment" />
          <CardContent>
            <div className="mb-4">
              <label className="block font-medium mb-1">Type</label>
              <select className="w-full border rounded px-3 py-2" value={requestType} onChange={e => setRequestType(e.target.value)}>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Report Clarification">Report Clarification</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Student</label>
              <select className="w-full border rounded px-3 py-2" value={requestUser} onChange={e => setRequestUser(e.target.value)}>
                {dummyUsers.filter(u => u.role === 'student').map(u => (
                  <option key={u.id} value={u.id}>{u.name} {u.online ? '(Online)' : '(Offline)'}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleRequest}>Send Request</Button>
              <Button variant="outline" onClick={() => setShowRequestForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Appointments List */}
      <Card>
        <CardHeader title="Appointments" />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 text-left">Student</th>
                  <th className="py-2 px-3 text-left">Type</th>
                  <th className="py-2 px-3 text-left">Status</th>
                  <th className="py-2 px-3 text-left">Online</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id} className="border-b last:border-b-0">
                    <td className="py-2 px-3 flex items-center gap-2">
                      <User size={16} /> {app.userName}
                    </td>
                    <td className="py-2 px-3">{app.type}</td>
                    <td className="py-2 px-3">
                      {app.status === 'pending' && <span className="text-yellow-600 flex items-center gap-1"><CircleDot size={12} /> Pending</span>}
                      {app.status === 'accepted' && <span className="text-green-600 flex items-center gap-1"><CheckCircle size={12} /> Accepted</span>}
                      {app.status === 'rejected' && <span className="text-red-600 flex items-center gap-1"><XCircle size={12} /> Rejected</span>}
                    </td>
                    <td className="py-2 px-3">
                      {app.online ? <span className="text-green-600 flex items-center gap-1"><Circle size={10} /> Online</span> : <span className="text-gray-400 flex items-center gap-1"><Circle size={10} /> Offline</span>}
                    </td>
                    <td className="py-2 px-3">
                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="success" leftIcon={<UserCheck size={14} />} onClick={() => handleStatus(app.id, 'accepted')}>Accept</Button>
                          <Button size="sm" variant="danger" leftIcon={<UserX size={14} />} onClick={() => handleStatus(app.id, 'rejected')}>Reject</Button>
                        </div>
                      )}
                      {app.status === 'accepted' && (
                        <Button size="sm" variant="primary" leftIcon={<PhoneCall size={14} />} onClick={() => setIncomingCall({ userName: app.userName, appointmentId: app.id })}>Call</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* Incoming Call Notification */}
      {incomingCall && !inCall && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-md w-full flex flex-col items-center">
            <PhoneCall size={40} className="text-blue-600 mb-2" />
            <div className="font-semibold text-lg mb-2">Incoming Call from {incomingCall.userName}</div>
            <div className="flex gap-4 mt-2">
              <Button variant="success" leftIcon={<PhoneCall />} onClick={() => handleCall(true)}>Accept</Button>
              <Button variant="danger" leftIcon={<XCircle />} onClick={() => handleCall(false)}>Reject</Button>
            </div>
          </div>
        </div>
      )}
      {/* In Call UI */}
      {inCall && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg min-w-[400px] max-w-lg w-full flex flex-col items-center">
            <Video size={40} className="text-blue-600 mb-2" />
            <div className="font-semibold text-lg mb-2">In Call with Student</div>
            <div className="flex gap-4 mb-4">
              <Button variant={callSettings.video ? 'primary' : 'outline'} leftIcon={callSettings.video ? <Video /> : <VideoOff />} onClick={() => toggleSetting('video')}>
                {callSettings.video ? 'Disable Video' : 'Enable Video'}
              </Button>
              <Button variant={callSettings.mic ? 'primary' : 'outline'} leftIcon={callSettings.mic ? <Mic /> : <MicOff />} onClick={() => toggleSetting('mic')}>
                {callSettings.mic ? 'Mute' : 'Unmute'}
              </Button>
              <Button variant={callSettings.screen ? 'primary' : 'outline'} leftIcon={callSettings.screen ? <Monitor /> : <MonitorOff />} onClick={() => toggleSetting('screen')}>
                {callSettings.screen ? 'Stop Sharing' : 'Share Screen'}
              </Button>
            </div>
            <Button variant="danger" leftIcon={<LogOut />} onClick={handleLeaveCall}>Leave Call</Button>
            <Button variant="outline" className="mt-2" onClick={handleOtherUserLeaves}>Simulate Other User Leaves</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCADAppointments; 