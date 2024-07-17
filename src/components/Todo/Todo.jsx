import React, {useRef} from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import styles from "./Todo.module.css";

function Todo({todo, onDelete, onUpdate, onEdit, onInput}) {
  const {text, status, id, edit} = todo;
  const textRef = useRef('');

  const handleCheckChang = (e) => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({...todo, status: status});
  }

  const handleEditChange = (e) => {
    if(status !== 'completed' ){
      onEdit({...todo, edit: !edit})
    }
  }

  const handleInputChange = (e) => {
    onInput({...todo, edit: !edit, text : textRef.current.value});
  }

  const handleDelete = () => onDelete(todo)

  return (
    <li className={styles.todo}>
      {edit
          ?
          <input type="text" className={styles.input} defaultValue={text} ref={textRef}/>
          :
          <>
            <input
              className={styles.checkbox}
              type="checkbox"
              id={`${id}`}
              checked={status === 'completed'}
              onChange={handleCheckChang}
            />
            <label htmlFor={`${id}`} className={styles.text} >
              {text}
            </label>
          </>
      }
      <span className={styles.icon}>
        <button className={styles.button} onClick={todo.edit ? handleInputChange : handleEditChange}><MdEdit/></button>
      </span>
      <span className={styles.icon}>
        <button className={styles.button} onClick={handleDelete}><FaTrashAlt/></button>
      </span>
    </li>
  );
}

export default Todo;