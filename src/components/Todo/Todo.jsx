import React, {useRef, useState} from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function Todo({todo, onDelete, onUpdate, onEdit}) {
  const {text, status, id} = todo;
  const [edit, setEdit] = useState(false);
  const textRef = useRef('');

  const handleCheckChang = (e) => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({...todo, status: status});
  }

  const handleEditChange = (e) => {
    if(todo.status !== 'completed' ){
      setEdit((prev) =>!prev)
      onEdit({...todo, text: textRef.current.value});
      console.log(textRef.current.value)
    }
  }

  const handleDelete = () => onDelete(todo)

  return (
    <li>
      <input
        type="checkbox"
        id='checkbox'
        checked={status === 'completed'}
        onChange={handleCheckChang}/>
      {
        todo.edit
        ?
        <input type="text" defaultValue={text} ref={textRef}/>
        :
        <label htmlFor="checkbox">{text}</label>
      }
      <button onClick={handleEditChange}><MdEdit/></button>
      <button onClick={handleDelete}><FaTrashAlt/></button>
    </li>
  );
}

export default Todo;