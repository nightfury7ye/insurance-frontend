import axios from "axios";

export const login = async (username, password) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
    username: username,
    password: password,
    });
    return response
}