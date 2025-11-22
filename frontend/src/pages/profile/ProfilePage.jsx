import React from 'react';
import Card from '../../components/Card.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{user?.role}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
