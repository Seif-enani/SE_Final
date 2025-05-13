import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';

// Dummy data for demonstration
const companiesViewed = [
  { id: 'c1', name: 'TechCorp Solutions', viewedAt: '2025-05-10' },
  { id: 'c2', name: 'FinBank International', viewedAt: '2025-05-12' },
  { id: 'c3', name: 'DataWiz Analytics', viewedAt: '2025-05-13' },
];

const assessments = [
  { id: 'a1', title: 'React Skills Assessment', taken: false, score: null },
  { id: 'a2', title: 'Aptitude Test', taken: true, score: 85 },
  { id: 'a3', title: 'Python Coding Challenge', taken: false, score: null },
];

const workshops = [
  { id: 'w1', title: 'Ace Your Interview', date: '2025-06-01', registered: true, live: true, preRecorded: false },
  { id: 'w2', title: 'CV Writing', date: '2025-06-10', registered: false, live: false, preRecorded: true },
  { id: 'w3', title: 'Career Planning', date: '2025-06-15', registered: false, live: false, preRecorded: false },
];

// Dummy data for pre-recorded and attended workshops
const preRecordedWorkshops = [
  { id: 'w2', title: 'CV Writing', date: '2025-06-10' },
  { id: 'w4', title: 'Interview Skills', date: '2025-06-12' },
];
const attendedWorkshops = [
  { id: 'w1', title: 'Ace Your Interview', date: '2025-06-01' },
  { id: 'w2', title: 'CV Writing', date: '2025-06-10' },
];

const ProStudentAdvanced = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [showScoreOnProfile, setShowScoreOnProfile] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [certificate, setCertificate] = useState(false);
  const [workshopRating, setWorkshopRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [sharedAssessment, setSharedAssessment] = useState<string | null>(null);
  const [workshopCompleted, setWorkshopCompleted] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [paused, setPaused] = useState<string | null>(null);
  const [stopped, setStopped] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<{ [id: string]: boolean }>({});
  const [ratings, setRatings] = useState<{ [id: string]: number }>({});
  const [feedbacks, setFeedbacks] = useState<{ [id: string]: string }>({});
  const [showWorkshopDetails, setShowWorkshopDetails] = useState<string | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState<string | null>(null);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '' });

  // Example handlers
  const handleTakeAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    const score = Math.floor(Math.random() * 41) + 60; // 60-100
    setAssessmentScore(score);
    setNotifications(n => [...n, `Assessment completed: Score ${score}`]);
    setSharedAssessment(null); // reset share state
  };

  const handleShareAssessment = () => {
    if (selectedAssessment && assessmentScore !== null) {
      setSharedAssessment(selectedAssessment);
      setNotifications(n => [...n, `Score for assessment shared on profile!`]);
    }
  };

  const handleRegisterWorkshop = (workshopId: string) => {
    setNotifications(n => [...n, 'Registered for workshop!']);
    setSelectedWorkshop(workshopId);
    setWorkshopCompleted(null);
    setCertificate(false);
  };

  const handleJoinWorkshop = (workshopId: string) => {
    setNotifications(n => [...n, 'Joined live workshop!']);
    setSelectedWorkshop(workshopId);
    setWorkshopCompleted(workshopId); // Mark as completed for demo (simulate end of live)
  };

  const handlePlayPreRecorded = () => {
    setNotifications(n => [...n, 'Playing pre-recorded workshop']);
    if (selectedWorkshop) setWorkshopCompleted(selectedWorkshop); // Simulate completion
  };
  const handlePausePreRecorded = () => {
    setNotifications(n => [...n, 'Paused pre-recorded workshop']);
  };
  const handleStopPreRecorded = () => {
    setNotifications(n => [...n, 'Stopped pre-recorded workshop']);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages(msgs => [...msgs, chatInput]);
      setNotifications(n => [...n, 'New chat message received']);
      setChatInput('');
    }
  };

  // Handlers for pre-recorded workshop controls
  const handlePlay = (id: string) => {
    setPlaying(id);
    setPaused(null);
    setStopped(null);
    setNotifications(n => [...n, `Playing pre-recorded workshop: ${id}`]);
  };
  const handlePause = (id: string) => {
    setPaused(id);
    setPlaying(null);
    setStopped(null);
    setNotifications(n => [...n, `Paused pre-recorded workshop: ${id}`]);
  };
  const handleStop = (id: string) => {
    setStopped(id);
    setPlaying(null);
    setPaused(null);
    setNotifications(n => [...n, `Stopped pre-recorded workshop: ${id}`]);
  };

  // Handlers for attended workshops
  const handleGetCertificate = (id: string) => {
    setCertificates(c => ({ ...c, [id]: true }));
    setNotifications(n => [...n, `Certificate generated for workshop: ${id}`]);
  };
  const handleRate = (id: string, value: number) => {
    setRatings(r => ({ ...r, [id]: value }));
  };
  const handleFeedback = (id: string, value: string) => {
    setFeedbacks(f => ({ ...f, [id]: value }));
  };

  // Dummy workshop details
  const getWorkshopDetails = (id: string) => {
    const details: { [key: string]: any } = {
      w1: {
        description: 'Ace Your Interview: Learn top strategies for interview success with industry experts.',
        location: 'Online (Live)',
        type: 'Live',
        date: '2025-06-01',
        time: '15:00',
      },
      w2: {
        description: 'CV Writing: Build a professional CV that stands out to employers.',
        location: 'Online (Pre-recorded)',
        type: 'Pre-recorded',
        date: '2025-06-10',
        time: 'Anytime',
      },
      w3: {
        description: 'Career Planning: Plan your career path with guidance from top mentors.',
        location: 'Online',
        type: 'Seminar',
        date: '2025-06-15',
        time: '17:00',
      },
    };
    return details[id] || { description: 'No details available.' };
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifications(n => [...n, `Registered for workshop as ${registerForm.name}`]);
    setShowRegisterForm(null);
    setRegisterForm({ name: '', email: '', phone: '' });
  };

  return (
    <div className="space-y-8">
      {/* Companies Viewed */}
      <Card>
        <CardHeader title="Companies That Viewed My Profile" />
        <CardContent>
          <ul>
            {companiesViewed.map(c => (
              <li key={c.id}>{c.name} (Viewed on {c.viewedAt})</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Online Assessments */}
      <Card>
        <CardHeader title="Online Assessments" />
        <CardContent>
          <ul>
            {assessments.map(a => (
              <li key={a.id} className="mb-2">
                {a.title} - {a.taken || selectedAssessment === a.id ? `Score: ${assessmentScore ?? a.score}` : (
                  <Button size="sm" onClick={() => handleTakeAssessment(a.id)}>Take Assessment</Button>
                )}
                {/* Show Share Score button after taking assessment */}
                {selectedAssessment === a.id && assessmentScore !== null && !sharedAssessment && (
                  <Button size="sm" className="ml-2" onClick={handleShareAssessment}>Share Score</Button>
                )}
                {/* Show confirmation if shared */}
                {selectedAssessment === a.id && sharedAssessment === a.id && (
                  <span className="ml-2 text-green-600">Score shared!</span>
                )}
                {selectedAssessment === a.id && assessmentScore !== null && (
                  <span className="ml-2">
                    <label>
                      <input type="checkbox" checked={showScoreOnProfile} onChange={e => setShowScoreOnProfile(e.target.checked)} />
                      <span className="ml-1">Post score on my profile</span>
                    </label>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Workshops */}
      <Card>
        <CardHeader title="Upcoming Online Career Workshops" />
        <CardContent>
          <ul>
            {workshops.map(w => (
              <li key={w.id} className="mb-2">
                <strong>{w.title}</strong> ({w.date})
                {w.registered ? (
                  <>
                    {w.live && <Button size="sm" className="ml-2" onClick={() => setSelectedWorkshop(w.id)}>Join</Button>}
                  </>
                ) : (
                  <Button size="sm" className="ml-2" onClick={() => setShowRegisterForm(w.id)}>Register</Button>
                )}
                <Button size="sm" className="ml-2" onClick={() => setShowWorkshopDetails(w.id)}>Details</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Workshop Details Modal/Section (info only, no join/chat/notes) */}
      {showWorkshopDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{workshops.find(w => w.id === showWorkshopDetails)?.title}</h2>
            <p className="mb-2">{getWorkshopDetails(showWorkshopDetails).description}</p>
            <div className="mb-2 text-sm text-gray-700">
              <div><strong>Date:</strong> {getWorkshopDetails(showWorkshopDetails).date}</div>
              <div><strong>Time:</strong> {getWorkshopDetails(showWorkshopDetails).time}</div>
              <div><strong>Type:</strong> {getWorkshopDetails(showWorkshopDetails).type}</div>
              <div><strong>Location:</strong> {getWorkshopDetails(showWorkshopDetails).location}</div>
            </div>
            <Button size="sm" className="mt-2" onClick={() => setShowWorkshopDetails(null)}>Close</Button>
          </div>
        </div>
      )}

      {/* Workshop Join Modal/Section (full functionality: notes, chat, etc) */}
      {selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">{workshops.find(w => w.id === selectedWorkshop)?.title} - Live Session</h2>
            <div>
              <textarea
                placeholder="Take notes here..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full border rounded p-2 mt-2"
              />
            </div>
            <div>
              <h4>Chat with Attendees</h4>
              <div className="border p-2 h-24 overflow-y-auto mb-2">
                {chatMessages.map((msg, idx) => <div key={idx}>{msg}</div>)}
              </div>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                className="border rounded p-1 mr-2"
              />
              <Button size="sm" onClick={handleSendMessage}>Send</Button>
            </div>
            <Button size="sm" className="mt-4" variant="danger" onClick={() => setSelectedWorkshop(null)}>Leave</Button>
          </div>
        </div>
      )}

      {/* Register Form Modal/Section */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Register for {workshops.find(w => w.id === showRegisterForm)?.title}</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-2">
                <label className="block text-sm font-medium">Name</label>
                <input type="text" required className="border rounded w-full px-2 py-1" value={registerForm.name} onChange={e => setRegisterForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input type="email" required className="border rounded w-full px-2 py-1" value={registerForm.email} onChange={e => setRegisterForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Phone</label>
                <input type="tel" required className="border rounded w-full px-2 py-1" value={registerForm.phone} onChange={e => setRegisterForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" variant="primary">Register</Button>
                <Button type="button" variant="outline" onClick={() => setShowRegisterForm(null)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pre-recorded Workshops */}
      <Card>
        <CardHeader title="Pre-recorded Workshops" />
        <CardContent>
          <ul>
            {preRecordedWorkshops.map(w => (
              <li key={w.id} className="mb-2 flex items-center gap-2">
                <span>{w.title} ({w.date})</span>
                <Button size="sm" onClick={() => handlePlay(w.id)}>Play</Button>
                <Button size="sm" onClick={() => handlePause(w.id)}>Pause</Button>
                <Button size="sm" onClick={() => handleStop(w.id)}>Stop</Button>
                {playing === w.id && <span className="text-green-600 ml-2">Playing</span>}
                {paused === w.id && <span className="text-yellow-600 ml-2">Paused</span>}
                {stopped === w.id && <span className="text-gray-600 ml-2">Stopped</span>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Attended Workshops */}
      <Card>
        <CardHeader title="Attended Workshops" />
        <CardContent>
          <ul>
            {attendedWorkshops.map(w => (
              <li key={w.id} className="mb-4">
                <div className="font-medium">{w.title} ({w.date})</div>
                <div className="flex items-center gap-2 mt-1">
                  {certificates[w.id] && <span className="text-green-600">Certificate Generated!</span>}
                  <label className="ml-2">Rate:
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={ratings[w.id] || ''}
                      onChange={e => handleRate(w.id, Number(e.target.value))}
                      className="ml-1 w-12 border rounded"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Add feedback"
                    value={feedbacks[w.id] || ''}
                    onChange={e => handleFeedback(w.id, e.target.value)}
                    className="ml-2 border rounded px-2 py-1"
                  />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader title="Notifications" />
          <CardContent>
            <ul>
              {notifications.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProStudentAdvanced;