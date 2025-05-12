import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/common/Card';
import { dummyUsers } from '../../data/users';
import { UserRole } from '../../types/user';
import { GraduationCap } from 'lucide-react';

const SupervisorStudents = () => {
  const { currentUser } = useAuth();
  const students = dummyUsers.filter(u =>
    u.role === UserRole.STUDENT && currentUser?.assignedStudents?.includes(u.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Students</h1>
        <p className="text-gray-600">Students assigned to you for supervision</p>
      </div>
      {students.length > 0 ? (
        <div className="space-y-4">
          {students.map(student => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center">
                <GraduationCap size={32} className="text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">ID: {(student as any).studentId}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-gray-600">No students assigned yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupervisorStudents;