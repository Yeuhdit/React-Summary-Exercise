import React, { useState } from "react";
import axios from "axios";

export default function EventForm({ date, onEventAdded }) {
  const [eventName, setEventName] = useState("");

  const addEvent = async () => {
    if (!eventName) return;
    try {
      const res = await axios.post("http://localhost:3001/events", {
        name: eventName,
        date,
      });
      onEventAdded(res.data);
      setEventName("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div>
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
