import React, { useState } from 'react';
import { Layout, Title, Modal, TodoForm } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    editTodo,
    addTodo,
    pendingTodo,
    failTodo,
    deleteAll
} from '../../features/todos/todoSlice';
import {
    postTodoService,
    putTodoService,
    deleteAllTodoService
} from '../../services/todos.service'
import PropTypes from 'prop-types';
import './home.scss';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { todos } = useSelector((state) => state.todos);
    const { user } = useSelector((state) => state.user);

    const [todo, setTodo] = useState({
        title: '',
        message: '',
    });
    const [modal, setModal] = useState(false);

    const handlerChange = async (e, todo) => {
        const { target: { name, value, checked, type } } = e;
        if (type === "checkbox") {
            let editedTodo = {
                ...todo,
                completed: checked
            }
            if (!todo.todoId) {
                editedTodo = {
                    ...editedTodo,
                    todoId: editedTodo.id
                }
            }
            try {
                const { status } = await putTodoService(user, editedTodo);
                if (status === 200) {
                    return dispatch(editTodo(editedTodo));
                } else {
                    return dispatch(failTodo('Error al editar el TODO'));
                }
            } catch (error) {
                dispatch(failTodo('Error al editar el TODO'));
                console.error(error);
            }
        } else {
            setTodo({ ...todo, [name]: value });
        }
    }

    const modalHandler = () => {
        setModal(!modal)
    }

    const resetList = async (e) => {
        e.preventDefault();
        try {
            const { status } = await deleteAllTodoService(user);
            if (status === 200) {
                modalHandler();
                dispatch(deleteAll());
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        dispatch(pendingTodo());
        try {
            const { status, data } = await postTodoService(user, todo);
            if (status === 200) {
                todo.title = '';
                todo.message = '';

                dispatch(addTodo(data));

            } else {
                return dispatch(failTodo('Error al agregar el TODO'));
            }
        } catch (error) {
            dispatch(failTodo('Error al agregar el TODO'))
            console.error(error);
        }
    }

    return (

        user ?
            <Layout modalHandler={modalHandler} >
                {
                    (todos?.length < 1) && (
                        <>
                            <Title>To do list</Title>
                            <div className='home__question'>
                                {
                                    todo.title?.length === 0 &&
                                    <p>¿Qué cosas tenés que terminar hoy?</p>
                                }
                            </div>
                        </>
                    )
                }
                {
                    modal && <Modal resetList={resetList} modalHandler={modalHandler} />
                }
                <TodoForm
                    handlerSubmit={handlerSubmit}
                    handlerChange={handlerChange}
                    todo={todo}
                />
            </Layout>
            : navigate('/')

    )
}

Home.propTypes = {
    handlerChange: PropTypes.func,
    handlerSubmit: PropTypes.func,
    resetList: PropTypes.func,
    modalHandler: PropTypes.func,
    todos: PropTypes.array,
    todo: PropTypes.object,
    user: PropTypes.string,
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    setTodo: PropTypes.func,
}

export default Home;