import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DevelopersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=100')
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch user profiles from DummyJSON API.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Developers</h1>
        <p className="text-sm text-slate-500 mt-1">Meet the project creators.</p>
      </div>

      {/* 1. Project Creators List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Project Creators</h2>
        
        <div className="divide-y divide-slate-100">
          <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Alejandro Sayo</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              Developer
            </span>
          </div>

          <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Paul Banda</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              Developer
            </span>
          </div>

          <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Tristan Castaneda</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              Developer
            </span>
          </div>

          <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Orlean Sarmiento</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              Developer
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sample Users Fetched from DummyJSON API */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Retrieved User Information</h2>
          <p className="text-xs text-slate-400">Sample user list retrieved from DummyJSON using Axios.</p>
        </div>

        {loading && (
          <div className="bg-white p-10 text-center rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-emerald-600">Retrieving users from API...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-500 transition">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-slate-50 object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 truncate">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Email</span>
                    <span className="font-medium truncate block">{user.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}