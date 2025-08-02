import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://quick-foods-server.vercel.app"
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure; 