import React from 'react';
import { add, filter } from '../../utils/images';
import { TodoList, Button, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../../features/todos/todoSlice';
import PropTypes from 'prop-types';
import './todoForm.scss';

const TodoForm = ({ handlerSubmit, todo, handlerChange }) => {
    const dispatch = useDispatch();
    const { todos, filterStatus } = useSelector((state) => state.todos);

    const filterStatusHandler = (e) => {
        const { target: { value } } = e;
        dispatch(updateFilterStatus(value));
    }

    return (
        <form onSubmit={handlerSubmit}>
            <Input
                placeholder={'Escribí un item'}
                type={'text'}
                value={todo?.title}
                name={'title'}
                onChange={(e) => handlerChange(e, todo)}

            />
            {
                todos?.length > 0 &&
                <>
                    <div className='todoForm'>
                        <div className='todoForm__header'>
                            <h4>To do list</h4>
                            <div className='todoForm__imageContainer'>
                                <img src={add} alt="Add a Todo" />
                            </div>
                            <div className='todoForm__filterContainer'>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => filterStatusHandler(e)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="no-realizados">No realizados</option>
                                    <option value="realizados">Realizados</option>
                                </select>

                            </div>
                        </div>
                        <TodoList
                            handlerChange={handlerChange}
                        />
                    </div>
                </>
            }
            <div className='home__buttonContainer '>
                <Button
                    disabled={false}
                    name={'button_sumit'}
                    type={'submit'}
                    content={'Agregar'}
                />
            </div>
        </form>
    )
}

TodoForm.propTypes = {
    handlerSubmit: PropTypes.func,
    todo: PropTypes.array,
    handlerChange: PropTypes.func,
    filterStatusHandler: PropTypes.func,
    todos: PropTypes.array,
    filterStatus: PropTypes.string
}

export default TodoForm;