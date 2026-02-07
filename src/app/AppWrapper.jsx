"use client";
import Navbar from "../components/ui/Navbar/Navbar";
// importing context
import { StudentProvider } from "../context/StudentContext";

export default function AppWrapper({ children }) {
  return (
    // wrapping the app with context
    <StudentProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="app-content">{children}</main>
      </div>
    </StudentProvider>
  );
}
