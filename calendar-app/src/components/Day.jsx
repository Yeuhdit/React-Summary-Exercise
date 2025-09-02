export default function Day({ day, onClick }) {
  const today = new Date();
  const currentMonth = today.getMonth();

  const isSaturday = day.date.getDay() === 6;
  const isCurrentMonth = day.date.getMonth() === currentMonth;

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
    backgroundColor: isSaturday ? "#b7e4c7" : isCurrentMonth ? "#fff" : "#f1f3f5",
    color: isCurrentMonth ? "#000" : "#adb5bd",
    cursor: "pointer",
  };

  return (
    <div style={dayStyle} onClick={onClick}>
      <div>{day.date.getDate()}</div>
      {day.events.length > 0 && <div>אירועים: {day.events.length}</div>}
    </div>
  );
}
