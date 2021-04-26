
import React, { useState, useEffect } from 'react';
import './App.css';
//importing Components
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {
  
  //state stuff
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setfilteredTodos] = useState([])

  //run une fois quand l app start
  useEffect(() => {
    getLocalTodos()
  }, [])
//useEffect
  useEffect(() => {
    filterHandler()
  }, [todos, status])

  //function
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setfilteredTodos(todos.filter(todo => todo.completed === true))
        break
      case 'uncompleted':
        setfilteredTodos(todos.filter(todo => todo.completed === false))
        break
        default:
         setfilteredTodos(todos)
         break 
    }
  }
  //save to local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify([]))
    
  }
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }
  }
  return (
    <div className="App">
     <header>
       <h1>Coconut's TodoList</h1>
     </header>
     <Form 
     inputText={inputText} 
     todos={todos} 
     setTodos={setTodos} 
     setInputText={setInputText}
     setStatus={setStatus}
     
     />
     <TodoList 
     filteredTodos={filteredTodos} 
     setTodos={setTodos} 
     todos={todos}/>
    </div>
  );
}

export default App;
