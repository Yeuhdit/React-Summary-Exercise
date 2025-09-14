// calendar-app/src/components/EventForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function EventForm({ date, onEventAdded }) {
  const [eventName, setEventName] = useState("");

  const addEvent = async () => {
    if (!eventName) return;
    try {
      // ניתן להוסיף axios POST לשרת כאן
      // const res = await axios.post("http://localhost:3001/events", { name: eventName, date });
      // onEventAdded(res.data);

      // לעת עתה מוסיפים ישירות ל־state
      onEventAdded({ name: eventName, date });
      setEventName("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>הוסף אירוע ליום {new Date(date).toLocaleDateString()}</h3>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="שם האירוע"
      />
      <button onClick={addEvent}>הוסף</button>
    </div>
  );
}
