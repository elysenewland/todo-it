// // Dynamically allow user to update list name
// 'use client';

// import React, { useState } from 'react';

// export default function ListName () {
//   const [input, setInput] = useState('');

//   const onInputChange = (event) => {
//     setInput(event.target.value);
//   };

//   return (
//     <div>
//       <h1 className="todo-listname">{input}</h1>
//       <input type="text" value={input} onChange={onInputChange} />
//     </div>
//   );
// };