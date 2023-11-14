import axios from 'axios';

const baseUrl = 'https://devfortest.my.id'

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') as string}`,
  },
});

http.interceptors.response.use(undefined, (error) => {
  const statusCode = error.response.status;
  const statusText = error.response.statusText;
  if (statusCode === 401 && statusText === 'Unauthorized') {
    localStorage.removeItem('token');
    window.location.reload();
  }
});
export default http;
