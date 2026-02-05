"use client";

import "./StudentDetail.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStudentContext } from "@/context/StudentContext";
import { useState } from "react";

export default function StudentDetail() {
  const { students, orders, snacks, addOrder } = useStudentContext();

  // --- State ---
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [snackId, setSnackId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const studentId = Number(params.id);

  const student = students.find((s) => {
    return s.id === studentId;
  });

  const studentOrders = orders.filter((order) => {
    return order.studentId === studentId;
  });

  // ✅ NEW: safety check
  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <section className="student-detail-page">
      <Link href="/students" className="back-link">
        ← Back to Students
      </Link>

      {/* STUDENT SUMMARY */}
      <div className="student-summary-card">
        {/* ✅ CHANGED: dynamic student data */}
        <h1 className="student-name">{student.name}</h1>
        <p className="student-code">Referral Code: {student.referralCode}</p>

        <div className="student-total">
          <span>Total Spent</span>
          <strong>₹{student.totalSpent}</strong>
        </div>
      </div>

      {/* ORDERS */}
      <div className="orders-section">
        <h2 className="section-title">Order History</h2>

        {/* ✅ NEW: show message if no orders */}
        {studentOrders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="orders-list">
            {studentOrders.map((order) => {
              return (
                <div className="order-row" key={order.id}>
                  <div>
                    <p className="order-snack">{order.snack}</p>
                    <span className="order-qty">Qty: {order.quantity}</span>
                  </div>
                  <span className="order-amount">₹{order.amount}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        className="place-order-btn"
        onClick={() => {
          return setShowOrderModal(true);
        }}
      >
        Place New Order
      </button>

      {/* ORDER MODAL */}
      {showOrderModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Order</h3>

            <select
              value={snackId}
              onChange={(e) => {
                return setSnackId(e.target.value);
              }}
              className="snack-select"
            >
              <option value="">Select a snack</option>
              {snacks.map((snack) => {
                return (
                  <option key={snack.id} value={snack.id}>
                    {snack.name} - ₹{snack.price}
                  </option>
                );
              })}
            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                return setQuantity(Number(e.target.value));
              }}
            />

            <div className="modal-actions">
              <button
                className="modal-save"
                onClick={() => {
                  if (!snackId) return;
                  addOrder(studentId, snackId, quantity);
                  setSnackId("");
                  setQuantity(1);
                  setShowOrderModal(false);
                }}
              >
                Save
              </button>

              <button
                className="modal-cancel"
                onClick={() => {
                  return setShowOrderModal(false);
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
