"use client";

import "./Student.css";
import Link from "next/link";
import { useState } from "react";
import { useStudent } from "@/context//StudentContext";

export default function Student() {
  const { students, addStudents } = useStudent();
  const [studentValue, setStudentValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const studentValueHandler = (e) => {
    setStudentValue(e.target.value);
  };

  const handleAddStudent = () => {
    if (!studentValue.trim()) {
      return;
    }
    addStudents(studentValue);

    setStudentValue("");
    setShowModal();
  };

  return (
    <section className="students-page">
      <header className="students-header">
        <div>
          <h1 className="students-title">Students</h1>
          <p className="students-subtitle">
            View students and track their spending
          </p>
        </div>

        <button onClick={showModalHandler} className="add-student-btn">
          + Add Student
        </button>
      </header>

      {/* STUDENT LIST */}
      <div className="students-list">
        {students.map((student, index) => {
          return (
            <Link
              key={index}
              href={`/students/${student.id}`}
              className="student-card"
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Student</h3>

            <input
              onChange={studentValueHandler}
              value={studentValue}
              type="text"
              placeholder="Student name"
            />

            <div className="modal-actions">
              <button onClick={handleAddStudent} className="modal-save">
                Save
              </button>
              <button onClick={showModalHandler} className="modal-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
