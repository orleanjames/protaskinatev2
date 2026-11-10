import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserInfoPage() {
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
        setError('Failed to fetch user information list from DummyJSON API.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">User Information</h1>
          <p className="text-sm text-slate-500 mt-1">Sample users fetched from DummyJSON API using Axios.</p>
        </div>
      </div>

      {loading && (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-emerald-600">Retrieving user profiles from API...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-2">
          <p className="text-sm font-bold text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs font-bold text-red-700 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between transition hover:border-emerald-500">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-14 h-14 rounded-full border-2 border-emerald-500 bg-slate-50 object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h2 className="text-base font-black text-slate-800 truncate">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-xs text-slate-400 truncate">@{user.username}</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {user.role || 'User'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Email</span>
                  <span className="font-medium truncate block">{user.email}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
