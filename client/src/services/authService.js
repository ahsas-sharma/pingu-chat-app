import CONFIG from '../config/config.js';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const login = async (email, password) => {
  console.log(`Received login request with ${email} ${password}`);
  try {
    let response = await axios.post(`${CONFIG.API_BASE_URL}/users/sign-in`, {
      email,
      password,
    });
    const token = response.data.token;
    window.localStorage.setItem('token', JSON.stringify(token));
    const decoded = jwtDecode(token);
    response = await axios.get(
      `${CONFIG.API_BASE_URL}/users/${decoded.userId}`,
    );
    const user = response.data;
    console.log(user);
    return user;
  } catch (error) {
    let errorString = '';
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errorString += `${err.msg} for ${err.path}`;
      });
    } else {
      errorString = error.response.data;
    }
    throw errorString;
  }
};
