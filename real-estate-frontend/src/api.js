// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://devendra-s-site-2.onrender.com/api",
});

export default API;
