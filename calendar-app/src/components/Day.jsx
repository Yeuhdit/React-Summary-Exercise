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
    backgroundColor: isSaturday ? "#b7e4c7" : "#fff",
    cursor: "pointer",
  };

  return (
    <div style={dayStyle} onClick={onClick}>
      <div>{day.date.getDate()}</div>
      {day.events.length > 0 && <div>Events: {day.events.length}</div>}
    </div>
  );
}
