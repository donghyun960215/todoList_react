import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import styles from './TotoList.module.css';
import {useDarkMode} from "../context/DarkModeContext";

function TodoList({filter}) {
  const {darkMode, toggleDarkMode} = useDarkMode();
  const [todos, setTodos] = useState([
    {
      id:uuidv4(),
      text:'장보기',
      status:'active',
      edit:false
    },
    {
      id:uuidv4(),
      text:'공부하기',
      status:'active',
      edit:false
    }
  ])
  const [filterTodo, setFilterTodo] = useState([])


  const handleAdd = (todo) => {
    console.log(todo)
    setTodos([...todos,todo])
  }

  const handleUpdate = (updated) => {
    setTodos(todos.map((t)=>(t.id === updated.id ? updated : t)))
  }

  const handleEdit = (edited) => {
    setTodos(todos.map(todo => todo.id === edited.id ? {...todo, edit: !todo.edit} : todo))
  }

  const handleInput = (editInput) => {
    setTodos(todos.map(todo => todo.id === editInput.id ? {...todo, edit: !todo.edit, text : editInput.text} : todo))
  }

  const handleDelete = (deleted) => {
    if(window.confirm('해당 할 일을 삭제 하시겠습니까?')) {
      setTodos(todos.filter(t => t.id !== deleted.id));
    }
  }

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