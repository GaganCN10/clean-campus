// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// const AdminPage = () => {
//   const { admin, isAuthenticated, logout, loading, login } = useAuth();
//   const navigate = useNavigate();
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//      // navigate('/admin/login');
//     }
//   }, [loading, isAuthenticated, navigate]);

//   const fetchReports = React.useCallback(async () => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       const res = await api.get('/api/admin/reports', {
//         headers: {
//           'x-auth-token': token
//         }
//       });
//       setReports(res.data);
//     } catch (err) {
//       toast.error('Failed to fetch reports. Please log in again.');
//       console.error(err);
//       logout();
//     }
//   }, [logout]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchReports();
//     }
//   }, [isAuthenticated, fetchReports]);

//   const handleMarkAsClean = async (id) => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       await api.put(`/api/admin/clean/${id}`, {}, {
//         headers: {
//           'x-auth-token': token
//         }
//       });
//       toast.success('Report marked as clean!');
//       fetchReports(); // Refresh the list
//     } catch (err) {
//       toast.error('Failed to mark as clean.');
//       console.error(err);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { username, password } = e.target.elements;
//     const res = await login({
//       username: username.value,
//       password: password.value
//     });
//     if (res.success) {
//       toast.success('Logged in successfully!');
//     } else {
//       toast.error(res.error || 'Login failed.');
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
//         <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="username">Username</label>
//             <input type="text" id="username" className="w-full rounded-md border-gray-300 shadow-sm" required />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
//             <input type="password" id="password" className="w-full rounded-md border-gray-300 shadow-sm" required />
//           </div>
//           <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors">
//             Login
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//         <button onClick={logout} className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
//           Logout
//         </button>
//       </div>
//       <p className="text-lg mb-6">Welcome, {admin?.username}!</p>
      
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Waste Reports</h2>
      
//       {reports.length === 0 ? (
//         <p className="text-gray-500 italic">No pending waste reports to review.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reports.map((report) => (
//             <div key={report._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between waste-report-card">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   <span className="font-semibold">ID:</span> {report._id.substring(0, 8)}...
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <span className="font-semibold">Reported By:</span> {report.reportedBy}
//                 </p>
//                 {report.photoUrl && (
//                   <img src={report.photoUrl} alt="Waste Report" className="w-full h-48 object-cover rounded-md mb-4" />
//                 )}
//                 <p className="text-gray-700 font-medium mb-2">
//                   <span className="font-semibold">Location:</span> {report.location.coordinates[1].toFixed(4)}, {report.location.coordinates[0].toFixed(4)}
//                 </p>
//                 {report.description && (
//                   <p className="text-gray-600 mb-4">
//                     <span className="font-semibold">Description:</span> {report.description}
//                   </p>
//                 )}
//               </div>
//               <button
//                 onClick={() => handleMarkAsClean(report._id)}
//                 className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition-colors mt-4"
//               >
//                 Mark as Clean
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPage;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { admin, isAuthenticated, logout, loading, login } = useAuth();
  const [reports, setReports] = useState([]);
  const [fetchingReports, setFetchingReports] = useState(false);

  const fetchReports = React.useCallback(async () => {
    if (!isAuthenticated) return;
    
    setFetchingReports(true);
    try {
      const token = localStorage.getItem('adminToken');
      console.log('📥 Fetching admin reports...');
      
      const res = await api.get('/api/admin/reports', {
        headers: {
          'x-auth-token': token
        }
      });
      
      console.log('✅ Reports fetched:', res.data.length);
      setReports(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch reports:', err);
      
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        logout();
      } else {
        toast.error('Failed to fetch reports. Please try again.');
      }
    } finally {
      setFetchingReports(false);
    }
  }, [isAuthenticated, logout]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
    }
  }, [isAuthenticated, fetchReports]);

  const handleMarkAsClean = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('🧹 Marking report as clean:', id);
      
      await api.put(`/api/admin/clean/${id}`, {}, {
        headers: {
          'x-auth-token': token
        }
      });
      
      toast.success('Report marked as clean!');
      fetchReports(); // Refresh the list
    } catch (err) {
      console.error('❌ Failed to mark as clean:', err);
      toast.error('Failed to mark as clean. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    console.log('🔐 Attempting login for:', username);
    
    const loadingToast = toast.loading('Logging in...');
    
    try {
      const res = await login({ username, password });
      
      toast.dismiss(loadingToast);
      
      if (res.success) {
        toast.success('Logged in successfully!');
      } else {
        toast.error(res.error || 'Login failed.');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error('❌ Login error:', err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-600 mt-2">Access the admin dashboard</p>
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input 
              type="text" 
              id="username" 
              name="username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              placeholder="Enter username"
              required 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              placeholder="Enter password"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            Login
          </button>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Default credentials:</strong><br />
              Username: admin<br />
              Password: admin123
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome, {admin?.username}!</p>
        </div>
        <button 
          onClick={logout} 
          className="bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-700">Pending Waste Reports</h2>
        <button 
          onClick={fetchReports}
          disabled={fetchingReports}
          className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50"
        >
          {fetchingReports ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      {fetchingReports && reports.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <span className="text-6xl mb-4 block">✅</span>
          <p className="text-gray-500 italic text-lg">No pending waste reports to review.</p>
          <p className="text-gray-400 text-sm mt-2">All reports have been processed!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between waste-report-card hover:shadow-xl transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    ID: {report._id.substring(0, 8)}...
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold">Reported By:</span> {report.reportedBy}
                </p>
                
                {report.photoUrl && (
                  <img 
                    src={report.photoUrl} 
                    alt="Waste Report" 
                    className="w-full h-48 object-cover rounded-md mb-4" 
                  />
                )}
                
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-gray-500 mb-1">Location:</p>
                  <p className="text-sm font-mono text-gray-700">
                    {report.location.coordinates[1].toFixed(5)}, {report.location.coordinates[0].toFixed(5)}
                  </p>
                </div>
                
                {report.description && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Description:</p>
                    <p className="text-sm text-gray-700 italic">"{report.description}"</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleMarkAsClean(report._id)}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors mt-4 shadow-md hover:shadow-lg"
              >
                ✓ Mark as Clean
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;