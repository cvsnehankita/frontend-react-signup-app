import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/auth/jwt";

class AuthService {
    register(formData) {
        return axios.post(`${API_BASE_URL}/signin`, formData);
    }
    login(credentials) {
        return axios.post(`${API_BASE_URL}/signup`, credentials);
    }
}
export default new AuthService();