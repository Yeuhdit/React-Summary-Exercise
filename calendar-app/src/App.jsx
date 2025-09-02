// src/App.jsx
import React from "react";
import Calendar from "./components/Calendar";

export default function App() {
  // לדוגמה – ימים עם תאריכים מה-1 עד 14 לחודש
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 31; i++) {
    days.push({
      date: new Date(today.getFullYear(), today.getMonth(), i),
      events: [],
    });
  }

  return (
    <div>
      <h1>לוח שנה</h1>
      <Calendar days={days} />
    </div>
  );
}
