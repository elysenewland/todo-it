"use client";

import React, { useState } from "react";
import "./list.css";

export default function List() {
  let [input, setInput] = useState("");
  let [listItems, setListItems] = useState([]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (input) {
      setListItems([...listItems, { text: input, checked: false }]);
      setInput("");
    }
  };

  const toggleChecked = (index) => {
    const updatedItems = [...listItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    setListItems(updatedItems);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="list-item-input">
          List Item Input
        </label>
        <input
          id="list-item-input"
          className="list-item-input"
          type="text"
          placeholder="ex. wash the dog"
          onChange={onInputChange}
          value={input}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul className="list">
        {listItems.map((item, index) => (
          <li className="list-item" key={index}>
            <label
              className="sr-only checkbox-label"
              htmlFor={`checkbox-${index}`}
            >
              List item checkbox
            </label>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={item.checked}
              onChange={() => toggleChecked(index)}
            />
            <span
              style={item.checked ? { textDecoration: "line-through" } : {}}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
