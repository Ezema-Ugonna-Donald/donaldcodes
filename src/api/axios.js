import axios from "axios"

const BASE_URL = "http://localhost:3000/v1/api/"

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json"}
})