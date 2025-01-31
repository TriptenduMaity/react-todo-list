import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'

const Todo = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        if(savedTodos) {
            return JSON.parse(savedTodos);
        }
        else {
            return [];
        }
    });
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleEditValue = (e) => {
        setCurrentTodo({...currentTodo, task: e.target.value});
    }
    const handleEditClick = (item) => {
        setIsEditing(true);
        setCurrentTodo({...item});
    }
    const addTodo = () => {
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            task: inputValue.trim()
        }
        setTodos([...todos, newTask])
        setInputValue('');
        console.log(newTask);
    }
    const removeTodo = (id) => {
        const updateTodos = todos.filter((item) => item.id !== id);
        setTodos(updateTodos);
    }
    const updateTodo = (id, updatedTodo) => {
        const updateTodos = todos.map((item) => (
            item.id === id ? updatedTodo : item
        ));
        setInputValue('');
        setIsEditing(false);
        setTodos(updateTodos);
    }
  return (
    <>
        <section className='pt-5'>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className="fs-5 fw-semibold text-center mb-0">Todo App</h5>
                                {isEditing ? 
                                    <div className='d-flex align-items-center justify-content-center mt-3 gap-2'>
                                        <input type="text" placeholder='Enter Something...' value={currentTodo.task} onChange={handleEditValue} className='w-75 form-control'/>
                                        <button type='button' className='btn btn-success' onClick={() => updateTodo(currentTodo.id, currentTodo)}>Update</button>
                                        <button type='button' className='btn btn-danger' onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div> : 
                                    <div className='d-flex align-items-center justify-content-center mt-3 gap-2'>
                                        <input type="text" placeholder='Enter Something...' value={inputValue} className='w-75 form-control' onChange={handleChange}/>
                                        <button type='button' className='btn btn-success' onClick={addTodo}>Add</button>
                                    </div>
                                }
                                <TodoList todos={todos} removeTodo={removeTodo} handleEditClick={handleEditClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Todo