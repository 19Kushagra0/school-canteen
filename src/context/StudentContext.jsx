"use client";

import { createContext, useContext, useState } from "react";
// ✅ CHANGED: added useState so orders can update dynamically

const StudentContext = createContext();

// ✅ NEW: Shared snacks data
const SNACKS_DATA = [
  { id: 1, name: "Samosa", price: 20, ordersCount: 15 },
  { id: 2, name: "Sandwich", price: 40, ordersCount: 23 },
  { id: 3, name: "Cold Coffee", price: 50, ordersCount: 18 },
  { id: 4, name: "Burger", price: 60, ordersCount: 12 },
  { id: 5, name: "Pizza Slice", price: 80, ordersCount: 8 },
  { id: 6, name: "French Fries", price: 45, ordersCount: 12 },
  { id: 7, name: "Noodles", price: 70, ordersCount: 7 },
  { id: 8, name: "Juice", price: 30, ordersCount: 20 },
  { id: 9, name: "Water Bottle", price: 20, ordersCount: 20 },
];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      referralCode: "EDZ123",
      totalSpent: 320,
    },
    {
      id: 2,
      name: "Priya Singh",
      referralCode: "EDZ456",
      totalSpent: 540,
    },
    {
      id: 3,
      name: "Amit Verma",
      referralCode: "EDZ789",
      totalSpent: 210,
    },
  ]);

  // ✅ CHANGED: orders is now React STATE (not const array)
  const [orders, setOrders] = useState([
    {
      id: 1,
      studentId: 1,
      snack: "Samosa",
      quantity: 2,
      amount: 40,
    },
    {
      id: 2,
      studentId: 1,
      snack: "Cold Coffee",
      quantity: 1,
      amount: 50,
    },
    {
      id: 3,
      studentId: 2,
      snack: "Burger",
      quantity: 1,
      amount: 60,
    },
  ]);

  // ✅ NEW: function to create a new order
  function addOrder(studentId, snackId, quantity) {
    const snack = SNACKS_DATA.find((s) => s.id === Number(snackId));
    if (!snack) return; // safety check

    const pricePerItem = snack.price;
    const amount = pricePerItem * quantity;

    const newOrder = {
      id: Date.now(),
      studentId,
      snack: snack.name, // Store name for display
      quantity,
      amount,
    };

    // ✅ 1. Add order (use functional update)
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  }

  function addStudent(value) {
    const newStudent = {
      id: Date.now(),
      name: value,
      referralCode: "EDZ" + Math.floor(Math.random() * 1000),
      totalSpent: 0,
    };

    setStudents([...students, newStudent]);
  }

  // ✅ Calculate totals dynamically from orders
  const studentsWithTotal = students.map((student) => {
    const studentOrders = orders.filter((o) => o.studentId === student.id);
    const total = studentOrders.reduce((sum, order) => sum + order.amount, 0);
    return { ...student, totalSpent: total };
  });

  return (
    <StudentContext.Provider
      value={{
        students: studentsWithTotal,
        orders,
        snacks: SNACKS_DATA, // ✅ Expose snacks
        addOrder,
        addStudent,
      }}
    >
      {/* ✅ CHANGED: expose addOrder instead of setOrders */}
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  return useContext(StudentContext);
}
