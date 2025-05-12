import React from 'react';

const ForStudentsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">For Students</h1>
      <div className="grid gap-6">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Internship Opportunities</h2>
          <p className="text-gray-700 mb-4">
            Discover valuable internship opportunities that align with your academic goals and career aspirations.
            Our platform connects you with leading companies offering meaningful work experience.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Create Your Profile</h3>
              <p className="text-gray-700">Complete your student profile with your academic information and career interests.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Browse Opportunities</h3>
              <p className="text-gray-700">Explore available internships and filter based on your preferences.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Apply and Track</h3>
              <p className="text-gray-700">Submit applications and monitor their status through your dashboard.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Gain real-world work experience</li>
            <li>Build professional networks</li>
            <li>Apply classroom knowledge in practical settings</li>
            <li>Receive mentorship from industry professionals</li>
            <li>Enhance your resume with relevant experience</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ForStudentsPage;