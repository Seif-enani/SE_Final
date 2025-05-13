import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Plus, Edit, Trash, Calendar, Clock, Users, Info, ChevronDown, ChevronUp } from 'lucide-react';

// Dummy workshops data
const initialWorkshops = [
  {
    id: 'w1',
    name: 'Ace Your Interview',
    start: '2024-07-10T14:00',
    end: '2024-07-10T16:00',
    description: 'Learn top strategies for acing technical and HR interviews.',
    speakers: [
      { name: 'Dr. Sarah Youssef', bio: 'Career Coach, 10+ years experience in tech hiring.' },
      { name: 'Ahmed Fathy', bio: 'HR Lead at TechCorp Solutions.' },
    ],
    agenda: [
      'Interview preparation tips',
      'Mock interview session',
      'Q&A with speakers',
    ],
  },
  {
    id: 'w2',
    name: 'Building a Winning CV',
    start: '2024-07-15T11:00',
    end: '2024-07-15T13:00',
    description: 'Craft a CV that stands out to employers in any industry.',
    speakers: [
      { name: 'Mona Khalil', bio: 'Senior Recruiter at FinBank International.' },
    ],
    agenda: [
      'CV structure and content',
      'Common mistakes',
      'Live CV review',
    ],
  },
];

const SCADWorkshops = () => {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [modalOpen, setModalOpen] = useState(false);
  const [editWorkshop, setEditWorkshop] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInlineForm, setEditInlineForm] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    start: '',
    end: '',
    description: '',
    speakers: [{ name: '', bio: '' }],
    agenda: [''],
  });
  const [editDrawerId, setEditDrawerId] = useState<string | null>(null);
  const [editDrawerForm, setEditDrawerForm] = useState<any>(null);

  // Open modal for create only
  const openModal = () => {
    setEditWorkshop(null);
    setForm({
      name: '',
      start: '',
      end: '',
      description: '',
      speakers: [{ name: '', bio: '' }],
      agenda: [''],
    });
    setModalOpen(true);
  };

  // Save workshop (create or update)
  const handleSave = () => {
    if (editWorkshop) {
      setWorkshops(ws => ws.map(w => w.id === editWorkshop.id ? { ...editWorkshop, ...form } : w));
    } else {
      setWorkshops(ws => [
        ...ws,
        { ...form, id: 'w' + (ws.length + 1) },
      ]);
    }
    setModalOpen(false);
  };

  // Delete workshop
  const handleDelete = (id: string) => {
    setWorkshops(ws => ws.filter(w => w.id !== id));
  };

  // Speaker/agenda handlers
  const handleSpeakerChange = (idx: number, field: 'name' | 'bio', value: string) => {
    setForm(f => {
      const speakers = [...f.speakers];
      speakers[idx] = { ...speakers[idx], [field]: value };
      return { ...f, speakers };
    });
  };
  const addSpeaker = () => setForm(f => ({ ...f, speakers: [...f.speakers, { name: '', bio: '' }] }));
  const removeSpeaker = (idx: number) => setForm(f => ({ ...f, speakers: f.speakers.filter((_, i) => i !== idx) }));
  const handleAgendaChange = (idx: number, value: string) => setForm(f => {
    const agenda = [...f.agenda];
    agenda[idx] = value;
    return { ...f, agenda };
  });
  const addAgenda = () => setForm(f => ({ ...f, agenda: [...f.agenda, ''] }));
  const removeAgenda = (idx: number) => setForm(f => ({ ...f, agenda: f.agenda.filter((_, i) => i !== idx) }));

  // Edit drawer handlers
  const openEditDrawer = (workshop: any) => {
    setEditDrawerId(workshop.id);
    setEditDrawerForm({
      name: workshop.name,
      start: workshop.start,
      end: workshop.end,
      description: workshop.description,
      speakers: workshop.speakers.map((s: any) => ({ ...s })),
      agenda: [...workshop.agenda],
    });
  };
  const closeEditDrawer = () => {
    setEditDrawerId(null);
    setEditDrawerForm(null);
  };
  const saveEditDrawer = (id: string) => {
    setWorkshops(ws => ws.map(w => w.id === id ? { ...w, ...editDrawerForm } : w));
    closeEditDrawer();
  };
  const handleDrawerSpeakerChange = (idx: number, field: 'name' | 'bio', value: string) => {
    setEditDrawerForm((f: any) => {
      const speakers = [...f.speakers];
      speakers[idx] = { ...speakers[idx], [field]: value };
      return { ...f, speakers };
    });
  };
  const addDrawerSpeaker = () => setEditDrawerForm((f: any) => ({ ...f, speakers: [...f.speakers, { name: '', bio: '' }] }));
  const removeDrawerSpeaker = (idx: number) => setEditDrawerForm((f: any) => ({ ...f, speakers: f.speakers.filter((_: any, i: number) => i !== idx) }));
  const handleDrawerAgendaChange = (idx: number, value: string) => setEditDrawerForm((f: any) => {
    const agenda = [...f.agenda];
    agenda[idx] = value;
    return { ...f, agenda };
  });
  const addDrawerAgenda = () => setEditDrawerForm((f: any) => ({ ...f, agenda: [...f.agenda, ''] }));
  const removeDrawerAgenda = (idx: number) => setEditDrawerForm((f: any) => ({ ...f, agenda: f.agenda.filter((_: any, i: number) => i !== idx) }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Online Career Workshops</h1>
          <p className="text-gray-600">Create, manage, and view upcoming online workshops for students</p>
        </div>
        <Button leftIcon={<Plus />} variant="primary" onClick={() => openModal()}>
          New Workshop
        </Button>
      </div>
      {/* Workshops List */}
      <Card>
        <CardHeader title="Upcoming Workshops" />
        <CardContent>
          {workshops.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No workshops scheduled.</div>
          ) : (
            <div className="divide-y">
              {workshops.map(w => (
                <div key={w.id}>
                  <div className="flex justify-between items-center py-4 cursor-pointer" onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}>
                    <div>
                      <div className="font-semibold text-lg text-gray-900">{w.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-3">
                        <Calendar size={14} className="inline mr-1" /> {new Date(w.start).toLocaleDateString()} &ndash; {new Date(w.end).toLocaleDateString()}
                        <Clock size={14} className="inline ml-3 mr-1" /> {new Date(w.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(w.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" leftIcon={<Edit size={14} />} onClick={e => { e.stopPropagation(); openEditDrawer(w); }}>Edit</Button>
                      <Button size="sm" variant="danger" leftIcon={<Trash size={14} />} onClick={e => { e.stopPropagation(); handleDelete(w.id); }}>Delete</Button>
                      {expandedId === w.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                  {/* Expanded details (if not editing) */}
                  {expandedId === w.id && (
                    <div className="bg-gray-50 rounded p-4 mt-2 mb-4">
                      <div className="mb-2"><Info size={16} className="inline mr-1" /> <span className="font-medium">Description:</span> {w.description}</div>
                      <div className="mb-2"><Users size={16} className="inline mr-1" /> <span className="font-medium">Speakers:</span>
                        <ul className="ml-6 list-disc text-sm">
                          {w.speakers.map((s: any, idx: number) => <li key={idx}><span className="font-semibold">{s.name}</span>: {s.bio}</li>)}
                        </ul>
                      </div>
                      <div className="mb-2"><span className="font-medium">Agenda:</span>
                        <ul className="ml-6 list-decimal text-sm">
                          {w.agenda.map((a: string, idx: number) => <li key={idx}>{a}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {/* Edit Drawer */}
      {editDrawerId && editDrawerForm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={closeEditDrawer}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-xl z-50 flex flex-col shadow-2xl animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 rounded-t-xl bg-gradient-to-r from-blue-600 to-blue-400">
              <div className="flex items-center gap-2">
                <Calendar size={24} className="text-white" />
                <h2 className="text-xl font-bold text-white">Edit Workshop</h2>
              </div>
              <button
                className="text-white hover:text-blue-100 text-2xl font-bold focus:outline-none"
                onClick={closeEditDrawer}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {/* Form */}
            <form className="flex-1 overflow-y-auto bg-gray-200 px-6 py-6 space-y-7" onSubmit={e => { e.preventDefault(); saveEditDrawer(editDrawerId!); }}>
              <div>
                <label className="block font-semibold mb-1">Workshop Name <span className="text-red-500">*</span></label>
                <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-300 transition" value={editDrawerForm.name} onChange={e => setEditDrawerForm((f: any) => ({ ...f, name: e.target.value }))} required placeholder="e.g. Ace Your Interview" />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Start Date & Time <span className="text-red-500">*</span></label>
                  <input type="datetime-local" className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-300 transition" value={editDrawerForm.start} onChange={e => setEditDrawerForm((f: any) => ({ ...f, start: e.target.value }))} required />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">End Date & Time <span className="text-red-500">*</span></label>
                  <input type="datetime-local" className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-300 transition" value={editDrawerForm.end} onChange={e => setEditDrawerForm((f: any) => ({ ...f, end: e.target.value }))} required />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description <span className="text-red-500">*</span></label>
                <textarea className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-300 transition" value={editDrawerForm.description} onChange={e => setEditDrawerForm((f: any) => ({ ...f, description: e.target.value }))} required placeholder="Briefly describe the workshop..." />
              </div>
              {/* Speakers Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800">
                    <Users size={20} className="text-blue-500" /> Speakers
                  </h3>
                  <Button size="sm" variant="outline" onClick={addDrawerSpeaker} leftIcon={<Plus size={16} />}>Add Speaker</Button>
                </div>
                <div className="space-y-4">
                  {editDrawerForm.speakers.map((s: any, idx: number) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-2 bg-white border border-blue-100 rounded-lg p-4 shadow-sm relative">
                      <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <input
                          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 flex-1"
                          placeholder="Name"
                          value={s.name}
                          onChange={e => handleDrawerSpeakerChange(idx, 'name', e.target.value)}
                          required
                        />
                        <input
                          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 flex-1"
                          placeholder="Bio"
                          value={s.bio}
                          onChange={e => handleDrawerSpeakerChange(idx, 'bio', e.target.value)}
                          required
                        />
                      </div>
                      {editDrawerForm.speakers.length > 1 && (
                        <Button
                          variant="outline"
                          className="absolute top-2 right-2 text-red-500"
                          size="sm"
                          onClick={() => removeDrawerSpeaker(idx)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Agenda Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800">
                    <Info size={20} className="text-blue-500" /> Agenda
                  </h3>
                  <Button size="sm" variant="outline" onClick={addDrawerAgenda} leftIcon={<Plus size={16} />}>Add Item</Button>
                </div>
                <div className="space-y-4">
                  {editDrawerForm.agenda.map((a: string, idx: number) => (
                    <div key={idx} className="relative bg-white border border-blue-100 rounded-lg p-4 shadow-sm flex items-center">
                      <span className="mr-3 text-gray-500 font-semibold">{idx + 1}.</span>
                      <input
                        className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                        placeholder="Agenda item"
                        value={a}
                        onChange={e => handleDrawerAgendaChange(idx, e.target.value)}
                        required
                      />
                      {editDrawerForm.agenda.length > 1 && (
                        <Button
                          variant="outline"
                          className="absolute top-2 right-2 text-red-500"
                          size="sm"
                          onClick={() => removeDrawerAgenda(idx)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
            {/* Fixed Footer */}
            <div className="bg-white px-6 py-4 flex justify-end gap-3 border-t rounded-b-xl sticky bottom-0 z-10">
              <Button variant="outline" type="button" onClick={closeEditDrawer}>Cancel</Button>
              <Button variant="primary" type="button" onClick={() => saveEditDrawer(editDrawerId!)}>Save Changes</Button>
            </div>
          </div>
        </>
      )}
      {/* Modal for create/edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white p-0 rounded-xl shadow-2xl min-w-[370px] max-w-xl w-full relative animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 rounded-t-xl bg-gradient-to-r from-blue-600 to-blue-400">
              <div className="flex items-center gap-2">
                <Calendar size={24} className="text-white" />
                <h2 className="text-xl font-bold text-white">{editWorkshop ? 'Edit Workshop' : 'New Workshop'}</h2>
              </div>
              <button
                className="text-white hover:text-blue-100 text-2xl font-bold focus:outline-none"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form className="space-y-7 px-6 py-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div className="mb-2 text-gray-500 text-sm">Fill in all required fields to save the workshop.</div>
              {/* Workshop Name */}
              <div>
                <label className="block font-semibold mb-1">Workshop Name <span className="text-red-500">*</span></label>
                <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 transition" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Ace Your Interview" />
              </div>
              {/* Date/Time Group */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Start Date & Time <span className="text-red-500">*</span></label>
                  <input type="datetime-local" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 transition" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} required />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">End Date & Time <span className="text-red-500">*</span></label>
                  <input type="datetime-local" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 transition" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} required />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="block font-semibold mb-1">Short Description <span className="text-red-500">*</span></label>
                <textarea className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 transition" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required placeholder="Briefly describe the workshop..." />
              </div>
              {/* Speakers Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800 mb-4">
                  <Users size={20} className="text-blue-500" /> Speakers
                </h3>
                <div className="space-y-4">
                  {form.speakers.map((s, idx) => (
                    <div key={idx} className="flex flex-col gap-2 bg-white border border-blue-100 rounded-lg p-4 shadow-sm relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                          placeholder="Speaker Name"
                          value={s.name}
                          onChange={e => handleSpeakerChange(idx, 'name', e.target.value)}
                          required
                        />
                        <input
                          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                          placeholder="Bio (e.g. HR Lead at...)"
                          value={s.bio}
                          onChange={e => handleSpeakerChange(idx, 'bio', e.target.value)}
                          required
                        />
                      </div>
                      {form.speakers.length > 1 && (
                        <Button
                          variant="outline"
                          className="absolute top-2 right-2 text-red-500"
                          size="sm"
                          onClick={() => removeSpeaker(idx)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addSpeaker}
                  className="mt-4"
                  leftIcon={<Plus size={16} />}
                >
                  Add Speaker
                </Button>
              </div>
              {/* Agenda Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800 mb-4">
                  <Info size={20} className="text-blue-500" /> Agenda
                </h3>
                <div className="space-y-4">
                  {form.agenda.map((a, idx) => (
                    <div key={idx} className="relative bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
                      <input
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                        placeholder="Agenda item"
                        value={a}
                        onChange={e => handleAgendaChange(idx, e.target.value)}
                        required
                      />
                      {form.agenda.length > 1 && (
                        <Button
                          variant="outline"
                          className="absolute top-2 right-2 text-red-500"
                          size="sm"
                          onClick={() => removeAgenda(idx)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addAgenda}
                  className="mt-4"
                  leftIcon={<Plus size={16} />}
                >
                  Add Agenda Item
                </Button>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3 justify-end mt-6">
                <Button variant="primary" type="submit" className="w-full md:w-auto">Save</Button>
                <Button variant="outline" type="button" onClick={() => setModalOpen(false)} className="w-full md:w-auto">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCADWorkshops; 