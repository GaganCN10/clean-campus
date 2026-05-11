import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { dustbinAPI, waterFilterAPI, foodCourtAPI, restroomAPI } from '../utils/api';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { admin, isAuthenticated, logout, loading, login } = useAuth();
  const [reports, setReports] = useState([]);
  const [fetchingReports, setFetchingReports] = useState(false);
  
  // Dustbin State
  const [showAddDustbin, setShowAddDustbin] = useState(false);
  const [dustbinName, setDustbinName] = useState('');
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [addingDustbin, setAddingDustbin] = useState(false);
  const [dustbins, setDustbins] = useState([]);
  const [fetchingDustbins, setFetchingDustbins] = useState(false);
  const [showManageDustbins, setShowManageDustbins] = useState(false);

  // ✨ NEW: Water Filter State
  const [showAddWaterFilter, setShowAddWaterFilter] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterQuality, setFilterQuality] = useState(5);
  const [filterLocation, setFilterLocation] = useState(null);
  const [loadingFilterLocation, setLoadingFilterLocation] = useState(false);
  const [addingWaterFilter, setAddingWaterFilter] = useState(false);
  const [waterFilters, setWaterFilters] = useState([]);
  const [fetchingWaterFilters, setFetchingWaterFilters] = useState(false);
  const [showManageWaterFilters, setShowManageWaterFilters] = useState(false);

  // ✨ Food Court State
  const [showAddFoodCourt, setShowAddFoodCourt] = useState(false);
  const [foodCourtName, setFoodCourtName] = useState('');
  const [foodCourtLocation, setFoodCourtLocation] = useState(null);
  const [loadingFoodCourtLocation, setLoadingFoodCourtLocation] = useState(false);
  const [addingFoodCourt, setAddingFoodCourt] = useState(false);
  const [foodCourts, setFoodCourts] = useState([]);
  const [fetchingFoodCourts, setFetchingFoodCourts] = useState(false);
  const [showManageFoodCourts, setShowManageFoodCourts] = useState(false);

  // ✨ Restroom State
  const [showAddRestroom, setShowAddRestroom] = useState(false);
  const [restroomName, setRestroomName] = useState('');
  const [restroomGender, setRestroomGender] = useState('Unisex');
  const [restroomLocation, setRestroomLocation] = useState(null);
  const [loadingRestroomLocation, setLoadingRestroomLocation] = useState(false);
  const [addingRestroom, setAddingRestroom] = useState(false);
  const [restrooms, setRestrooms] = useState([]);
  const [fetchingRestrooms, setFetchingRestrooms] = useState(false);
  const [showManageRestrooms, setShowManageRestrooms] = useState(false);

  const fetchReports = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setFetchingReports(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await api.get('/api/admin/reports', {
        headers: { 'x-auth-token': token }
      });
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

  const fetchDustbins = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setFetchingDustbins(true);
    try {
      const res = await dustbinAPI.getAllDustbins();
      setDustbins(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch dustbins:', err);
      toast.error('Failed to fetch dustbins');
    } finally {
      setFetchingDustbins(false);
    }
  }, [isAuthenticated]);

  // ✨ NEW: Fetch water filters
  const fetchWaterFilters = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setFetchingWaterFilters(true);
    try {
      const res = await waterFilterAPI.getAllWaterFilters();
      console.log('✅ Water filters fetched:', res.data.length);
      setWaterFilters(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch water filters:', err);
      toast.error('Failed to fetch water filters');
    } finally {
      setFetchingWaterFilters(false);
    }
  }, [isAuthenticated]);

  const fetchFoodCourts = useCallback(async () => {
    if (!isAuthenticated) return;
    setFetchingFoodCourts(true);
    try {
      const res = await foodCourtAPI.getAllFoodCourts();
      setFoodCourts(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch food courts:', err);
      toast.error('Failed to fetch food courts');
    } finally {
      setFetchingFoodCourts(false);
    }
  }, [isAuthenticated]);

  const fetchRestrooms = useCallback(async () => {
    if (!isAuthenticated) return;
    setFetchingRestrooms(true);
    try {
      const res = await restroomAPI.getAllRestrooms();
      setRestrooms(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch restrooms:', err);
      toast.error('Failed to fetch restrooms');
    } finally {
      setFetchingRestrooms(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
      fetchDustbins();
      fetchWaterFilters();
      fetchFoodCourts();
      fetchRestrooms();
    }
  }, [isAuthenticated, fetchReports, fetchDustbins, fetchWaterFilters, fetchFoodCourts, fetchRestrooms]);

  const handleMarkAsClean = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/api/admin/clean/${id}`, {}, {
        headers: { 'x-auth-token': token }
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
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // ✨ NEW: Get location for water filter
  const getFilterLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoadingFilterLocation(true);
    toast.loading('Getting your location...', { id: 'filter-location' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFilterLocation({ latitude, longitude });
        toast.success(`Location captured: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`, { id: 'filter-location' });
        setLoadingFilterLocation(false);
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
        toast.error(errorMessage, { id: 'filter-location' });
        setLoadingFilterLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const getFoodCourtLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setLoadingFoodCourtLocation(true);
    toast.loading('Getting your location...', { id: 'foodcourt-location' });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFoodCourtLocation({ latitude, longitude });
        toast.success(`Location captured: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`, { id: 'foodcourt-location' });
        setLoadingFoodCourtLocation(false);
      },
      (error) => {
        toast.error('Failed to get location', { id: 'foodcourt-location' });
        setLoadingFoodCourtLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const getRestroomLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setLoadingRestroomLocation(true);
    toast.loading('Getting your location...', { id: 'restroom-location' });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRestroomLocation({ latitude, longitude });
        toast.success(`Location captured: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`, { id: 'restroom-location' });
        setLoadingRestroomLocation(false);
      },
      (error) => {
        toast.error('Failed to get location', { id: 'restroom-location' });
        setLoadingRestroomLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
      await dustbinAPI.addDustbin({
        name: dustbinName.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
      });

      toast.success('Dustbin added successfully! 🎉', { id: loadingToast });
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

  // ✨ NEW: Handle add water filter
  const handleAddWaterFilter = async (e) => {
    e.preventDefault();

    if (!filterLocation) {
      toast.error('Please capture your current location first');
      return;
    }

    if (!filterName.trim()) {
      toast.error('Please enter a water filter name');
      return;
    }

    setAddingWaterFilter(true);
    const loadingToast = toast.loading('Adding water filter...');

    try {
      await waterFilterAPI.addWaterFilter({
        name: filterName.trim(),
        latitude: filterLocation.latitude,
        longitude: filterLocation.longitude,
        quality: filterQuality,
      });

      toast.success('Water filter added successfully! 💧', { id: loadingToast });

      setFilterName('');
      setFilterLocation(null);
      setFilterQuality(5);
      setShowAddWaterFilter(false);
      fetchWaterFilters();
    } catch (err) {
      console.error('❌ Failed to add water filter:', err);
      toast.error(err.response?.data?.message || 'Failed to add water filter', { id: loadingToast });
    } finally {
      setAddingWaterFilter(false);
    }
  };

  const handleAddFoodCourt = async (e) => {
    e.preventDefault();
    if (!foodCourtLocation) return toast.error('Please capture your current location first');
    if (!foodCourtName.trim()) return toast.error('Please enter a food court name');
    setAddingFoodCourt(true);
    const loadingToast = toast.loading('Adding food court...');
    try {
      await foodCourtAPI.addFoodCourt({
        name: foodCourtName.trim(),
        latitude: foodCourtLocation.latitude,
        longitude: foodCourtLocation.longitude,
      });
      toast.success('Food court added successfully! 🍔', { id: loadingToast });
      setFoodCourtName('');
      setFoodCourtLocation(null);
      setShowAddFoodCourt(false);
      fetchFoodCourts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add food court', { id: loadingToast });
    } finally {
      setAddingFoodCourt(false);
    }
  };

  const handleAddRestroom = async (e) => {
    e.preventDefault();
    if (!restroomLocation) return toast.error('Please capture your current location first');
    if (!restroomName.trim()) return toast.error('Please enter a restroom name');
    setAddingRestroom(true);
    const loadingToast = toast.loading('Adding restroom...');
    try {
      await restroomAPI.addRestroom({
        name: restroomName.trim(),
        gender: restroomGender,
        latitude: restroomLocation.latitude,
        longitude: restroomLocation.longitude,
      });
      toast.success('Restroom added successfully! 🚻', { id: loadingToast });
      setRestroomName('');
      setRestroomLocation(null);
      setShowAddRestroom(false);
      fetchRestrooms();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add restroom', { id: loadingToast });
    } finally {
      setAddingRestroom(false);
    }
  };

  const handleDeleteDustbin = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the dustbin "${name}"? This action cannot be undone.`)) {
      return;
    }

    const loadingToast = toast.loading('Deleting dustbin...');

    try {
      await dustbinAPI.deleteDustbin(id);
      toast.success('Dustbin deleted successfully!', { id: loadingToast });
      setDustbins(prevDustbins => prevDustbins.filter(bin => bin._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete dustbin:', err);
      toast.error(err.response?.data?.message || 'Failed to delete dustbin', { id: loadingToast });
    }
  };

  // ✨ NEW: Handle toggle water filter status
  const handleToggleWaterFilterStatus = async (id, currentStatus, name) => {
    const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
    const loadingToast = toast.loading(`Marking filter as ${newStatus}...`);

    try {
      await waterFilterAPI.toggleStatus(id);
      toast.success(`Water filter "${name}" is now ${newStatus}!`, { id: loadingToast });
      fetchWaterFilters();
    } catch (err) {
      console.error('❌ Failed to toggle status:', err);
      toast.error(err.response?.data?.message || 'Failed to update status', { id: loadingToast });
    }
  };

  // ✨ NEW: Handle delete water filter
  const handleDeleteWaterFilter = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the water filter "${name}"? This action cannot be undone.`)) {
      return;
    }

    const loadingToast = toast.loading('Deleting water filter...');

    try {
      await waterFilterAPI.deleteWaterFilter(id);
      toast.success('Water filter deleted successfully!', { id: loadingToast });
      setWaterFilters(prevFilters => prevFilters.filter(filter => filter._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete water filter:', err);
      toast.error(err.response?.data?.message || 'Failed to delete water filter', { id: loadingToast });
    }
  };

  const handleToggleFoodCourtStatus = async (id, currentStatus, name) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    const loadingToast = toast.loading(`Marking food court as ${newStatus}...`);
    try {
      await foodCourtAPI.toggleStatus(id);
      toast.success(`Food court "${name}" is now ${newStatus}!`, { id: loadingToast });
      fetchFoodCourts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status', { id: loadingToast });
    }
  };

  const handleDeleteFoodCourt = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the food court "${name}"?`)) return;
    const loadingToast = toast.loading('Deleting food court...');
    try {
      await foodCourtAPI.deleteFoodCourt(id);
      toast.success('Food court deleted successfully!', { id: loadingToast });
      setFoodCourts(prev => prev.filter(fc => fc._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete food court', { id: loadingToast });
    }
  };

  const handleToggleRestroomStatus = async (id, currentStatus, name) => {
    const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
    const loadingToast = toast.loading(`Marking restroom as ${newStatus}...`);
    try {
      await restroomAPI.toggleStatus(id);
      toast.success(`Restroom "${name}" is now ${newStatus}!`, { id: loadingToast });
      fetchRestrooms();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status', { id: loadingToast });
    }
  };

  const handleDeleteRestroom = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the restroom "${name}"?`)) return;
    const loadingToast = toast.loading('Deleting restroom...');
    try {
      await restroomAPI.deleteRestroom(id);
      toast.success('Restroom deleted successfully!', { id: loadingToast });
      setRestrooms(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete restroom', { id: loadingToast });
    }
  };

  // ✨ NEW: Handle update water filter quality
  /*
  const handleUpdateQuality = async (id, newQuality, name) => {
    const loadingToast = toast.loading('Updating quality...');

    try {
      await waterFilterAPI.updateQuality(id, newQuality);
      toast.success(`Quality updated for "${name}"!`, { id: loadingToast });
      fetchWaterFilters();
    } catch (err) {
      console.error('❌ Failed to update quality:', err);
      toast.error(err.response?.data?.message || 'Failed to update quality', { id: loadingToast });
    }
  };
  */

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
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

      {/* Add Dustbin Section */}
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
                <label className="block text-gray-700 font-medium mb-2">Current Location</label>
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

      {/* ✨ NEW: Add Water Filter Section */}
      <div className="mb-8 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">💧 Add New Water Filter</h2>
            <p className="text-sm text-gray-600 mt-1">Add a water filter at your current location</p>
          </div>
          <button
            onClick={() => setShowAddWaterFilter(!showAddWaterFilter)}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
          >
            {showAddWaterFilter ? 'Close' : '+ Add Water Filter'}
          </button>
        </div>

        {showAddWaterFilter && (
          <form onSubmit={handleAddWaterFilter} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Current Location</label>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={getFilterLocation}
                    disabled={loadingFilterLocation}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-medium"
                  >
                    {loadingFilterLocation ? '⏳ Getting Location...' : '📍 Capture Location'}
                  </button>
                  
                  {filterLocation && (
                    <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 font-mono">
                        📍 Lat: {filterLocation.latitude.toFixed(6)}, Lng: {filterLocation.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="filterName">
                  Water Filter Name / Location
                </label>
                <input
                  type="text"
                  id="filterName"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="e.g., Main Building, Sports Complex, Library"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="filterQuality">
                  Water Quality (1-5): {filterQuality} ⭐
                </label>
                <input
                  type="range"
                  id="filterQuality"
                  min="1"
                  max="5"
                  value={filterQuality}
                  onChange={(e) => setFilterQuality(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor (1)</span>
                  <span>Excellent (5)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!filterLocation || addingWaterFilter}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              >
                {addingWaterFilter ? '⏳ Adding Water Filter...' : '✓ Add Water Filter to Map'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Manage Dustbins Section */}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dustbins.map((bin) => (
                      <tr key={bin._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bin.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{bin.location.coordinates[1].toFixed(6)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{bin.location.coordinates[0].toFixed(6)}</td>
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

      {/* ✨ NEW: Manage Water Filters Section */}
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">💧 Manage Water Filters</h2>
            <p className="text-sm text-gray-600 mt-1">Toggle status, update quality, and delete water filters</p>
          </div>
          <button
            onClick={() => setShowManageWaterFilters(!showManageWaterFilters)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            {showManageWaterFilters ? 'Close' : 'Manage Water Filters'}
          </button>
        </div>

        {showManageWaterFilters && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {fetchingWaterFilters ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600">Loading water filters...</p>
              </div>
            ) : waterFilters.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">💧</span>
                <p className="text-gray-500 italic">No water filters found. Add some water filters to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinates</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {waterFilters.map((filter) => (
                      <tr key={filter._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{filter.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            filter.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {filter.status === 'available' ? '✓ Available' : '✗ Unavailable'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {'⭐'.repeat(filter.quality)} ({filter.quality}/5)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {filter.location.coordinates[1].toFixed(4)}, {filter.location.coordinates[0].toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleToggleWaterFilterStatus(filter._id, filter.status, filter.name)}
                            className={`inline-flex items-center px-3 py-2 rounded-md transition-colors ${
                              filter.status === 'available'
                                ? 'text-red-600 hover:text-red-800 hover:bg-red-100'
                                : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                            }`}
                          >
                            {filter.status === 'available' ? '🔴 Mark Unavailable' : '🟢 Mark Available'}
                          </button>
                          <button
                            onClick={() => handleDeleteWaterFilter(filter._id, filter.name)}
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

      {/* ✨ NEW: Add Food Court Section */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">🍔 Add New Food Court</h2>
            <p className="text-sm text-gray-600 mt-1">Add a food court at your current location</p>
          </div>
          <button
            onClick={() => setShowAddFoodCourt(!showAddFoodCourt)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {showAddFoodCourt ? 'Close' : '+ Add Food Court'}
          </button>
        </div>

        {showAddFoodCourt && (
          <form onSubmit={handleAddFoodCourt} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Current Location</label>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={getFoodCourtLocation}
                    disabled={loadingFoodCourtLocation}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 font-medium"
                  >
                    {loadingFoodCourtLocation ? '⏳ Getting...' : '📍 Capture Location'}
                  </button>
                  {foodCourtLocation && (
                    <div className="flex-1 bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-800 font-mono">
                        📍 Lat: {foodCourtLocation.latitude.toFixed(6)}, Lng: {foodCourtLocation.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Food Court Name</label>
                <input
                  type="text"
                  value={foodCourtName}
                  onChange={(e) => setFoodCourtName(e.target.value)}
                  placeholder="e.g., Main Canteen"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!foodCourtLocation || addingFoodCourt}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {addingFoodCourt ? '⏳ Adding...' : '✓ Add Food Court'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ✨ NEW: Manage Food Courts Section */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">🍔 Manage Food Courts</h2>
          </div>
          <button
            onClick={() => setShowManageFoodCourts(!showManageFoodCourts)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {showManageFoodCourts ? 'Close' : 'Manage Food Courts'}
          </button>
        </div>

        {showManageFoodCourts && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {fetchingFoodCourts ? (
              <div className="text-center py-10">Loading...</div>
            ) : foodCourts.length === 0 ? (
              <div className="text-center py-12">No food courts found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {foodCourts.map(fc => (
                    <tr key={fc._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{fc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {fc.status === 'open' ? '🟢 Open' : '🔴 Closed'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleToggleFoodCourtStatus(fc._id, fc.status, fc.name)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-2"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => handleDeleteFoodCourt(fc._id, fc.name)}
                          className="text-red-600 hover:text-red-800 px-3 py-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ✨ NEW: Add Restroom Section */}
      <div className="mb-8 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">🚻 Add New Restroom</h2>
            <p className="text-sm text-gray-600 mt-1">Add a restroom at your current location</p>
          </div>
          <button
            onClick={() => setShowAddRestroom(!showAddRestroom)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            {showAddRestroom ? 'Close' : '+ Add Restroom'}
          </button>
        </div>

        {showAddRestroom && (
          <form onSubmit={handleAddRestroom} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Current Location</label>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={getRestroomLocation}
                    disabled={loadingRestroomLocation}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-medium"
                  >
                    {loadingRestroomLocation ? '⏳ Getting...' : '📍 Capture Location'}
                  </button>
                  {restroomLocation && (
                    <div className="flex-1 bg-teal-50 p-3 rounded-lg">
                      <p className="text-sm text-teal-800 font-mono">
                        📍 Lat: {restroomLocation.latitude.toFixed(6)}, Lng: {restroomLocation.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Restroom Name</label>
                <input
                  type="text"
                  value={restroomName}
                  onChange={(e) => setRestroomName(e.target.value)}
                  placeholder="e.g., Library Restroom"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Gender</label>
                <select
                  value={restroomGender}
                  onChange={(e) => setRestroomGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={!restroomLocation || addingRestroom}
                className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
              >
                {addingRestroom ? '⏳ Adding...' : '✓ Add Restroom'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ✨ NEW: Manage Restrooms Section */}
      <div className="mb-8 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">🚻 Manage Restrooms</h2>
          </div>
          <button
            onClick={() => setShowManageRestrooms(!showManageRestrooms)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            {showManageRestrooms ? 'Close' : 'Manage Restrooms'}
          </button>
        </div>

        {showManageRestrooms && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {fetchingRestrooms ? (
              <div className="text-center py-10">Loading...</div>
            ) : restrooms.length === 0 ? (
              <div className="text-center py-12">No restrooms found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {restrooms.map(r => (
                    <tr key={r._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{r.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{r.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {r.status === 'available' ? '🟢 Available' : '🔴 Unavailable'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleToggleRestroomStatus(r._id, r.status, r.name)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-2"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => handleDeleteRestroom(r._id, r.name)}
                          className="text-red-600 hover:text-red-800 px-3 py-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
