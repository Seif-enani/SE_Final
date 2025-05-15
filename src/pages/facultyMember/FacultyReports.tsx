import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/FormElements';
import { dummyReports, dummyInternships } from '../../data/internships';
import { dummyUsers } from '../../data/users';
import { Download, Eye, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'flagged', label: 'Flagged' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'accepted', label: 'Accepted' },
];

const majorOptions = [
  { value: '', label: 'All Majors' },
  ...Array.from(new Set(dummyUsers.filter(u => u.role === 'student' && 'major' in u).map(u => (u as any).major))).map(m => ({ value: m, label: m })),
];

const FacultyReports = () => {
  const [status, setStatus] = useState('');
  const [major, setMajor] = useState('');
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [reports, setReports] = useState([...dummyReports]);
  const [clarification, setClarification] = useState('');

  // Filter reports
  const filteredReports = reports.filter(r => {
    const student = dummyUsers.find(u => u.id === r.studentId && u.role === 'student');
    return (
      (!status || r.status === status) &&
      (!major || (student && 'major' in student && (student as any).major === major)) &&
      (!search || r.title.toLowerCase().includes(search.toLowerCase()) || (student && student.name.toLowerCase().includes(search.toLowerCase())))
    );
  });

  const handleDownload = (report: any) => {
    // Dummy download logic
    alert('Downloading PDF for: ' + report.title);
  };

  const handleStatusChange = (reportId: string, newStatus: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
    setSelectedReport(reports.find(r => r.id === reportId));
    setClarification('');
  };

  const handleClarificationSubmit = () => {
    if (!clarification.trim()) return;
    setReports(prev => prev.map(r =>
      r.id === selectedReport.id
        ? { ...r, clarifications: [...(r.clarifications || []), { text: clarification, date: new Date().toISOString() }] }
        : r
    ));
    setSelectedReport(prev => prev ? { ...prev, clarifications: [...(prev.clarifications || []), { text: clarification, date: new Date().toISOString() }] } : prev);
    setClarification('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Internship Reports</h1>
          <p className="text-gray-600">Review, filter, and manage internship reports</p>
        </div>
        <div className="flex gap-2">
          <Select label="Status" value={status} onChange={e => setStatus(e.target.value)} options={statusOptions} />
          <Select label="Major" value={major} onChange={e => setMajor(e.target.value)} options={majorOptions} />
          <Input placeholder="Search by title or student" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map(report => {
          const student = dummyUsers.find(u => u.id === report.studentId && u.role === 'student');
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader title={report.title} subtitle={student ? student.name : ''} />
              <CardContent>
                <div className="flex flex-col gap-2 mb-2">
                  <span className="text-sm text-gray-500">Status: <span className="font-semibold capitalize">{report.status}</span></span>
                  <span className="text-sm text-gray-500">Major: {(student && 'major' in student) ? (student as any).major : '-'}</span>
                  <span className="text-sm text-gray-500">Submitted: {new Date(report.submissionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" leftIcon={<Eye size={16} />} onClick={() => setSelectedReport(report)}>View</Button>
                  <Button size="sm" variant="outline" leftIcon={<Download size={16} />} onClick={() => handleDownload(report)}>Download PDF</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-2xl w-full relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold" onClick={() => setSelectedReport(null)} aria-label="Close">×</button>
            <h2 className="text-xl font-bold mb-2">{selectedReport.title}</h2>
            <div className="mb-2 text-gray-600">Student: {dummyUsers.find(u => u.id === selectedReport.studentId)?.name}</div>
            <div className="mb-2 text-gray-600">Major: {(dummyUsers.find(u => u.id === selectedReport.studentId && u.role === 'student') as any)?.major}</div>
            <div className="mb-2 text-gray-600">Status: <span className="capitalize font-semibold">{selectedReport.status}</span></div>
            <div className="mb-4 text-gray-700 whitespace-pre-line">{selectedReport.content}</div>
            <div className="flex gap-2 mb-4">
              <Button size="sm" variant="outline" leftIcon={<Download size={16} />} onClick={() => handleDownload(selectedReport)}>Download PDF</Button>
            </div>
            {/* Status Actions */}
            <div className="mb-4">
              <div className="font-semibold mb-2">Set Status:</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" leftIcon={<CheckCircle size={16} />} onClick={() => handleStatusChange(selectedReport.id, 'accepted')}>Accept</Button>
                <Button size="sm" variant="outline" leftIcon={<XCircle size={16} />} onClick={() => handleStatusChange(selectedReport.id, 'rejected')}>Reject</Button>
                <Button size="sm" variant="outline" leftIcon={<AlertCircle size={16} />} onClick={() => handleStatusChange(selectedReport.id, 'flagged')}>Flag</Button>
              </div>
            </div>
            {/* Show clarifications if any */}
            {selectedReport.clarifications && selectedReport.clarifications.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold mb-2">Clarifications:</div>
                <ul className="list-disc ml-6 text-sm">
                  {selectedReport.clarifications.map((c: any, idx: number) => (
                    <li key={idx}><span>{c.text}</span> <span className="text-xs text-gray-400">({new Date(c.date).toLocaleString()})</span></li>
                  ))}
                </ul>
              </div>
            )}
            {/* Clarification for flagged/rejected */}
            {(selectedReport.status === 'flagged' || selectedReport.status === 'rejected') && (
              <div className="mb-4">
                <div className="font-semibold mb-2">Submit Clarification</div>
                <Input placeholder="Enter clarification..." value={clarification} onChange={e => setClarification(e.target.value)} />
                <Button size="sm" variant="primary" className="mt-2" onClick={handleClarificationSubmit}>Submit</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyReports;