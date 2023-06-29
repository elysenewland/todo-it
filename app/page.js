import "./page.css";
import Navigation from "./components/navigation/navigation.js";
import List from "./components/list/list.js";
import Footer from "./components/footer/footer.js";

export default function Home() {
  return (
    <div className="todo-app">
      <Navigation />
      <main className="container">
        {/* Will dynamically allow users to type in their to-do list items */}
        <List />
      </main>
      <Footer />
    </div>
  );
}
