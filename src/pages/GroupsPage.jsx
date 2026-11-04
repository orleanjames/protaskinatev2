import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/useStore';

export default function GroupsPage() {
  const { groups, tasks, addGroup, editGroup, deleteGroup } = useStore();
  const [newGroup, setNewGroup] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [deletingGroupId, setDeletingGroupId] = useState(null);

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

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroup.trim()) {
      setError(true);
      return;
    }
    setError(false);
    addGroup(newGroup.trim());
    setNewGroup('');
  };

  const handleSaveGroup = (e) => {
    e.preventDefault();
    if (!editingGroup.name.trim()) return;
    editGroup(editingGroup.id, editingGroup.name.trim());
    setEditingGroup(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Task Groups</h1>
        <p className="text-sm text-slate-500 mt-1">Create a group task here!</p>
      </div>

      <form onSubmit={handleCreateGroup} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newGroup}
            onChange={(e) => { setNewGroup(e.target.value); if (error) setError(false); }}
            placeholder="New group name (e.g., Thesis, Work)..."
            className={`flex-1 px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
              error ? 'border-red-500 ring-red-500/20' : 'border-slate-200 focus:ring-emerald-500'
            }`}
          />
          <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition">
            + Add Group
          </button>
        </div>
        {error && <p className="text-xs font-bold text-red-500">Please enter a group name.</p>}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => {
          const count = tasks.filter((t) => t.groupId === group.id).length;
          return (
            <div
              key={group.id}
              onClick={() => navigate(`/groups/${group.id}`)}
              className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 shadow-sm cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-800">{group.name}</h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">{count} tasks</span>
                
                <div className="relative" ref={activeMenuId === group.id ? menuRef : null} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === group.id ? null : group.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 font-bold tracking-widest text-lg"
                  >
                    ⋮
                  </button>

                  {activeMenuId === group.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1 text-xs font-bold text-slate-700">
                      <button
                        onClick={() => { setEditingGroup(group); setActiveMenuId(null); }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50"
                      >
                        ✏️ Rename
                      </button>
                      <button
                        onClick={() => { setDeletingGroupId(group.id); setActiveMenuId(null); }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rename Group Modal using Portal */}
      {editingGroup && ReactDOM.createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 flex items-center justify-center z-[99999] p-4 m-0" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Rename Group</h3>
            <form onSubmit={handleSaveGroup} className="space-y-4">
              <input
                type="text"
                value={editingGroup.name}
                onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                autoFocus
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGroup(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal using Portal */}
      {deletingGroupId && ReactDOM.createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 flex items-center justify-center z-[99999] p-4 m-0" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="text-3xl">⚠️</div>
            <h3 className="text-lg font-bold text-slate-800">Delete Group?</h3>
            <p className="text-xs text-slate-500">Deleting this group will also remove all tasks inside it.</p>
            <div className="flex justify-center gap-2 pt-2">
              <button onClick={() => setDeletingGroupId(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                Cancel
              </button>
              <button onClick={() => { deleteGroup(deletingGroupId); setDeletingGroupId(null); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl">
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