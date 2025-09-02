// src/components/Day.jsx
import React from "react";

export default function Day({ day }) {
  const isSaturday = day.date.getDay() === 6; // שבת
  const dayStyle = {
    border: "1px solid gray",
    padding: "10px",
    margin: "2px",
    width: "100px",
    height: "80px",
    backgroundColor: isSaturday ? "#b7e4c7" : "#fff", // שבת ירוקה
    color: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={dayStyle}>
      <div>{day.date.getDate()}</div>
      {day.events.length > 0 && <div>אירועים: {day.events.length}</div>}
    </div>
  );
}
