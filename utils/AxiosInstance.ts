import axios from 'axios';

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})