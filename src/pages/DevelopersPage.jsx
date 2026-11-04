import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DevelopersPage() {
  const [apiUser, setApiUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Team members list
  const developers = [
    { name: 'Orlean Sarmiento', role: 'Lead Frontend Developer' },
    { name: 'John Paul Kenneth Banda', role: 'State Management Specialist' },
    { name: 'Alejandro D. Sayo', role: 'UI/UX & Tailwind Engineer' },
    { name: 'Tristan Castaneda', role: 'API Integration Specialist' },
  ];

  useEffect(() => {
    // Fetching user information from DummyJSON API using Axios
    axios.get('https://dummyjson.com/users/144')
      .then((res) => {
        setApiUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to retrieve user information from the DummyJSON API.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Developers</h1>
        <p className="text-sm text-slate-500 mt-1">Meet the creators.</p>
      </div>

      {/* Displaying user info retrieved from DummyJSON API using Axios */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800">Retrieved User Information (DummyJSON API)</h2>

        {loading && (
          <div className="text-xs font-bold text-emerald-600 animate-pulse py-4 text-center">
            Loading user information from API...
          </div>
        )}

        {error && (
          <div className="text-xs font-bold text-red-500 py-4 text-center">
            {error}
          </div>
        )}

        {!loading && !error && apiUser && (
          <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
            {/* Profile Picture */}
            <img 
              src={apiUser.image} 
              alt={apiUser.username} 
              className="w-16 h-16 rounded-full border-2 border-emerald-500 bg-white object-cover" 
            />
            <div className="space-y-1 text-sm">
              {/* Full Name */}
              <div className="font-bold text-slate-800 text-base">
                {apiUser.firstName} {apiUser.lastName}
              </div>
              {/* Username */}
              <div className="text-xs text-slate-500">
                <strong>Username:</strong> {apiUser.username}
              </div>
              {/* Email Address */}
              <div className="text-xs text-slate-500">
                <strong>Email:</strong> {apiUser.email}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Team Members List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Project Creators</h2>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">
          {developers.map((dev, index) => (
            <div key={index} className="p-5 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">{dev.name}</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {dev.role}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}