import api from '../config/axios.config';

export const registerService = () => {
    return api.get("/userId");
}
