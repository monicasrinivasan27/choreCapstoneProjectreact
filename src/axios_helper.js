import axios from "axios";
import { jwtDecode } from 'jwt-decode';;


axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = () => {
    const token = window.localStorage.getItem("auth_token");
    return token ? `Bearer ${token}` : null;
};


export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token", token)
}


export const request = async (method, url, data, id) => {
    let headers = {};

    const authToken = getAuthToken();
    if (authToken) {
        headers = { "Authorization": `Bearer ${authToken}` };
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
        params: { id: id },  
        credentials: 'include'
    });
};

const getUserIdFromAuthToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};


export default getUserIdFromAuthToken;