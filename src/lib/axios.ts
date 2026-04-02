import axios from "axios";
import { authClient } from "./auth-client";


export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL!,
    withCredentials: true,
});

api.interceptors.request.use(async (config)=>{
    const session = await authClient.getSession();
    const token = session.data?.session.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((res)=>res, (error)=>{
    if(error.response?.status === 401){
        window.location.href = '/';
    }
    return Promise.reject(error);
})
