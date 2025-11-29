import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { dustbinAPI } from '../utils/api';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { admin, isAuthenticated, logout, loading, login } = useAuth();
  const [reports, setReports] = useState([]);
  const [fetchingReports, setFetchingReports] = useState(false);
  
  // Add Dustbin State
  const [showAddDustbin, setShowAddDustbin] = useState(false);
  const [dustbinName, setDustbinName] = useState('');
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [addingDustbin, setAddingDustbin] = useState(false);
  
  // ✨ NEW: Manage Dustbins State
  const [dustbins, setDustbins] = useState([]);
  const [fetchingDustbins, setFetchingDustbins] = useState(false);
  const [showManageDustbins, setShowManageDustbins] = useState(false);

  const fetchReports = useCallback(async () => {
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

  // ✨ NEW: Fetch dustbins
  const fetchDustbins = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setFetchingDustbins(true);
    try {
      console.log('📥 Fetching dustbins...');
      const res = await dustbinAPI.getAllDustbins();
      console.log('✅ Dustbins fetched:', res.data.length);
      setDustbins(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch dustbins:', err);
      toast.error('Failed to fetch dustbins');
    } finally {
      setFetchingDustbins(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
      fetchDustbins();
    }
  }, [isAuthenticated, fetchReports, fetchDustbins]);

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
      fetchReports();
    } catch (err) {
      console.error('❌ Failed to mark as clean:', err);
      toast.error('Failed to mark as clean. Please try again.');
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoadingLocation(true);
    toast.loading('Getting your location...', { id: 'location' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        toast.success(`Location captured: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`, { id: 'location' });
        setLoadingLocation(false);
      },
      (error) => {
        console.error('❌ Geolocation error:', error);
        let errorMessage = 'Failed to get location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
        }
        
        toast.error(errorMessage, { id: 'location' });
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleAddDustbin = async (e) => {
    e.preventDefault();

    if (!location) {
      toast.error('Please capture your current location first');
      return;
    }

    if (!dustbinName.trim()) {
      toast.error('Please enter a dustbin name');
      return;
    }

    setAddingDustbin(true);
    const loadingToast = toast.loading('Adding dustbin...');

    try {
      const response = await dustbinAPI.addDustbin({
        name: dustbinName.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
      });

      toast.success('Dustbin added successfully! 🎉', { id: loadingToast });
      console.log('✅ Dustbin added:', response.data);

      // Reset form and refresh dustbin list
      setDustbinName('');
      setLocation(null);
      setShowAddDustbin(false);
      fetchDustbins();
    } catch (err) {
      console.error('❌ Failed to add dustbin:', err);
      toast.error(err.response?.data?.message || 'Failed to add dustbin', { id: loadingToast });
    } finally {
      setAddingDustbin(false);
    }
  };

  // ✨ NEW: Handle delete dustbin
  const handleDeleteDustbin = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the dustbin "${name}"? This action cannot be undone.`)) {
      return;
    }

    const loadingToast = toast.loading('Deleting dustbin...');

    try {
      await dustbinAPI.deleteDustbin(id);
      toast.success('Dustbin deleted successfully!', { id: loadingToast });
      
      // Update local state immediately for better UX
      setDustbins(prevDustbins => prevDustbins.filter(bin => bin._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete dustbin:', err);
      toast.error(err.response?.data?.message || 'Failed to delete dustbin', { id: loadingToast });
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

      {/* ✨ Add Dustbin Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">📍 Add New Dustbin</h2>
            <p className="text-sm text-gray-600 mt-1">Add a dustbin at your current location</p>
          </div>
          <button
            onClick={() => setShowAddDustbin(!showAddDustbin)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showAddDustbin ? 'Close' : '+ Add Dustbin'}
          </button>
        </div>

        {showAddDustbin && (
          <form onSubmit={handleAddDustbin} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Current Location
                </label>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={loadingLocation}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 font-medium"
                  >
                    {loadingLocation ? '⏳ Getting Location...' : '📍 Capture Location'}
                  </button>
                  
                  {location && (
                    <div className="flex-1 bg-emerald-50 p-3 rounded-lg">
                      <p className="text-sm text-emerald-800 font-mono">
                        📍 Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="dustbinName">
                  Dustbin Name / Location
                </label>
                <input
                  type="text"
                  id="dustbinName"
                  value={dustbinName}
                  onChange={(e) => setDustbinName(e.target.value)}
                  placeholder="e.g., Main Gate, Library Entrance, Canteen Area"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!location || addingDustbin}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              >
                {addingDustbin ? '⏳ Adding Dustbin...' : '✓ Add Dustbin to Map'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ✨ NEW: Manage Dustbins Section */}
      <div className="mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">🗑️ Manage Dustbins</h2>
            <p className="text-sm text-gray-600 mt-1">View and delete existing dustbins</p>
          </div>
          <button
            onClick={() => setShowManageDustbins(!showManageDustbins)}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            {showManageDustbins ? 'Close' : 'Manage Dustbins'}
          </button>
        </div>

        {showManageDustbins && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {fetchingDustbins ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600">Loading dustbins...</p>
              </div>
            ) : dustbins.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🗑️</span>
                <p className="text-gray-500 italic">No dustbins found. Add some dustbins to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Latitude
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Longitude
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dustbins.map((bin) => (
                      <tr key={bin._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bin.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {bin.location.coordinates[1].toFixed(6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {bin.location.coordinates[0].toFixed(6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteDustbin(bin._id, bin.name)}
                            className="text-red-600 hover:text-red-800 inline-flex items-center px-3 py-2 rounded-md hover:bg-red-100 transition-colors"
                          >
                            <span className="mr-1">🗑️</span> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Existing Waste Reports Section */}
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
