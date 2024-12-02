import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://101412165-comp-3123-assignment1.vercel.app/', //Vercel URL
});

export default apiClient;
