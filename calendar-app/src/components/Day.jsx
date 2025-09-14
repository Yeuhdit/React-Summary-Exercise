// calendar-app/src/components/Day.jsx
import React from "react";

export default function Day({ day, onClick }) {
  const isSaturday = day.date.getDay() === 6;

  const dayStyle = {
    border: "1px solid gray",
    padding: "10px",
    margin: "2px",
    width: "100px",
    height: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: !day.currentMonth ? "#f0f0f0" : isSaturday ? "#b7e4c7" : "#fff",
    color: !day.currentMonth ? "#aaa" : "#000",
  };

  return (
    <div style={dayStyle} onClick={onClick}>
      <div>{day.date.getDate()}</div>
      {day.events.length > 0 && <div>Events: {day.events.length}</div>}
    </div>
  );
}
