import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navs = [
    { path: '/home', label: 'Dashboard' },
    { path: '/groups', label: 'Task Groups' },
    { path: '/guide', label: 'User Guide' },
    { path: '/user', label: 'Users'},
    { path: '/developers', label: 'Developers' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <span className="text-2xl">📋</span>
        <span className="font-black text-xl text-emerald-700 tracking-tight">ProTASKinate</span>
      </div>
      <nav className="flex items-center gap-1 sm:gap-1 overflow-x-auto py-2">
        {navs.map((n) => (
          <NavLink
            key={n.path}
            to={n.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}