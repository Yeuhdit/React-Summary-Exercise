// calendar-app/src/components/Calendar.jsx
import React, { useState, useEffect } from "react";
import Day from "./Day.jsx";

export default function Calendar() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const tempDays = [];

    // ימים מהחודש הקודם אם החודש לא מתחיל ביום ראשון
    const startDay = firstDay.getDay(); // 0 = ראשון, 6 = שבת
    if (startDay !== 0) {
      for (let i = startDay - 1; i >= 0; i--) {
        const prevDate = new Date(year, month, -i);
        tempDays.push({ date: prevDate, events: [], currentMonth: false });
      }
    }

    // ימים מהחודש הנוכחי
    for (let d = 1; d <= lastDay.getDate(); d++) {
      tempDays.push({ date: new Date(year, month, d), events: [], currentMonth: true });
    }

    // ימים מהחודש הבא כדי להשלים שבוע אחרון
    const endDay = lastDay.getDay();
    if (endDay !== 6) {
      for (let i = 1; i <= 6 - endDay; i++) {
        const nextDate = new Date(year, month + 1, i);
        tempDays.push({ date: nextDate, events: [], currentMonth: false });
      }
    }

    setDays(tempDays);
  }, []);

  const calendarStyle = {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "700px", // 7 ימים * 100px לכל יום
    margin: "0 auto",
  };

  return (
    <div style={calendarStyle}>
      {days.map((day, index) => (
        <Day key={index} day={day} onClick={() => alert("Add event")} />
      ))}
    </div>
  );
}
