import axios from "axios";

let apiURL = 'https://apii.todo-web.tk'

// Set api url
export const axiosApiConnect = axios.create({
    baseURL : apiURL,
    headers: {"Content-Type": "application/json"}
});

export default axiosApiConnect;
