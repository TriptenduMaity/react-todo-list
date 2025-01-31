import React from 'react'

const TodoList = ({todos, removeTodo, handleEditClick}) => {
  return (
    <>
        <ul className='list-group ms-0 ms-sm-4 my-3'>
            {todos.length > 0 ?
                todos.map((item, index) => (
                    <div className='d-flex align-items-center justify-content-between' key={item.id} id={item.id}>
                        <li className='list-group-item border-0'>
                            {++index}. {item.task}
                        </li>
                        <div className='d-flex gap-2'>
                            <button type='button' className='btn btn-sm btn-warning text-white' onClick={() => handleEditClick(item)}><i className='fas fa-pencil'></i></button>
                            <button type='button' className='btn btn-sm btn-danger' onClick={() => removeTodo(item.id)}><i className='fas fa-trash'></i></button>
                        </div>
                    </div>
                )) : <span className='ps-3 fs-6 fw-semibold'>No Lists Found</span>
            }       
        </ul>
    </>
  )
}

export default TodoList