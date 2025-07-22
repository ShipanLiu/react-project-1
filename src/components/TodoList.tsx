import React, { useState } from 'react'
import './TodoList.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoList(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React basics', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master React hooks', completed: false }
  ])
  const [inputValue, setInputValue] = useState<string>('')

  const addTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-container">
      <h2>Todo List Example</h2>
      <p>This demonstrates working with arrays in React state and form handling.</p>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-danger btn-small"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="explanation">
        <h3>Key concepts demonstrated:</h3>
        <ul>
          <li><strong>Array state:</strong> Managing a list of todos</li>
          <li><strong>Form handling:</strong> Controlled inputs with onChange</li>
          <li><strong>Map function:</strong> Rendering lists of components</li>
          <li><strong>Spread operator:</strong> Adding items to arrays immutably</li>
          <li><strong>Filter method:</strong> Removing items from arrays</li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList 