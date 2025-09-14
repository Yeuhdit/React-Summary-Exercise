// calendar-app/src/components/Calendar.jsx
import React, { useState, useEffect } from "react";
import Day from "./Day.jsx";
import EventForm from "./EventForm.jsx";

export default function Calendar() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
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

    setDays(tempDays);
  }, []);

  // הוספת אירוע ליום
  const handleEventAdded = (event) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.date.toDateString() === new Date(event.date).toDateString()
          ? { ...day, events: [...day.events, event.name] }
          : day
      )
    );
    setSelectedDay(null); // סוגר את הטופס אחרי הוספה
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
