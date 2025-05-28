import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // proxied via Vite config or nginx to http://localhost:5000/api
  withCredentials: true, // handy when you add auth cookies later
});