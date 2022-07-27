import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
    const localTodoList = window.localStorage.getItem('todos');
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todos', []);
    return [];
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: getInitialTodo(),
        isLoading: false,
        error: "",
        filterStatus: 'all'
    },
    reducers: {
        addTodo: (state, { payload }) => {
            const todo = {
                ...payload
            };
            state.todos.push(todo);
            const todoList = window.localStorage.getItem('todos');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...payload,
                });
                window.localStorage.setItem('todos', JSON.stringify(todoListArr));
            } else {
                window.localStorage.setItem(
                    'todo',
                    JSON.stringify([
                        {
                            ...payload,
                        },
                    ])
                );
            }
        },
        editTodo: (state, { payload }) => {
            const { title, message, completed, id, todoId } = payload;
            const uid = id ? id : todoId;
            const foundTodo = state.todos.find((todo) => todo.todoId === uid || todo.id === uid);
            if (foundTodo) {
                foundTodo.title = title;
                foundTodo.message = message;
                foundTodo.completed = completed;
                foundTodo.id = id;
                foundTodo.todoId = todoId;
            }

            const todoList = window.localStorage.getItem('todos');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);

                todoListArr.map(todo => {
                    if (todo.todoId === uid || todo.id === uid) {
                        todo.title = title;
                        todo.message = message;
                        todo.completed = completed;
                        todo.id = id;
                        todo.todoId = todoId;
                    }
                })
                window.localStorage.setItem('todos', JSON.stringify(todoListArr));
            }
        },
        deleteTodo: (state, { payload }) => {
            const id = payload.id ? payload.id : payload.todoId;
            const filter = state.todos.filter((todo) => {
                if (todo.id) return todo.id !== id;
                else if (todo.todoId) return todo.todoId !== id
            });
            state.todos = filter;

            const todoList = window.localStorage.getItem('todos');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                const filter = todoListArr.filter((todo) => {
                    if (todo.id) return todo.id !== id;
                    else if (todo.todoId) return todo.todoId !== id
                });

                window.localStorage.setItem('todos', JSON.stringify(filter));
            }
        },
        updateFilterStatus: (state, { payload }) => {
            state.filterStatus = payload;
        },
        deleteAll: (state, { payload }) => {
            window.localStorage.removeItem('todos');
            state.todos = [];
        },
        pendingTodo: (state) => {
            state.isLoading = true;
        },
        successTodo: (state, { payload }) => {
            state.isLoading = false;
            state.todos = payload;
            state.error = "";
        },
        failTodo: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
})

export const {
    addTodo,
    editTodo,
    deleteTodo,
    deleteAll,
    updateFilterStatus,
    pendingTodo,
    successTodo,
    failTodo
} = todoSlice.actions;
export default todoSlice.reducer


































































































