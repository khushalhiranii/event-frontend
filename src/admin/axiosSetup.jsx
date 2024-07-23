
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  withCredentials: true, // Enable cookie management
});

export default apiClient