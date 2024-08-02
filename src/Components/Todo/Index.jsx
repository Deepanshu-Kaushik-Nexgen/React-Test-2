import React, { useState } from 'react'
import './style.scss'
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Index = () => {
  const [todo, setTodo] = useState({
    todo: '',
    time: '',
    isDone: false
  })
  const [todos, setTodos] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
      setTodo({
        ...todo,
        [name]: value
      })
  }

  const AddTodos = () => {
    if (todo.todo.trim() !== '') {
      setTodos((prev) => [...prev, todo])
    }
    setTodo({
      id: '',
      todo: '',
      time: ''
    })
  }

  function toggleIsDone(index) {
    setTodos(todos.map((item, indx) => indx === index ? { ...item, isDone: !item.isDone } : item))
  }

  function deleteTodo(index) {
    setTodos(todos.filter((item, indexx) => indexx !== index))
  }

  let pendingTime = todos
  .filter(item => !item.isDone)
  .reduce((accumulator, item)=> accumulator + Number(item.time), 0)  

  const pendingTodos = todos
  .filter(item => !item.isDone)
  .length

  const doneTodos = todos
  .filter(item => item.isDone)
  .length


  const convertMinutesToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const { hours: pendingHours, minutes: pendingMinutes } = convertMinutesToHoursAndMinutes(pendingTime);

  return (
    <>
      <div className="todoMainConatiner">
        <div className="inputContainer">
          <h3>Add New Task</h3>
          <input type="text" onChange={handleChange} name="todo" value={todo.todo} placeholder='Task Name' />
          <input type="number" name="time" onChange={handleChange} value={todo.time} placeholder='Enter Time' />
          <div className="button" onClick={AddTodos}><FaCheck /></div>
          <div className="infoContainer">
          <div className='time'>{ pendingHours + " : " + pendingMinutes}</div>
          <span>{"Pending Tasks: " + pendingTodos}</span>
          <span style={{color: "green"}}>{"Done Tasks: " + doneTodos}</span>
          </div>
        </div>
        <div className="todosContainer">
          {todos.map((item, index) => {
            return <div className={`todo ${item.isDone ? "done" : ""}`} key={index}>
              <span className='todo-desc'>{item.todo}</span>
              <span>{item.time}</span>
              <span onClick={() => toggleIsDone(index)}><FaCheck /></span>
              <span onClick={() => deleteTodo(index)}><MdDelete style={{ color: "red" }} /></span>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Index