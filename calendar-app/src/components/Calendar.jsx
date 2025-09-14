// calendar-app/src/components/Calendar.jsx
import React, { useState, useEffect } from "react";
import Day from "./Day.jsx";
import EventForm from "./EventForm.jsx";
import axios from "axios";

export default function Calendar() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchDays = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const tempDays = [];

      // ימים מהחודש הקודם
      const startDay = firstDay.getDay();
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

      // ימים מהחודש הבא
      const endDay = lastDay.getDay();
      if (endDay !== 6) {
        for (let i = 1; i <= 6 - endDay; i++) {
          const nextDate = new Date(year, month + 1, i);
          tempDays.push({ date: nextDate, events: [], currentMonth: false });
        }
      }

      // GET אירועים מהשרת
      try {
        const res = await axios.get("http://localhost:3001/events");
        const events = res.data;

        // התאם אירועים לימים
        events.forEach((ev) => {
          const dayIndex = tempDays.findIndex(
            (d) => new Date(d.date).toDateString() === new Date(ev.date).toDateString()
          );
          if (dayIndex !== -1) {
            tempDays[dayIndex].events.push(ev.name);
          }
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }

      setDays(tempDays);
    };

    fetchDays();
  }, []);

  const handleEventAdded = async (event) => {
    try {
      const res = await axios.post("http://localhost:3001/events", event);
      const addedEvent = res.data;

      setDays((prevDays) =>
        prevDays.map((day) =>
          day.date.toDateString() === new Date(addedEvent.date).toDateString()
            ? { ...day, events: [...day.events, addedEvent.name] }
            : day
        )
      );

      setSelectedDay(null); // סוגר את הטופס אחרי הוספה
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const calendarStyle = {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "700px",
    margin: "0 auto",
  };

  return (
    <div>
      <div style={calendarStyle}>
        {days.map((day, index) => (
          <Day
            key={index}
            day={day}
            onClick={() => setSelectedDay(day)}
          />
        ))}
      </div>

      {selectedDay && (
        <EventForm date={selectedDay.date} onEventAdded={handleEventAdded} />
      )}
    </div>
  );
}
