"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "../date-picker/date-picker.js";
import "./list.css";

export default function List() {
  let [input, setInput] = useState("");
  let [listItems, setListItems] = useState([]);

  // Use useEffect hook to allow localStorage to avoid initial "localStorage is not defined error" caused by Next.js rendering server side first.
  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setListItems(JSON.parse(storedList));
    }
  }, []);

  // Target any input change in form.
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // On form submission, update the list of items with text input and set initial value of checked to false. Reset input to empty.
  const onSubmit = (event) => {
    event.preventDefault();
    if (input) {
      const updatedList = [...listItems, { text: input, checked: false }];
      setListItems(updatedList);
      setInput("");
      localStorage.setItem("list", JSON.stringify(updatedList));
    }
  };

  // Allows user to toggle checkboxes to checked or unchecked. If an item is checked, move it to the bottom of the array(list). Set the items in localStorage to reflect the updated checked status.
  const toggleChecked = (index) => {
    const updatedItems = [...listItems];
    updatedItems[index].checked = !updatedItems[index].checked;

    if (updatedItems[index].checked) {
      updatedItems.push(updatedItems.splice(index, 1)[0]);
    }

    setListItems(updatedItems);
    localStorage.setItem("list", JSON.stringify(updatedItems));
  };

  // When the delete items button is clicked, the function checks for any unchecked items and sets the list to only include those items. Therefore, any checked items are deleted.
  const onClickDelete = () => {
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
        {/* <button className="list-button" type="submit">Add Item</button> */}
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
              className="list-input"
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
            <DatePicker index={index} />
          </li>
        ))}
      </ul>
      <button className="list-button" onClick={onClickDelete} type="submit">
        Delete completed items
      </button>
    </div>
  );
}
