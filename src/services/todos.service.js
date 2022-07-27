import api from '../config/axios.config';

export const getAllTodosService = (userId) => {
    return api.get(`/todo/${userId}`)
}
export const deleteTodoService = (userId, todoToDelete) => {
    return api.delete(
        `/todo/${userId}`,
        {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            data: {
                todoId: todoToDelete.todoId
            }
        }
    );
}
export const deleteAllTodoService = (userId) => {
    return api.delete(`/todo/${userId}/reset`);
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
