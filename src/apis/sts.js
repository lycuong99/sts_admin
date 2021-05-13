import axios from 'axios';

const baseURL = "";
export default axios.create({
    baseURL: "http://localhost:3001"
});