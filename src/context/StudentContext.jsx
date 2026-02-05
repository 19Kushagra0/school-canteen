"use client";

import { createContext, useContext, useState } from "react";

// --- Constants ---
const SNACKS_DATA = [
  { id: 1, name: "Samosa", price: 20 },
  { id: 2, name: "Sandwich", price: 40 },
  { id: 3, name: "Cold Coffee", price: 50 },
  { id: 4, name: "Burger", price: 60 },
  { id: 5, name: "Pizza Slice", price: 80 },
  { id: 6, name: "French Fries", price: 45 },
  { id: 7, name: "Noodles", price: 70 },
  { id: 8, name: "Juice", price: 30 },
  { id: 9, name: "Water Bottle", price: 20 },
];

const StudentContext = createContext();

export function StudentProvider({ children }) {
  // --- State ---
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", referralCode: "EDZ123", totalSpent: 320 },
    { id: 2, name: "Priya Singh", referralCode: "EDZ456", totalSpent: 540 },
    { id: 3, name: "Amit Verma", referralCode: "EDZ789", totalSpent: 210 },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, studentId: 1, snack: "Samosa", quantity: 2, amount: 40 },
    { id: 2, studentId: 1, snack: "Cold Coffee", quantity: 1, amount: 50 },
    { id: 3, studentId: 2, snack: "Burger", quantity: 1, amount: 60 },
  ]);

  // --- Actions ---

  /**
   * Added a new order for a specific student.
   * Finds the snack price effectively to calculate the total amount.
   */
  function addOrder(studentId, snackId, quantity) {
    const snack = SNACKS_DATA.find((s) => {
      return s.id === Number(snackId);
    });

    if (!snack) return;

    const newOrder = {
      id: Date.now(),
      studentId: studentId,
      snack: snack.name,
      quantity: quantity,
      amount: snack.price * quantity,
    };

    setOrders((prev) => {
      return [...prev, newOrder];
    });
  }

  function addStudent(name) {
    const newStudent = {
      id: Date.now(),
      name: name,
      referralCode: "EDZ" + Math.floor(Math.random() * 1000),
      totalSpent: 0,
    };

    setStudents((prev) => {
      return [...prev, newStudent];
    });
  }

  // --- Derived State ---
  // Calculates the total spent for each student based on their order history.
  // This ensures the "Total Spent" is always accurate and up-to-date.
  const studentsWithTotal = students.map((student) => {
    const studentOrders = orders.filter((o) => {
      return o.studentId === student.id;
    });
    const totalSpent = studentOrders.reduce((sum, order) => {
      return sum + order.amount;
    }, 0);

    return { ...student, totalSpent };
  });

  return (
    <StudentContext.Provider
      value={{
        students: studentsWithTotal,
        orders,
        snacks: SNACKS_DATA,
        addOrder,
        addStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

// --- Hook ---
export function useStudentContext() {
  return useContext(StudentContext);
}
