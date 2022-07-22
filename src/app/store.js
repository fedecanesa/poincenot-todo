import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todoSlice';
import loginReducer from '../features/login/loginSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        todos: todosReducer,
        user: userReducer
    }
})