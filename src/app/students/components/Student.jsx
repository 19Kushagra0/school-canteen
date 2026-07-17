"use client";

import styles from "./Student.module.css";
import stylesModal from "./StudentModal.module.css";
import Link from "next/link";
import { useState } from "react";
import { useStudent } from "@/context/StudentContext";

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
    if (!studentValue.trim()) return;

    addStudents(studentValue);
    setStudentValue("");
    setShowModal(false);
  };

  return (
    <section className={styles["students-page"]}>
      <header className={styles["students-header"]}>
        <div>
          <h1 className={styles["students-title"]}>Students</h1>
          <p className={styles["students-subtitle"]}>
            View students and track their spending
          </p>
        </div>

        <button
          onClick={showModalHandler}
          className={styles["add-student-btn"]}
        >
          + Add Student
        </button>
      </header>

      {/* STUDENT LIST */}
      <div className={styles["students-list"]}>
        {students.map((student, index) => (
          <Link
            key={index}
            href={`/students/${student.id}`}
            className={styles["student-card"]}
          >
            <div className={styles["student-info"]}>
              <h2 className={styles["student-name"]}>{student.name}</h2>
              <span className={styles["student-code"]}>
                Referral Code: {student.referralCode}
              </span>
            </div>

            <div className={styles["student-meta"]}>
              <span className={styles["student-spent"]}>
                ₹{student.totalSpent}
              </span>
              <span className={styles["spent-label"]}>Total Spent</span>
            </div>
          </Link>
        ))}
      </div>

      {showModal && (
        <div className={stylesModal["modal-overlay"]}>
          <div className={stylesModal.modal}>
            <h3>Add Student</h3>

            <input
              onChange={studentValueHandler}
              value={studentValue}
              type="text"
              placeholder="Student name"
            />

            <div className={stylesModal["modal-actions"]}>
              <button
                onClick={handleAddStudent}
                className={stylesModal["modal-save"]}
              >
                Save
              </button>
              <button
                onClick={showModalHandler}
                className={stylesModal["modal-cancel"]}
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
