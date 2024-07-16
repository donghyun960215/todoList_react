import './App.css';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import {useState} from "react";

const filters = ['all', 'active', 'completed'];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} onDarkMode={setDarkMode} darkMode={darkMode} />
      <TodoList filter={filter} darkMode={darkMode} />
    </>
  );
}

export default App;




