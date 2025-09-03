import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Calendar from "./components/Calendar.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddEvent from "./pages/AddEvent.jsx";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Calendar</Link> | <Link to="/add">Add Event</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
