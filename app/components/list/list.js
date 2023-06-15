"use client";

import React, { useState, useEffect } from "react";
import "./list.css";

export default function List() {
  let [input, setInput] = useState("");
  let [listItems, setListItems] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setListItems(JSON.parse(storedList));
    }
  }, []);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (input) {
      const updatedList = [...listItems, { text: input, checked: false }];
      setListItems(updatedList);
      setInput("");
      localStorage.setItem("list", JSON.stringify(updatedList));
    }
  };

  const toggleChecked = (index) => {
    const updatedItems = [...listItems];
    updatedItems[index].checked = !updatedItems[index].checked;

    if (updatedItems[index].checked) {
      updatedItems.push(updatedItems.splice(index, 1)[0]);
    }

    setListItems(updatedItems);
    localStorage.setItem("list", JSON.stringify(updatedItems));
  };

  const onClick = () => {
    const uncheckedItems = listItems.filter((item) => !item.checked);
    setListItems(uncheckedItems);
    localStorage.setItem("list", JSON.stringify(uncheckedItems));
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
      <button onClick={onClick} type="submit">
        Delete completed items
      </button>
    </div>
  );
}
