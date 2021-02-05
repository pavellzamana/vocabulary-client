import {$authHost, $host} from "@/api/index";
import jwtDecode from "jwt-decode";

export const registration = async (email, login, password) => {
    const response = await $host.post('api/users/register', {email, login, password});
    localStorage.setItem('token', 'Bearer ' + response.data.token);
    return jwtDecode(response.data.token);
}

export const getUserFromDatabase = async (login, password) => {
    const response = await $host.post('api/users/login', {login, password});
    localStorage.setItem('token', 'Bearer ' + response.data.token);
    return jwtDecode(response.data.token);
}

export const checkAuth = async () => {
    const response = await $authHost.get('api/users/auth');
    localStorage.setItem('token', 'Bearer ' + response.data.token);
    return response;
}