// // import axios from 'axios';

// // const baseURL = process.env.REACT_APP_API_URL || '';

// // const api = axios.create({
// //   baseURL,
// // });

// // export default api;

// // import axios from "axios";

// // const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// // const api = axios.create({
// //   baseURL,
// // });

// // // export default api;
// // import axios from 'axios';

// // // Detect if we're on mobile or desktop
// // const getBaseURL = () => {
// //   // If accessing from mobile via port forwarding
// //   if (window.location.hostname !== 'localhost') {
// //     // Use the same hostname (your PC's IP) but with backend port
// //     return `http://${window.location.hostname}:5000`;
// //   }
// //   // Default localhost for PC
// //   return 'http://localhost:5000';
// // };

// // const api = axios.create({
// //   baseURL: getBaseURL(),
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Add token to requests if available
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // export default api;


// import axios from 'axios';

// // Detect the correct API base URL
// const getBaseURL = () => {
//   // Get the current hostname
//   const hostname = window.location.hostname;
  
//   console.log('🌐 Detecting API URL...');
//   console.log('Current hostname:', hostname);
//   console.log('Current protocol:', window.location.protocol);
//   console.log('Current port:', window.location.port);
  
//   // For local development on PC
//   if (hostname === 'localhost' || hostname === '127.0.0.1') {
//     console.log('✅ Using localhost API');
//     return 'http://localhost:5000';
//   }
  
//   // For mobile access via VSCode port forwarding or network IP
//   // The frontend might be on port 3000, backend on 5000
//   const baseURL = `${window.location.protocol}//${hostname}:5000`;
//   console.log('✅ Using network API:', baseURL);
//   return baseURL;
// };

// const api = axios.create({
//   baseURL: getBaseURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 second timeout
// });

// // Request interceptor - add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log(`🔵 API Request: ${config.method.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - handle errors
// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.config.url}`, response.status);
//     return response;
//   },
//   (error) => {
//     console.error('❌ API Error:', error.message);
    
//     if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout - check if backend is running on port 5000');
//     } else if (error.message === 'Network Error') {
//       console.error('Network Error - Possible causes:');
//       console.error('1. Backend not running on port 5000');
//       console.error('2. CORS not configured properly');
//       console.error('3. Firewall blocking connection');
//       console.error('4. Wrong IP address for mobile access');
//       console.error('Current API URL:', api.defaults.baseURL);
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;



// import axios from 'axios';

// // Detect the correct API base URL
// const getBaseURL = () => {
//   // Get the current hostname
//   const hostname = window.location.hostname;
  
//   console.log('🌐 Detecting API URL...');
  
//   // 1. For local development on PC (localhost or 127.0.0.1)
//   if (hostname === 'localhost' || hostname === '127.0.0.1') {
//     console.log('✅ Using localhost API');
//     return 'http://localhost:5000';
//   }
  
//   // 2. For mobile access via VSCode port forwarding or network IP
//   // **CRITICAL FIX:** We use 'http' explicitly because the local backend (Port 5000) 
//   // is typically not running over HTTPS, even if the frontend tunnel is.
//   const baseURL = `http://${hostname}:5000`;
//   console.log('✅ Using network API:', baseURL);
//   return baseURL;
// };

// const api = axios.create({
//   baseURL: getBaseURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 15000, // Increased timeout to 15s for stability on slower networks
// // });

// // // Request interceptor - add auth token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     console.log(`🔵 API Request: ${config.method.toUpperCase()} ${config.url}`);
// //     return config;
// //   },
// //   (error) => {
// //     console.error('❌ Request Error:', error);
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor - handle errors
// // api.interceptors.response.use(
// //   (response) => {
// //     console.log(`✅ API Response: ${response.config.url}`, response.status);
// //     return response;
// //   },
// //   (error) => {
// //     console.error('❌ API Error:', error.message);
    
// //     if (error.code === 'ECONNABORTED' || error.message === 'timeout exceeded') {
// //       console.error('Request timeout - Check firewall or backend service running on port 5000.');
// //     } else if (error.message === 'Network Error') {
// //       console.error('❌ Network Error - Possible causes:');
// //       console.error('1. Backend not running on port 5000.');
// //       console.error('2. **CORS** not configured properly on backend.');
// //       console.error('3. Firewall blocking connection.');
// //       console.error('4. Wrong IP address used for mobile access (though auto-detected here).');
// //       console.error('Current API URL:', api.defaults.baseURL);
// //     }
    
// //     return Promise.reject(error);
// //   }
// // );

// // export default api;

// import axios from 'axios';

// // Detect the correct API base URL
// // const getBaseURL = () => {
// //   // Get the current hostname
// //   const hostname = window.location.hostname;
  
// //   console.log('🌐 Detecting API URL...');
  
// //   // 1. For local development on PC (localhost or 127.0.0.1)
// //   if (hostname === 'localhost' || hostname === '127.0.0.1') {
// //     console.log('✅ Using localhost API');
// //     return 'http://localhost:5000';
// //   }
  
// //   // 2. For mobile access via VSCode port forwarding or network IP
// //   // CRITICAL FIX: We use 'http' explicitly because the local backend (Port 5000) 
// //   // is typically not running over HTTPS, even if the frontend tunnel is.
// //   const baseURL = `http://${hostname}:5000`;
// //   console.log('✅ Using network API:', baseURL);
// //   return baseURL;
// // };

// // const getBaseURL = () => {
// //   const hostname = window.location.hostname;
// //   const protocol = window.location.protocol;

// //   console.log("🌐 Detecting API URL for hostname:", hostname);

// //   // 1️⃣ Local PC
// //   if (hostname === "localhost" || hostname === "127.0.0.1") {
// //     return "http://localhost:5000";
// //   }

// //   // 2️⃣ LAN (Mobile testing on same Wi-Fi)
// //   // If your PC IP is 192.168.x.x, React will be accessed via http://192.168.x.x:3000
// //   // -> Backend must match protocol and IP
// //   if (/^192\.168\./.test(hostname) || /^10\./.test(hostname)) {
// //     return `http://${hostname}:5000`;
// //   }

// //   // 3️⃣ Production (Render/Vercel/Netlify)
// //   return import.meta.env.VITE_API_URL || `${protocol}//${hostname}/api`;
// // };



// const getBaseURL = () => {
//   // 1️⃣ Always check for environment variable first
//   if (import.meta.env.VITE_API_URL) {
//     console.log("✅ Using API from .env:", import.meta.env.VITE_API_URL);
//     return import.meta.env.VITE_API_URL;
//   }

//   // 2️⃣ Fallback for localhost
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return "http://localhost:5000/api";
//   }

//   // 3️⃣ Fallback for LAN (Wi-Fi test)
//   return `http://${hostname}:5000/api`;
// };

// // const api = axios.create({
// //   baseURL: getBaseURL(),
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   timeout: 15000, // Increased timeout to 15s for stability on slower networks
// // });



// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// // export default api;

// // Request interceptor - add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log(`🔵 API Request: ${config.method.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - handle errors
// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.config.url}`, response.status);
//     return response;
//   },
//   (error) => {
//     console.error('❌ API Error:', error.message);
    
//     if (error.code === 'ECONNABORTED' || error.message === 'timeout exceeded') {
//       console.error('Request timeout - Check firewall or backend service running on port 5000.');
//     } else if (error.message === 'Network Error') {
//       console.error('❌ Network Error - Possible causes:');
//       console.error('1. Backend not running on port 5000.');
//       console.error('2. **CORS** not configured properly on backend.');
//       console.error('3. Firewall blocking connection.');
//       console.error('Current API URL:', api.defaults.baseURL);
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;


// import axios from "axios";

// // const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// console.log("🌍 Using API Base URL:", baseURL);

// const api = axios.create({
//   baseURL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
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

// export default api;


import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
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

export default api;
