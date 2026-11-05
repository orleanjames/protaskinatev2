import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/useStore';

export default function TaskListPage() {
  const { groupId } = useParams();
  const { groups, tasks, addTask, editTask, toggleTask, deleteTask } = useStore();
  
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState(false);

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editGroupId, setEditGroupId] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentGroup = groups.find((g) => g.id === groupId);
  const groupTasks = tasks.filter((t) => t.groupId === groupId);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setError(true);
      return;
    }
    setError(false);
    addTask(taskTitle.trim(), groupId, '');
    setTaskTitle('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    editTask(editingTask.id, editTitle.trim(), editDescription.trim(), editGroupId);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <Link to="/groups" className="text-xs font-bold text-emerald-600 hover:underline">← Back to Task Groups</Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-2xl font-black text-slate-800 truncate pr-4">{currentGroup ? currentGroup.name : 'Group Tasks'}</h1>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full flex-shrink-0">{groupTasks.length} tasks</span>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => { setTaskTitle(e.target.value); if (error) setError(false); }}
            placeholder={`Add a task to ${currentGroup?.name || 'this group'}...`}
            className={`flex-1 px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
              error ? 'border-red-500 ring-red-500/20' : 'border-slate-200 focus:ring-emerald-500'
            }`}
          />
          <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition">
            + Add Task
          </button>
        </div>
        {error && <p className="text-xs font-bold text-red-500">Please enter a task title.</p>}
      </form>

      <div className="space-y-2">
        {groupTasks.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-400 text-sm">No tasks in this group yet.</div>
        ) : (
          groupTasks.map((task) => (
            <div key={task.id} className="relative flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-20 py-1 rounded-lg text-xs font-bold text-center transition flex-shrink-0 ${
                    task.completed 
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {task.completed ? 'Done' : 'Undone'}
                </button>
                <div className="min-w-0 flex-1">
                  <span className={`text-sm font-semibold block truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </span>
                  {task.description && <span className="text-xs text-slate-500 block truncate">{task.description}</span>}
                </div>
              </div>

              <div className="relative flex-shrink-0" ref={activeMenuId === task.id ? menuRef : null}>
                <button
                  onClick={() => setActiveMenuId(activeMenuId === task.id ? null : task.id)}
                  className="p-2 text-slate-400 hover:text-slate-600 font-bold tracking-widest text-lg"
                >
                  ⋮
                </button>

                {activeMenuId === task.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1 text-xs font-bold text-slate-700">
                    <button
                      onClick={() => { 
                        setEditingTask(task); 
                        setEditTitle(task.title); 
                        setEditDescription(task.description || ''); 
                        setEditGroupId(task.groupId); 
                        setActiveMenuId(null); 
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => { setDeletingTaskId(task.id); setActiveMenuId(null); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && ReactDOM.createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 flex items-center justify-center z-[99999] p-4 m-0">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800">Edit Task</h3>
              <button onClick={() => setEditingTask(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Task Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Group</label>
                <select
                  value={editGroupId}
                  onChange={(e) => setEditGroupId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
                >
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Write notes or details..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditingTask(null)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {deletingTaskId && ReactDOM.createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 flex items-center justify-center z-[99999] p-4 m-0">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="text-3xl">⚠️</div>
            <h3 className="text-lg font-bold text-slate-800">Delete Task?</h3>
            <p className="text-xs text-slate-500">Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-2 pt-2">
              <button onClick={() => setDeletingTaskId(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                Cancel
              </button>
              <button onClick={() => { deleteTask(deletingTaskId); setDeletingTaskId(null); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl">
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}