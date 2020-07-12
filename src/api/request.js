import axios from "axios";

let apiURL = 'https://api.todo-app-task.tk'

// Set api url
export const axiosApiConnect = axios.create({
    baseURL : apiURL,
    headers: {"Content-Type": "application/json"}
});

export default axiosApiConnect;
