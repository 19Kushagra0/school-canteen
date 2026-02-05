"use client";

import "./Student.css";
import Link from "next/link";
import { useState } from "react";
import { useStudentContext } from "@/context/StudentContext";

export default function Student() {
  const { students, addStudent } = useStudentContext();

  // --- State ---
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState("");

  function handleAddStudent() {
    if (!studentName.trim()) return;

    addStudent(studentName);
    setStudentName("");
    setShowModal(false);
  }

  return (
    <section className="students-page">
      <header className="students-header">
        <div>
          <h1 className="students-title">Students</h1>
          <p className="students-subtitle">
            View students and track their spending
          </p>
        </div>

        <button
          className="add-student-btn"
          onClick={() => {
            return setShowModal(true);
          }}
        >
          + Add Student
        </button>
      </header>

      {/* STUDENT LIST */}
      <div className="students-list">
        {students.map((student) => {
          return (
            <Link
              href={`/students/${student.id}`}
              className="student-card"
              key={student.id}
            >
              <div className="student-info">
                <h2 className="student-name">{student.name}</h2>
                <span className="student-code">
                  Referral Code: {student.referralCode}
                </span>
              </div>

              <div className="student-meta">
                <span className="student-spent">₹{student.totalSpent}</span>
                <span className="spent-label">Total Spent</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ADD STUDENT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Student</h3>

            <input
              type="text"
              placeholder="Student name"
              value={studentName}
              onChange={(e) => {
                return setStudentName(e.target.value);
              }}
            />

            <div className="modal-actions">
              <button className="modal-save" onClick={handleAddStudent}>
                Save
              </button>
              <button
                className="modal-cancel"
                onClick={() => {
                  return setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
