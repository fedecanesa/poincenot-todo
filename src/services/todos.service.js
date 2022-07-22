import api from '../config/axios.config';

export const getAllTodosService = (userId) => {
    return api.get(`/todo/${userId}`)
}
export const deleteAllTodoService = (userId) => {
    return api.delete(`/todo/${userId}/reset`);
}
export const deleteTodoService = (userId, data) => {
    return api.delete(
        `/todo/${userId}`,
        data
    );
}
export const postTodoService = (userId, data) => {
    return api.post(
        `/todo/${userId}`,
        data
    );
}
export const putTodoService = (userId, data) => {
    return api.put(
        `/todo/${userId}`,
        data
    );
}
