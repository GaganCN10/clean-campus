// // import axios from "axios";

// // const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // const api = axios.create({
// //   baseURL,
// //   headers: { "Content-Type": "application/json" },
// //   timeout: 15000,
// // });

// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) config.headers.Authorization = `Bearer ${token}`;
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // export const dustbinAPI = {
// //   addDustbin: async (dustbinData) => {
// //     const token = localStorage.getItem('adminToken');
// //     return axios.post('http://localhost:5000/api/dustbins/add', dustbinData, {
// //       headers: {
// //         'x-auth-token': token,
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //   },
  
// //   // ✨ NEW: Delete dustbin
// //   deleteDustbin: async (dustbinId) => {
// //     const token = localStorage.getItem('adminToken');
// //     return axios.delete(`http://localhost:5000/api/dustbins/delete/${dustbinId}`, {
// //       headers: {
// //         'x-auth-token': token,
// //       },
// //     });
// //   },
  
// //   // ✨ NEW: Get all dustbins
// //   getAllDustbins: async () => {
// //     return axios.get('http://localhost:5000/api/dustbins');
// //   },
// // };

// // // ✨ NEW: Water Filter API
// // export const waterFilterAPI = {
// //   addWaterFilter: async (filterData) => {
// //     const token = localStorage.getItem('adminToken');
// //     return axios.post('http://localhost:5000/api/water-filters/add', filterData, {
// //       headers: {
// //         'x-auth-token': token,
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //   },
  
// //   toggleStatus: async (filterId) => {
// //     const token = localStorage.getItem('adminToken');
// //     return axios.put(`http://localhost:5000/api/water-filters/toggle-status/${filterId}`, {}, {
// //       headers: {
// //         'x-auth-token': token,
// //       },
// //     });
// //   },
  
// //   updateQuality: async (filterId, quality) => {
// //     const token = localStorage.getItem('adminToken');
// //     return axios.put(`http://localhost:5000/api/water-filters/update-quality/${filterId}`, 
// //       { quality }, 
// //       {
// //         headers: {
// //           'x-auth-token': token,
// //         },
// //       }
// //     );
// //   },
  
// //   deleteWaterFilter: async (filterId) => {
// //     const token = localStorage.getItem('adminToken');
// //     return axios.delete(`http://localhost:5000/api/water-filters/delete/${filterId}`, {
// //       headers: {
// //         'x-auth-token': token,
// //       },
// //     });
// //   },
  
// //   getAllWaterFilters: async () => {
// //     return axios.get('http://localhost:5000/api/water-filters');
// //   },
// // };
// // export default api;import axios from "axios";

// // ✅ NO /api in baseURL
// const baseURL = process.env.REACT_APP_API_URL || "https://ecolocate.onrender.com";

// console.log("🌍 Using API Base URL:", baseURL);

// const api = axios.create({
//   baseURL,
//   headers: { "Content-Type": "application/json" },
//   timeout: 15000,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const dustbinAPI = {
//   addDustbin: async (dustbinData) => {
//     const token = localStorage.getItem('adminToken');
//     // ✅ ADD /api prefix here
//     return api.post('/api/dustbins/add', dustbinData, {
//       headers: {
//         'x-auth-token': token,
//         'Content-Type': 'application/json',
//       },
//     });
//   },
  
//   deleteDustbin: async (dustbinId) => {
//     const token = localStorage.getItem('adminToken');
//     // ✅ ADD /api prefix here
//     return api.delete(`/api/dustbins/delete/${dustbinId}`, {
//       headers: {
//         'x-auth-token': token,
//       },
//     });
//   },
  
//   getAllDustbins: async () => {
//     // ✅ ADD /api prefix here
//     return api.get('/api/dustbins');
//   },
// };

// // ✅ Water Filter API with /api prefix
// export const waterFilterAPI = {
//   addWaterFilter: async (filterData) => {
//     const token = localStorage.getItem('adminToken');
//     // ✅ ADD /api prefix here
//     return api.post('/api/water-filters/add', filterData, {
//       headers: {
//         'x-auth-token': token,
//         'Content-Type': 'application/json',
//       },
//     });
//   },
  
//   toggleStatus: async (filterId) => {
//     const token = localStorage.getItem('adminToken');
//     // ✅ ADD /api prefix here
//     return api.put(`/api/water-filters/toggle-status/${filterId}`, {}, {
//       headers: {
//         'x-auth-token': token,
//       },
//     });
//   },
  
//   updateQuality: async (filterId, quality) => {
//     const token = localStorage.getItem('adminToken');
//     // ✅ ADD /api prefix here
//     return api.put(`/api/water-filters/update-quality/${filterId}`, 
//       { quality }, 
//       {
//         headers: {
//           'x-auth-token': token,
//         },
//       }
//     );
//   },
  
//   deleteWaterFilter: async (filterId) => {
//     const token = localStorage.getItem('adminToken');
//     // ✅ ADD /api prefix here
//     return api.delete(`/api/water-filters/delete/${filterId}`, {
//       headers: {
//         'x-auth-token': token,
//       },
//     });
//   },
  
//   getAllWaterFilters: async () => {
//     // ✅ ADD /api prefix here
//     return api.get('/api/water-filters');
//   },
// };

// export default api;
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://ecolocate.onrender.com";

console.log("🌍 Using API Base URL:", baseURL);

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
    return api.post('/api/dustbins/add', dustbinData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    });
  },
  
  deleteDustbin: async (dustbinId) => {
    const token = localStorage.getItem('adminToken');
    return api.delete(`/api/dustbins/delete/${dustbinId}`, {
      headers: {
        'x-auth-token': token,
      },
    });
  },
  
  getAllDustbins: async () => {
    return api.get('/api/dustbins');
  },
};

export const waterFilterAPI = {
  addWaterFilter: async (filterData) => {
    const token = localStorage.getItem('adminToken');
    return api.post('/api/water-filters/add', filterData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    });
  },
  
  toggleStatus: async (filterId) => {
    const token = localStorage.getItem('adminToken');
    return api.put(`/api/water-filters/toggle-status/${filterId}`, {}, {
      headers: {
        'x-auth-token': token,
      },
    });
  },
  
  updateQuality: async (filterId, quality) => {
    const token = localStorage.getItem('adminToken');
    return api.put(`/api/water-filters/update-quality/${filterId}`, 
      { quality }, 
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
  },
  
  deleteWaterFilter: async (filterId) => {
    const token = localStorage.getItem('adminToken');
    return api.delete(`/api/water-filters/delete/${filterId}`, {
      headers: {
        'x-auth-token': token,
      },
    });
  },
  
  getAllWaterFilters: async () => {
    return api.get('/api/water-filters');
  },
};

export default api;
