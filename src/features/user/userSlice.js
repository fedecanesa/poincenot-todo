import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: "",
        isLoading: false,
        error: "",
    },
    reducers: {
        getUserPending: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = "";
        },
        getUserFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        login: (state, { payload }) => {
            state.user = payload;
        },
        logout: (state) => {
            state.user = ""
        }
    },
});

export const {
    getUserPending,
    getUserSuccess,
    getUserFail,
    login,
    logout
} = userSlice.actions;

export default userSlice.reducer;