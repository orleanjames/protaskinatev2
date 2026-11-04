# ProTASKinate

**ProTASKinate** is a modern, responsive, client-side task management web application built to help users seamlessly organize daily workflows, categorize tasks into custom groups, and track productivity. Developed as part of academic coursework for **DCIT 26: Application Development and Emerging Technologies**, this application adheres strictly to modern UI/UX design standards and rubric requirements.

---

## ✨ Features & Pages

### A. To-Do List Interface (Dashboard & Task Lists)
* **Task Management**: Add, edit, and delete tasks with instant state updates.
* **Status Tracking**: Mark tasks as **Done** or **Not Done** using interactive circular checkmark toggles with visual strikethrough styling.
* **Form Validation**: Robust input validation preventing empty or whitespace-only submissions with descriptive red error feedback.
* **Full-Screen Modals & Portals**: Built with React Portals (`ReactDOM.createPortal`) to guarantee that delete confirmations and edit dialogs render cleanly across the entire viewport.

### B. Task Groups & Categories Page (`/groups`)
* **Custom Grouping**: Create, view, and manage distinct task categories (e.g., *School Activities, Personal Tasks, Projects*).
* **Dynamic Routing**: Click on any group card to open its dedicated folder view via React Router DOM dynamic path parameters (`/groups/:groupId`).
* **Scoped Task Lists**: View and add tasks assigned strictly to the selected group.

### C. Home / Dashboard Page (`/home`)
* **Welcome Banner & Overview**: Greets the user and provides a centralized command center.
* **Axios API Integration**: Automatically fetches live user profile data (name, email, avatar) from the public **DummyJSON API** (`https://dummyjson.com/users/1`) with built-in loading spinners and error handling.
* **Quick Task Creator**: Assign quick tasks instantly with optional descriptions and a required group dropdown (including an option to create a new group on the fly).

### D. Instructions / User Guide Page (`/guide`)
* Step-by-step documentation detailing how to create task groups, add tasks, toggle completion states, delete items, utilize client-side routing, and leverage global state management.

### E & F. Developers & User Information Page (`/developers`)
* Displays retrieved user information from the DummyJSON API, showcasing full profile details, usernames, and avatars with complete error and loading fallback states.

---

## 🛠️ Tech Stack

* **Frontend Library**: React (with React Router DOM for client-side routing)
* **Styling**: Tailwind CSS
* **State Management**: Zustand (for synchronized cross-component data sharing)
* **HTTP Client**: Axios (for external API data retrieval)
* **Build Tool / Deployment**: Vite / Vercel

---

## 📦 Project Structure

```text
protaskinate/
├── public/
├── src/
│   ├── context/
│   │   └── useStore.js       # Zustand global state store
│   ├── pages/
│   │   ├── DashboardPage.jsx   # Home / Dashboard view with API integration
│   │   ├── GroupsPage.jsx      # Task Groups & Categories management
│   │   ├── TaskListPage.jsx    # Group-scoped task folder view
│   │   ├── GuidePage.jsx       # Interactive user guide and tutorial
│   │   └── DevelopersPage.jsx  # API integration & developer profile view
│   ├── App.jsx                 # Root layout & route definitions
│   ├── main.jsx                # Application entry point
│   └── index.css               # Tailwind CSS directives
├── package.json
└── README.md# React + Vite
