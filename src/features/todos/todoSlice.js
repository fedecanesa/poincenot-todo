import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, { payload }) => {
            const todo = {
                title: payload.title,
                message: payload.message,
            };
            state.push(todo);
        },
        editTodo: (state, { payload }) => {
            const { todoId, title, message, completed } = payload;
            const foundTodo = state.find((todo) => todo.todoId === todoId);
            if (foundTodo) {
                foundTodo.title = title;
                foundTodo.message = message;
                foundTodo.completed = completed
            }
        },
        deleteTodo: (state, { payload }) => {
            const { todoId } = payload;
            const foundTodo = state.find((todo) => todo.todoId === todoId);
            if (foundTodo) {
                state.splice(state.indexOf(foundTodo), 1);
            }
        },
        getTodos: (state, { payload }) => {
            state = payload;
        }
    },
})

export const { addTodo, editTodo, deleteTodo, getTodos } = todoSlice.actions;
export default todoSlice.reducer


































































































