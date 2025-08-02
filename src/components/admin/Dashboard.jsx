// components/admin/Dashboard.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-neutral-800 text-white">
        <Outlet />
      </main>
    </div>
  );
}
