'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
      router.push('/login');
    } else {
      const { password, ...userData } = currentUser;
      setUser(userData);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/'); 
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-3xl w-full p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-yellow-800 mb-6">My Profile</h1>
        
        <div className="space-y-6">
        
          <div className="text-md font-small">
            <strong>Name:</strong> <span>{user.name}</span>
          </div>
          
          <div className="text-md font-small">
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          
          <div className="text-md font-small">
            <strong>Phone:</strong> <span>{user.phone}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-white bg-red-500 hover:bg-red-600 rounded-full text-l font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
