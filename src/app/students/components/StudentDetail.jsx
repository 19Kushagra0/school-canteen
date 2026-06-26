"use client";

import styles from "./StudentDetail.module.css";
import stylesModal from "./StudentModal.module.css";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function StudentDetail() {
  const { orders, addOrders, students, SNACKS_DATA } = useStudent();

  const params = useParams();
  const { id } = params;
  const idNumber = Number(id);

  const filterOrders = orders.filter(
    (filterOrder) => filterOrder.studentId === idNumber,
  );

  const [selectedSnack, setSelectedSnack] = useState("");
  const selectedSnackHandler = (e) => {
    setSelectedSnack(e.target.value);
  };

  const [showOrderModal, setShowOrderModal] = useState(false);
  const showOrderModalHandler = () => {
    setShowOrderModal(!showOrderModal);
  };

  const [quantity, setQuantity] = useState(1);
  const quantityHandler = (e) => {
    setQuantity(Number(e.target.value));
  };

  const saveOrder = () => {
    if (selectedSnack === "") {
      alert("Hey! You forgot to pick a snack.");
      return;
    }

    const snackNumber = Number(selectedSnack);

    const order = {
      studentId: idNumber,
      snack: SNACKS_DATA[snackNumber].name,
      quantity,
      amount: SNACKS_DATA[snackNumber].price * quantity,
    };

    addOrders(order);

    setQuantity(1);
    setSelectedSnack("");
    setShowOrderModal(false);
  };

  return (
    <section className={styles["student-detail-page"]}>
      <Link href="/students" className={styles["back-link"]}>
        ← Back to Students
      </Link>

      {/* STUDENT SUMMARY */}
      <div className={styles["student-summary-card"]}>
        <h1 className={styles["student-name"]}>{students[id - 1].name}</h1>
        <p className={styles["student-code"]}>
          {students[id - 1].referralCode}
        </p>

        <div className={styles["student-total"]}>
          <span>Total Spent</span>
          <strong>₹{students[id - 1].totalSpent}</strong>
        </div>
      </div>

      {/* ORDERS */}
      <div className={styles["orders-section"]}>
        <h2 className={styles["section-title"]}>Order History</h2>

        <div className={styles["orders-list"]}>
          {filterOrders.length === 0 ? (
            <div>No order yet</div>
          ) : (
            filterOrders.map((order, index) => (
              <div key={index} className={styles["order-row"]}>
                <div>
                  <p className={styles["order-snack"]}>{order.snack}</p>
                  <span className={styles["order-qty"]}>{order.quantity}</span>
                </div>
                <span className={styles["order-amount"]}>₹{order.amount}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={showOrderModalHandler}
        className={styles["place-order-btn"]}
      >
        Place New Order
      </button>

      {showOrderModal && (
        <div className={stylesModal["modal-overlay"]}>
          <div className={stylesModal.modal}>
            <h3>Add Order</h3>

            <select
              value={selectedSnack}
              onChange={selectedSnackHandler}
              className={styles["snack-select"]}
            >
              <option value="">-- Click to choose --</option>
              {SNACKS_DATA.map((el, index) => (
                <option key={index} value={index}>
                  {el.name} - ₹{el.price}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={quantityHandler}
            />

            <div className={stylesModal["modal-actions"]}>
              <button onClick={saveOrder} className={stylesModal["modal-save"]}>
                Save
              </button>

              <button
                onClick={showOrderModalHandler}
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
