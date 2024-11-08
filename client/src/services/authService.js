import CONFIG from '../config/config.js';
import axios from 'axios';

export const login = async (email, password) => {
  console.log(`Received login request with ${email} ${password}`);

  try {
    let response = await axios.post(`${CONFIG.API_BASE_URL}/users/sign-in`, {
      email,
      password,
    });
    const token = response.data.token;
    window.localStorage.setItem('token', JSON.stringify(token));
    console.log(response.data);
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

export const logout = () => {
  window.localStorage.removeItem('token');
  setUser(null);
  loggedIn(false);
};
