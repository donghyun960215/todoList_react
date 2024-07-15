import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'

function TodoList({filter}) {
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
    console.log(edited)
    setTodos(todos.map(todo => todo.id === edited.id ? {...todo, edit: !todo.edit, text: edited.text} : todo))
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
      <section>
        <ul>
          {filterTodo.map((item, uu) => (
            <Todo
              key={uuidv4()}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </section>
      <AddTodo onAdd={handleAdd}/>
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