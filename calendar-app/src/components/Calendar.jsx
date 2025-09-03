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
    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
      tempDays.push({ date: new Date(year, month, d), events: [] });
    }
    setDays(tempDays);
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {days.map((day, index) => (
        <Day key={index} day={day} onClick={() => alert("Add event")} />
      ))}
    </div>
  );
}
