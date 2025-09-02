import React, { useState, useEffect } from "react";
import Day from "./Day";

export default function Calendar() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null); // היום שנבחר להוספת אירוע
  const [newEvent, setNewEvent] = useState(""); // שם האירוע החדש

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const tempDays = [];

    const startDayIndex = firstDayOfMonth.getDay();
    for (let i = startDayIndex - 1; i >= 0; i--) {
      tempDays.push({ date: new Date(year, month, -i), events: [] });
    }

    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      tempDays.push({ date: new Date(year, month, d), events: [] });
    }

    const endDayIndex = lastDayOfMonth.getDay();
    for (let i = 1; i < 7 - endDayIndex; i++) {
      tempDays.push({ date: new Date(year, month + 1, i), events: [] });
    }

    setDays(tempDays);
  }, []);

  const addEvent = () => {
    if (!newEvent) return;
    const updatedDays = days.map((day) =>
      day === selectedDay ? { ...day, events: [...day.events, newEvent] } : day
    );
    setDays(updatedDays);
    setNewEvent("");
    setSelectedDay(null);
  };

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        {rows.map((week, index) => (
          <div key={index} style={{ display: "flex" }}>
            {week.map((day, idx) => (
              <Day
                key={idx}
                day={day}
                onClick={() => setSelectedDay(day)}
              />
            ))}
          </div>
        ))}
      </div>

      {selectedDay && (
        <div style={{ padding: "10px", border: "1px solid gray" }}>
          <h3>הוסף אירוע ליום {selectedDay.date.getDate()}</h3>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="שם האירוע"
          />
          <button onClick={addEvent}>הוסף</button>
          <button onClick={() => setSelectedDay(null)}>בטל</button>
        </div>
      )}
    </div>
  );
}
