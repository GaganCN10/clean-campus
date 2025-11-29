import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const dustbinAPI = {
  addDustbin: async (dustbinData) => {
    const token = localStorage.getItem('adminToken');
    return axios.post('http://localhost:5000/api/dustbins/add', dustbinData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    });
  },
  
  // ✨ NEW: Delete dustbin
  deleteDustbin: async (dustbinId) => {
    const token = localStorage.getItem('adminToken');
    return axios.delete(`http://localhost:5000/api/dustbins/delete/${dustbinId}`, {
      headers: {
        'x-auth-token': token,
      },
    });
  },
  
  // ✨ NEW: Get all dustbins
  getAllDustbins: async () => {
    return axios.get('http://localhost:5000/api/dustbins');
  },
};

export default api;
