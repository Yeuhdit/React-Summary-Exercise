// src/components/Calendar.jsx
import React, { useState, useEffect } from "react";
import Day from "./Day";

export default function Calendar() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-11

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // היום האחרון בחודש

    const tempDays = [];

    // --- ימים מהחודש הקודם כדי להתחיל שבוע מיום ראשון ---
    const startDayIndex = firstDayOfMonth.getDay(); // 0 = ראשון, 6 = שבת
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i); // ימים מהחודש הקודם
      tempDays.push({ date: prevDate, events: [] });
    }

    // --- ימים מהחודש הנוכחי ---
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      tempDays.push({ date: new Date(year, month, d), events: [] });
    }

    // --- ימים מהחודש הבא כדי להשלים שבוע אחרון ---
    const endDayIndex = lastDayOfMonth.getDay(); // 0 = ראשון, 6 = שבת
    for (let i = 1; i < 7 - endDayIndex; i++) {
      tempDays.push({ date: new Date(year, month + 1, i), events: [] });
    }

    setDays(tempDays);
  }, []);

  // --- יצירת שורות של 7 ימים ---
  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div>
      {rows.map((week, index) => (
        <div key={index} style={{ display: "flex" }}>
          {week.map((day, idx) => (
            <Day key={idx} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
}
