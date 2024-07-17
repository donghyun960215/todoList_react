import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import styles from './TotoList.module.css';
import {useDarkMode} from "../context/DarkModeContext";

function TodoList({filter}) {
  const {darkMode} = useDarkMode();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
  const [filterTodo, setFilterTodo] = useState([])


  const handleAdd = (todo) => {
    setTodos([...todos,todo])
  }

  const handleUpdate = (updated) => {
    setTodos(todos.map((t)=>(t.id === updated.id ? updated : t)))
  }

  const handleDelete = (deleted) => {
    if(window.confirm('해당 할 일을 삭제 하시겠습니까?')) {
      setTodos(todos.filter(t => t.id !== deleted.id));
    }
  }

  const handleEdit = (edited) => {
    setTodos(todos.map(todo => todo.id === edited.id ? {...todo, edit: !todo.edit} : todo))
  }

  const handleInput = (editInput) => {
    setTodos(todos.map(todo => todo.id === editInput.id ? {...todo, edit: !todo.edit, text : editInput.text} : todo))
  }


  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todos"));
    if (storedTodoList) {
      setTodos(storedTodoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setFilterTodo(filter === 'all' ? todos : todos.filter(todo => todo.status === filter))
  },[todos,filter])

  //const filtered = getFilteredItems(todos, filter)

  return (
    <>
      <section className={styles.container}>
        <ul className={styles.list}>
          {filterTodo.map((item, uu) => (
            <Todo
              key={uuidv4()}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onInput={handleInput}
            />
          ))}
        </ul>
      </section>
      <AddTodo onAdd={handleAdd} darkMode={darkMode} />
    </>
  );
}

export default TodoList;

// function getFilteredItems(todos, filter){
//   if(filter === 'all'){
//     return todos;
//   }
//   return todos.filter(t=>t.status === filter)
// }