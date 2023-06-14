import "./page.css";
import Navigation from "./components/navigation/navigation.js";
import List from "./components/list/list.js";
// import ListName from "./components/list-name/list-name.js";

export default function Home() {
  return (
    <div className="todo-app">
      <Navigation />
      <main className="container">
        {/* Will dynamically allow user to name to do list */}
        {/* <ListName /> */}
        <h1>What do you need to do?</h1>
        {/* Will dynamically allow users to type in their to-do list items */}
        <List />
      </main>
    </div>
  );
}
