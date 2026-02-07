"use client";

import { createContext, useContext, useState, useEffect } from "react";

// create context
const StudentContext = createContext();

// snacks data (static, safe for SSR)
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

export function StudentProvider({ children }) {
  // students (default state for SSR + hydration)
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", referralCode: "EDZ1", totalSpent: 90 },
    { id: 2, name: "Priya Singh", referralCode: "EDZ2", totalSpent: 60 },
    { id: 3, name: "Amit Verma", referralCode: "EDZ3", totalSpent: 0 },
  ]);

  // orders (empty by default)
  const [orders, setOrders] = useState([]);

  // flag to prevent hydration mismatch
  const [isLoaded, setIsLoaded] = useState(false);

  // load from localStorage AFTER client mount
  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    const savedOrders = localStorage.getItem("orders");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    setIsLoaded(true);
  }, []);

  // save students to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, isLoaded]);

  // save orders to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  // add student
  const addStudents = (studentName) => {
    const newStudent = {
      id: students.length + 1,
      name: studentName,
      referralCode: `EDZ${students.length + 1}`,
      totalSpent: 0,
    };

    setStudents([...students, newStudent]);
  };

  // add order
  const addOrders = (order) => {
    const newOrder = {
      id: orders.length + 1,
      studentId: order.studentId,
      snack: order.snack,
      quantity: order.quantity,
      amount: order.amount,
    };

    // add order
    setOrders([...orders, newOrder]);

    // update ONLY the student who placed this order
    const updatedStudents = students.map((s) => {
      if (s.id === order.studentId) {
        return { ...s, totalSpent: s.totalSpent + order.amount };
      }
      return s;
    });

    setStudents(updatedStudents);
  };

  // prevent render until client data is ready
  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <StudentContext.Provider
      value={{
        SNACKS_DATA,
        students,
        orders,
        addStudents,
        addOrders,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

// custom hook
export function useStudent() {
  return useContext(StudentContext);
}
