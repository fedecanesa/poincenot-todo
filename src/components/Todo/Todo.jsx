import React from 'react'
import PropTypes from 'prop-types';
import './todo.scss';

const Todo = ({ todo, handlerChange, onClick }) => {
    const { completed, title } = todo;
    return (
        <div className="todo">
            <input
                type="checkbox"
                checked={completed}
                className='todo__checkbox'
                onClick={e => handlerChange(e, todo)}
                value={completed}
            />
            <span className='todo__title'>{title}</span>
            <div className='todo__deleteButton'>
                <button
                    className='todo__deleteButton'
                    onClick={(e) => onClick(e, todo)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

Todo.propTypes = {
    todos: PropTypes.array,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
}

export default Todo;