"use client";
import { createContext, useState } from "react";
import { useContext } from "react";

// create box
const StudentContext = createContext();

// snacks data
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
  // students
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", referralCode: "EDZ1", totalSpent: 90 },
    { id: 2, name: "Priya Singh", referralCode: "EDZ2", totalSpent: 60 },
    { id: 3, name: "Amit Verma", referralCode: "EDZ3", totalSpent: 0 },
  ]);

  const addStudents = (student) => {
    const newStudent = {
      id: students.length + 1,
      name: student,
      referralCode: `EDZ${students.length + 1}`,
      totalSpent: 0,
    };
    setStudents([...students, newStudent]);
  };

  // orders
  const [orders, setOrders] = useState([
    { id: 1, studentId: 1, snack: "Samosa", quantity: 2, amount: 40 },
    { id: 2, studentId: 1, snack: "Cold Coffee", quantity: 1, amount: 50 },
    { id: 3, studentId: 2, snack: "Burger", quantity: 1, amount: 60 },
  ]);

  const addOrders = (order) => {
    const newOrder = {
      id: orders.length + 1,
      studentId: order.studentId,
      snack: order.snack,
      quantity: order.quantity,
      amount: order.amount,
    };
    setOrders([...orders, newOrder]);

    // 2. NOW, update that specific student's total money
    const updatedStudents = students.map((s) => {
      if (s.id === order.studentId) {
        // If this is the student who ordered, add the new amount to their old total
        return { ...s, totalSpent: s.totalSpent + order.amount };
      }
      // If it's not them, don't change anything
      return s;
    });

    setStudents(updatedStudents);
  };

  return (
    // putting array in box
    <StudentContext.Provider
      value={{ SNACKS_DATA, students, addStudents, orders, addOrders }}
    >
      {children}
    </StudentContext.Provider>
  );
}

// export the box
export function useStudent() {
  return useContext(StudentContext);
}
