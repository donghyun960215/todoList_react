import React,{useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import styles from './AddTodo.module.css';
import {useDarkMode} from "../context/DarkModeContext";

function AddTodo({onAdd}) {
  const [text, setText] = useState('');
  const {darkMode, toggleDarkMode} = useDarkMode();
  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim().length === 0){
      return
    }
    onAdd({
      id: uuidv4(),
      text:text,
      status:'active',
      edit:false
    })
    setText(e.target.value ='')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo..."
        value={text}
        onChange={handleChange} />
      <button className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodo;