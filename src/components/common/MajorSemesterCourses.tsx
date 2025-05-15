import React, { useState } from 'react';
import Card from './Card';

const majorsList = [
  'Computer Science',
  'Business Informatics',
  'Information Systems',
  'Marketing',
  'Finance',
  'Engineering',
  'Mobile Development',
  'Business Administration',
];
const semesterNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

// Example curriculum structure with more professional dummy data
const curriculum: Record<string, Record<number, string[]>> = {
  'Computer Science': {
    1: ['Introduction to Programming', 'Discrete Mathematics', 'Calculus I', 'Academic Writing'],
    2: ['Data Structures', 'Calculus II', 'Digital Logic', 'Critical Thinking'],
    3: ['Algorithms', 'Computer Organization', 'Linear Algebra', 'Professional Ethics'],
    4: ['Operating Systems', 'Database Systems', 'Probability & Statistics', 'Technical Communication'],
    5: ['Software Engineering', 'Web Development', 'Computer Networks', 'Project Management'],
    6: ['Artificial Intelligence', 'Mobile App Development', 'Cloud Computing', 'Elective: Cybersecurity'],
    7: ['Machine Learning', 'Distributed Systems', 'Elective: Data Mining', 'Internship'],
    8: ['Capstone Project', 'Elective: Blockchain', 'Elective: IoT', 'Entrepreneurship'],
  },
  'Business Informatics': {
    1: ['Introduction to Business', 'Mathematics I', 'Microeconomics', 'Business English'],
    2: ['Financial Accounting', 'Mathematics II', 'Macroeconomics', 'Business Communication'],
    3: ['Business Analytics', 'Information Systems', 'Statistics', 'Organizational Behavior'],
    4: ['Project Management', 'Database Systems', 'Business Law', 'Marketing Principles'],
    5: ['Data Visualization', 'Business Intelligence', 'Elective: E-Commerce', 'Internship'],
    6: ['Enterprise Systems', 'IT Project Management', 'Elective: FinTech', 'Leadership Skills'],
    7: ['Internship', 'Elective: Supply Chain', 'Elective: HR Analytics', 'Strategic Management'],
    8: ['Graduation Project', 'Elective: Digital Marketing', 'Elective: Business Ethics', 'Innovation Management'],
  },
  'Engineering': {
    1: ['Engineering Mathematics I', 'Physics I', 'Introduction to Engineering', 'Technical Drawing'],
    2: ['Engineering Mathematics II', 'Physics II', 'Materials Science', 'Computer-Aided Design'],
    3: ['Statics', 'Dynamics', 'Thermodynamics', 'Engineering Economics'],
    4: ['Fluid Mechanics', 'Electrical Circuits', 'Mechanics of Materials', 'Professional Practice'],
    5: ['Control Systems', 'Manufacturing Processes', 'Elective: Robotics', 'Project Management'],
    6: ['Environmental Engineering', 'Elective: Renewable Energy', 'Internship', 'Quality Assurance'],
    7: ['Capstone Design I', 'Elective: Mechatronics', 'Elective: Structural Analysis', 'Leadership'],
    8: ['Capstone Design II', 'Elective: Transportation', 'Elective: Smart Grids', 'Entrepreneurship'],
  },
  // Add more majors and their semester courses as needed
};

const MajorSemesterCourses = () => {
  const [selectedMajor, setSelectedMajor] = useState(majorsList[0]);
  const [selectedSemester, setSelectedSemester] = useState(1);

  const courses = curriculum[selectedMajor]?.[selectedSemester] || [];

  return (
    <Card className="mt-8">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Major & Semester Courses</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block font-medium mb-1">Select Major</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedMajor}
              onChange={e => {
                setSelectedMajor(e.target.value);
                setSelectedSemester(1);
              }}
            >
              {majorsList.map((major, idx) => (
                <option key={idx} value={major}>{major}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Select Semester</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedSemester}
              onChange={e => setSelectedSemester(Number(e.target.value))}
            >
              {semesterNumbers.map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Courses for {selectedMajor} - Semester {selectedSemester}</h3>
          {courses.length > 0 ? (
            <ul className="list-disc ml-6 text-gray-700">
              {courses.map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 italic">No courses listed for this semester.</div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MajorSemesterCourses;
