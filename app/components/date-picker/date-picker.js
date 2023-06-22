import React, { useRef, useState, useEffect } from "react";
import "./date-picker.css";

const DatePicker = ({ index }) => {
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);

  useEffect(() => {
    const storedDate = localStorage.getItem(`date-${index}`);
    if (storedDate) {
      setDate(JSON.parse(storedDate));
    }
  }, []);

  const handleChange = (event) => {
    const updatedDate = event.target.value;
    setDate(updatedDate);
    localStorage.setItem(`date-${index}`, JSON.stringify(updatedDate));
  };

  return (
    <div>
      <form>
        <label className="date-picker-label" htmlFor={`date-${index}`}>
          {" "}
          Due by: {""}
          <input
            className="date-picker-input"
            id={`date-${index}`}
            type="date"
            value={date}
            onChange={handleChange}
            ref={dateInputRef}
          />
        </label>
      </form>
    </div>
  );
};

export default DatePicker;
