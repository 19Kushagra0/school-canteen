"use client";

import styles from "./Snacks.module.css";
import stylesModal from "@/app/students/components/StudentModal.module.css";
import { useStudent } from "@/context/StudentContext";
import { useState } from "react";

export default function Snacks() {
  const { SNACKS_DATA, students, addOrders } = useStudent();
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // quantity input
  const [inputQuantity, setInputQuantity] = useState(1);
  const quantityHandler = (e) => {
    setInputQuantity(Number(e.target.value));
  };

  const [selectedStudent, setSelectedStudent] = useState("");
  const selectedStudentHandler = (e) => {
    setSelectedStudent(e.target.value);
  };

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const handleAddStudent = () => {
    if (!selectedSnack) return;

    if (!selectedStudent) {
      alert("Please select a student!");
      return;
    }

    const studentId = Number(selectedStudent);
    const student = students.find((s) => s.id === studentId);

    console.log("student", student?.name);
    console.log("name", selectedSnack.name);
    console.log("Quantity", inputQuantity);
    console.log("price", selectedSnack.price);

    addOrders({
      studentId: studentId,
      snack: selectedSnack.name,
      quantity: inputQuantity,
      amount: selectedSnack.price * inputQuantity,
    });

    setShowModal(false);
  };

  return (
    <section className={styles["snacks-page"]}>
      <header className={styles["snacks-header"]}>
        <h1 className={styles["snacks-title"]}>Snacks You’ll Love</h1>
        <p className={styles["snacks-subtitle"]}>
          Pick a snack and order it in just a few clicks
        </p>
      </header>

      <div className={styles["snacks-list"]}>
        {SNACKS_DATA.map((snack, index) => {
          return (
            <div key={index} className={styles["snack-card"]}>
              <div className={styles["snack-info"]}>
                <h2 className={styles["snack-name"]}>{snack.name}</h2>
                <span className={styles["snack-orders"]}></span>
              </div>

              <div className={styles["snack-footer"]}>
                <span className={styles["snack-price"]}>₹{snack.price}</span>
                <button
                  onClick={() => {
                    showModalHandler();
                    setSelectedSnack(snack);
                  }}
                  className={styles["snack-button"]}
                >
                  Order Now
                </button>
              </div>
            </div>
          );
        })}

        <div className={`${styles["snack-card"]} ${styles.ghost}`} />
        <div className={`${styles["snack-card"]} ${styles.ghost}`} />
        <div className={`${styles["snack-card"]} ${styles.ghost}`} />
      </div>

      {showModal && (
        <div className={stylesModal["modal-overlay"]}>
          <div className={stylesModal.modal}>
            <h3> Add Student</h3>

            <select
              value={selectedStudent}
              onChange={selectedStudentHandler}
              className={styles["snack-select"]}
            >
              <option value="">-- Click to choose --</option>
              {students.map((el, index) => {
                return (
                  <option value={el.id} key={index}>
                    {el.name}
                  </option>
                );
              })}
            </select>

            <input
              value={inputQuantity}
              onChange={quantityHandler}
              type="number"
              min="1"
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
