import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        isAuth: false,
        error: "",
    },
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = "";
        },
        loginFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
})

export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;
export default loginSlice.reducer;
