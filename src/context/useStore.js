import { create } from 'zustand';

export const useStore = create((set) => ({
  tasks: [],
  groups: [],
  
  addGroup: (name) => set((state) => ({
    groups: [...state.groups, { id: name.toLowerCase().replace(/\s+/g, '-'), name }]
  })),

  editGroup: (id, newName) => set((state) => ({
    groups: state.groups.map(g => g.id === id ? { ...g, name: newName } : g)
  })),

  deleteGroup: (id) => set((state) => ({
    groups: state.groups.filter(g => g.id !== id),
    tasks: state.tasks.filter(t => t.groupId !== id)
  })),

  addTask: (title, groupId, description = '') => set((state) => ({
    tasks: [...state.tasks, { id: Date.now().toString(), title, groupId, description, completed: false }]
  })),

  editTask: (id, newTitle, newDescription, newGroupId) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, title: newTitle, description: newDescription, groupId: newGroupId } : t)
  })),

  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  }))
}));