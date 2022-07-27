import React from 'react'
import { Todo } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteTodo,
    pendingTodo,
    failTodo
} from '../../features/todos/todoSlice';
import {
    deleteTodoService,
} from '../../services/todos.service'
import PropTypes from 'prop-types';
import './todoList.scss';

const TodoList = ({ handlerChange }) => {
    const dispatch = useDispatch();

    const { todos, filterStatus } = useSelector((state) => state.todos);
    const { user } = useSelector((state) => state.user);

    const handleDelete = async (e, todo) => {
        e.preventDefault();
        dispatch(pendingTodo());
        let todoToDelete = {
            ...todo,
            todoId: todo?.id || todo?.todoId
        }

        try {
            const { data } = await deleteTodoService(user, todoToDelete);
            if (data.ok) {
                dispatch(deleteTodo(todoToDelete));
            } else {
                return dispatch(failTodo('Error al eliminar el TODO'));
            }
        } catch (error) {
            dispatch(failTodo('Error al eliminar el TODO'));
            console.error(error);
        }
    };

    return (
        (todos && todos?.length > 0) &&
        <>
            {
                filterStatus === 'all' &&
                todos.map(todo => {
                    return <Todo
                        todo={todo}
                        key={todo?.id}
                        onClick={(e) => handleDelete(e, todo)}
                        handlerChange={(e) => handlerChange(e, todo)}
                    />
                })

            }
            {
                filterStatus === 'realizados' &&
                todos.map(todo => {
                    if (todo.completed === true) {
                        return <Todo
                            todo={todo}
                            key={todo?.id}
                            onClick={(e) => handleDelete(e, todo)}
                            handlerChange={(e) => handlerChange(e, todo)}
                        />
                    }
                })
            }
            {
                filterStatus === 'no-realizados' &&
                todos.map(todo => {
                    if (todo.completed === false) {
                        return <Todo
                            todo={todo}
                            key={todo?.id}
                            onClick={(e) => handleDelete(e, todo)}
                            handlerChange={(e) => handlerChange(e, todo)}
                        />
                    }
                })
            }
        </>


    )
}

TodoList.propTypes = {
    handleDelete: PropTypes.func,
    handlerChange: PropTypes.func
}

export default TodoList;