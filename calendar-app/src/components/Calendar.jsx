import React, { useState, useEffect } from "react";
import Day from "./Day";
import axios from "axios";

export default function Calendar() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/events"); // כתובת השרת שלך
        const eventsFromServer = res.data; // מערך של אירועים עם תאריכים
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const tempDays = [];

        // ימים מהחודש הקודם
        const startDayIndex = firstDayOfMonth.getDay();
        for (let i = startDayIndex - 1; i >= 0; i--) {
          tempDays.push({ date: new Date(year, month, -i), events: [] });
        }

        // ימים מהחודש הנוכחי
        for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
          const date = new Date(year, month, d);
          const dayEvents = eventsFromServer.filter(
            (ev) => new Date(ev.date).toDateString() === date.toDateString()
          );
          tempDays.push({ date, events: dayEvents.map((ev) => ev.name) });
        }

        // ימים מהחודש הבא
        const endDayIndex = lastDayOfMonth.getDay();
        for (let i = 1; i < 7 - endDayIndex; i++) {
          tempDays.push({ date: new Date(year, month + 1, i), events: [] });
        }

        setDays(tempDays);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async () => {
    if (!newEvent) return;

    try {
      const res = await axios.post("http://localhost:3001/events", {
        name: newEvent,
        date: selectedDay.date,
      });
      const eventFromServer = res.data;

      const updatedDays = days.map((day) =>
        day === selectedDay
          ? { ...day, events: [...day.events, eventFromServer.name] }
          : day
      );
      setDays(updatedDays);
      setNewEvent("");
      setSelectedDay(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
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
              <Day key={idx} day={day} onClick={() => setSelectedDay(day)} />
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
