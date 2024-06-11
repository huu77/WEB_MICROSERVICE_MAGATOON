import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_DOMAIN,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})
export default axiosInstance 