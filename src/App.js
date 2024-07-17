import './App.css';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import {useState} from "react";
import {DarkModeProvider} from "./components/context/DarkModeContext";

const filters = ['all', 'active', 'completed'];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  // const [darkMode, setDarkMode] = useState(false);
  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter}  />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;




