import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4444',
//    baseURL: 'mongodb+srv://admin:Twchy1cydalT$@cluster0.wtg5v1a.mongodb.net/mern?retryWrites=true&w=majority',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
})

export default instance;