import React from 'react';
import { Link } from 'react-router-dom';

export default function GuidePage() {
  const steps = [
    {
      title: '1. Create a Task Group',
      summary: 'Organize tasks into custom categories.',
      details: 'Go to the Task Groups page, type your category name (e.g., School, Work) into the input box, and click "+ Add Group".',
      actionLink: '/groups',
    },
    {
      title: '2. Add Tasks to a Group',
      summary: 'Assign tasks inside specific folders.',
      details: 'Click on any task group card to open its folder view, type your task in the input field, and click "+ Add Task".',
      actionLink: '/groups',
    },
    {
      title: '3. Mark Tasks as Done / Not Done',
      summary: 'Toggle task completion status.',
      details: 'Click the circular checkmark button next to any task to cross it out as completed or toggle it back to active.',
      actionLink: '/home',
    },
    {
      title: '4. Delete a Task',
      summary: 'Remove unwanted items.',
      details: 'Click the Delete button on the right side of any task card to instantly remove it from your list.',
      actionLink: '/home',
    },
    {
      title: '5. Page & Route Navigation',
      summary: 'Seamless client-side routing.',
      details: 'Powered by React Router DOM, click any link in the top navigation bar to switch between views instantly without reloading the page.',
      actionLink: '/developers',
    },
    {
      title: '6. External API Integration (Axios & DummyJSON)',
      summary: 'Fetch live user data.',
      details: 'The app uses Axios to send HTTP requests to DummyJSON (https://dummyjson.com/users/1) with built-in loading spinners and error handling.',
      actionLink: '/developers',
    },
    {
      title: '7. Global State Management (Zustand)',
      summary: 'Sync data across components.',
      details: 'Using Zustand, actions performed on one page (like adding or completing tasks) instantly update metrics and lists across the entire app.',
      actionLink: '/home',
    }
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-800">User Guide</h1>
        <p className="text-sm text-slate-500 mt-1">Click on any instruction title to jump directly to that page.</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2 hover:border-emerald-500 transition-colors"
          >
            <div>
              <Link 
                to={step.actionLink}
                className="text-base font-bold text-slate-800 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>{step.title}</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600"></span>
              </Link>
              <p className="text-xs text-slate-400 mt-0.5">{step.summary}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {step.details}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}