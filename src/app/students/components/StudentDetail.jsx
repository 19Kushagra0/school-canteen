"use client";
import "./StudentDetail.css";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function StudentDetail() {
  const { orders, addOrders, students, SNACKS_DATA } = useStudent();

  const params = useParams();
  const { id } = params;
  const idNumber = Number(id);

  const filterOrders = orders.filter((filterOrder) => {
    return filterOrder.studentId === idNumber;
  });

  const [selectedSnack, setSelectedSnack] = useState("");
  const selectedSnackHandler = (e) => {
    setSelectedSnack(e.target.value);
  };

  // show order modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const showOrderModalHandler = () => {
    setShowOrderModal(!showOrderModal);
  };

  // quantity handler
  const [quantity, setQuantity] = useState(1);
  const quantityHandler = (e) => {
    setQuantity(Number(e.target.value));
  };

  const saveOrder = () => {
    if (selectedSnack === "") {
      alert("Hey! You forgot to pick a snack.");
      return; // This stops the function right here so nothing breaks
    }

    const snackNumber = Number(selectedSnack);

    console.log("quantity", quantity);
    console.log("name ", SNACKS_DATA[snackNumber].name);
    console.log(" price", SNACKS_DATA[snackNumber].price);
    console.log("studentId", idNumber);

    const order = {
      studentId: idNumber,
      snack: SNACKS_DATA[snackNumber].name,
      quantity: quantity,
      amount: SNACKS_DATA[snackNumber].price * quantity,
    };
    addOrders(order);

    setQuantity(1);
    setSelectedSnack("");
    showOrderModalHandler();
  };

  return (
    <section className="student-detail-page">
      <Link href="/students" className="back-link">
        ← Back to Students
      </Link>

      {/* STUDENT SUMMARY */}
      <div className="student-summary-card">
        {/* ✅ CHANGED: dynamic student data */}
        <h1 className="student-name">{students[id - 1].name}</h1>
        <p className="student-code">{students[id - 1].referralCode}</p>

        <div className="student-total">
          <span>Total Spent</span>
          <strong>₹{students[id - 1].totalSpent}</strong>
        </div>
      </div>

      {/* ORDERS */}
      <div className="orders-section">
        <h2 className="section-title">Order History</h2>

        <div className="orders-list">
          {filterOrders.length === 0 ? (
            <div className="">No order yet</div>
          ) : (
            filterOrders.map((order, index) => {
              return (
                <div key={index} className="order-row">
                  <div>
                    <p className="order-snack">{order.snack}</p>
                    <span className="order-qty">{order.quantity}</span>
                  </div>
                  <span className="order-amount">₹{order.amount}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <button onClick={showOrderModalHandler} className="place-order-btn">
        Place New Order
      </button>

      {showOrderModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Order</h3>

            <select
              value={selectedSnack}
              onChange={selectedSnackHandler}
              className="snack-select"
            >
              <option value="">-- Click to choose --</option>{" "}
              {/* This matches your "" state */}
              {SNACKS_DATA.map((el, index) => {
                return (
                  <option key={index} value={index}>
                    {el.name} - ₹{el.price}
                  </option>
                );
              })}
            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={quantityHandler}
            />

            <div className="modal-actions">
              <button onClick={saveOrder} className="modal-save">
                Save
              </button>

              <button onClick={showOrderModalHandler} className="modal-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
