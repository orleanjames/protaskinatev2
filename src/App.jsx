import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import GroupsPage from './pages/GroupsPage';
import TaskListPage from './pages/TaskListPage';
import GuidePage from './pages/GuidePage';
import DevelopersPage from './pages/DevelopersPage';
import UserInfoPage from './pages/UserInfoPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-10">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<DashboardPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/groups/:groupId" element={<TaskListPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/user" element={<UserInfoPage />}/>
            <Route path="/developers" element={<DevelopersPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}