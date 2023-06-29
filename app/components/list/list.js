"use client";

import React, { useState, useEffect } from "react";
// import DatePicker from "../date-picker/date-picker.js";
import "./list.css";

export default function List() {
  let [input, setInput] = useState("");
  let [listItems, setListItems] = useState([]);
  let [completedItems, setCompletedItems] = useState([]);

  // Use useEffect hook to allow localStorage to avoid initial "localStorage is not defined error" caused by Next.js rendering server side first.
  useEffect(() => {
    const storedList = localStorage.getItem("list");
    const completedList = localStorage.getItem("completed-list");
    if (storedList && completedList) {
      setListItems(JSON.parse(storedList));
      setCompletedItems(JSON.parse(completedList));
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

    // When toggleChecked is called in the input onChange, change the checkbox from checked to unchecked or unchecked to checked.
    updatedItems[index].checked = !updatedItems[index].checked;

    // If the item is checked, remove it from the updatedItems array.
    if (updatedItems[index].checked) {
      const checkedItem = updatedItems.splice(index, 1)[0];

      // Create a new array that holds both the previous completedItems array plus the new checked item. Updated the completed-list in localStorage with the data from the new array.
      setCompletedItems((prevCompletedItems) => {
        const updatedCompletedItems = [...prevCompletedItems, checkedItem];
        localStorage.setItem(
          "completed-list",
          JSON.stringify(updatedCompletedItems)
        );

        // Return the state of the new array to update it.
        return updatedCompletedItems;
      });
    }
    setListItems(updatedItems);
    localStorage.setItem("list", JSON.stringify(updatedItems));
  };

  // When Clear The Deck button is clicked, the onClickDelete function clears the completedItems array, updates the state, and updates the values in localStorage of the completed-list.
  const onClickDelete = () => {
    completedItems = [];
    setCompletedItems(completedItems);
    localStorage.setItem("completed-list", JSON.stringify(completedItems));
  };

  return (
    <div>
      <h2>Up Next</h2>
      <form onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="upnext-list-item-input">
          List Item Input
        </label>
        <input
          id="upnext-list-item-input"
          className="upnext-list-item-input"
          type="text"
          placeholder="New task..."
          onChange={onInputChange}
          value={input}
        />
      </form>
      <ul className="upnext-list">
        {listItems.map((item, index) => (
          <li className="upnext-list-item" key={index}>
            <label
              className="sr-only checkbox-label"
              htmlFor={`checkbox-${index}`}
            >
              List item checkbox
            </label>
            <input
              className="upnext-list-input"
              type="checkbox"
              id={`checkbox-${index}`}
              checked={item.checked}
              onChange={() => toggleChecked(index)}
            />
            {item.text}
            {/* <DatePicker index={index} /> */}
          </li>
        ))}
      </ul>
      <h2>Completed</h2>
      <ul className="completed-list">
        {completedItems.map((item, index) => (
          <li key={index}>
            {/* For uncontrolled components, use the defaultChecked attribute */}
            <input type="checkbox" defaultChecked={item.checked} />
            <span
              style={item.checked ? { textDecoration: "line-through" } : {}}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
      <button className="list-button" onClick={onClickDelete} type="submit">
        Clear The Deck
      </button>
    </div>
  );
}
