"use client";

import "./Snacks.css";
import { useStudent } from "@/context/StudentContext";

export default function Snacks() {
  const { SNACKS_DATA } = useStudent();

  return (
    <section className="snacks-page">
      <header className="snacks-header">
        <h1 className="snacks-title">Snacks You’ll Love</h1>
        <p className="snacks-subtitle">
          Pick a snack and order it in just a few clicks
        </p>
      </header>

      <div className="snacks-list">
        {SNACKS_DATA.map((snack, index) => {
          return (
            <div key={index} className="snack-card">
              <div className="snack-info">
                <h2 className="snack-name">{snack.name}</h2>
                <span className="snack-orders"> </span>
              </div>

              <div className="snack-footer">
                <span className="snack-price">₹{snack.price}</span>
              </div>
            </div>
          );
        })}
        <div className="snack-card ghost" />
        <div className="snack-card ghost" />
        <div className="snack-card ghost" />
      </div>
    </section>
  );
}
