import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { waterFilterAPI } from "../utils/api";
import toast from "react-hot-toast";

// Custom Water Bottle Icons with colors
const waterBottleAvailable = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="48">
    <path fill="#10b981" d="M7 2v2h10V2h-3V1H10v1H7zm0 3v2c0 1.1-.9 2-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c-1.1 0-2-.9-2-2V5H7z"/>
    ircle cx="12" cy="14" r="2" fill="#ffffff" opacity="0.5"/>
  </svg>
`)}`;

const waterBottleUnavailable = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="48">
    <path fill="#ef4444" d="M7 2v2h10V2h-3V1H10v1H7zm0 3v2c0 1.1-.9 2-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c-1.1 0-2-.9-2-2V5H7z"/>
    <line x1="6" y1="6" x2="18" y2="22" stroke="#ffffff" stroke-width="2"/>
  </svg>
`)}`;

const waterIconAvailable = new L.Icon({
  iconUrl: waterBottleAvailable,
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

const waterIconUnavailable = new L.Icon({
  iconUrl: waterBottleUnavailable,
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

const userPinIcon = new L.Icon({
  iconUrl: "/icons/user-location.svg",
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

// Component to handle map centering/recenter
const RecenterMap = ({ center, zoom = 16 }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const LocateWaterFiltersPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [waterFilters, setWaterFilters] = useState([]);
  const [nearestFilter, setNearestFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const watchIdRef = useRef(null);

  // Fetch water filters
  useEffect(() => {
    const fetchWaterFilters = async () => {
      try {
        const res = await waterFilterAPI.getAllWaterFilters();
        console.log('✅ Water filters loaded:', res.data.length);
        setWaterFilters(res.data);
      } catch (err) {
        console.error("❌ Failed to load water filters:", err);
        toast.error("Failed to load water filters. Check API connection.");
      }
    };
    fetchWaterFilters();
  }, []);

  // Get user's current location with high accuracy
  useEffect(() => {
    console.log("📍 [Water Filter Locator] Starting geolocation...");
    
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation not supported by your browser.";
      toast.error(errorMsg);
      setLocationError(errorMsg);
      setLoading(false);
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 30000
    };

    let initialPositionReceived = false;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const locationArray = [latitude, longitude];
        
        setUserLocation(locationArray);
        
        if (!initialPositionReceived) {
          initialPositionReceived = true;
          setLoading(false);
          
          if (accuracy <= 50) {
            toast.success(`Location acquired! Accuracy: ±${accuracy.toFixed(0)}m`);
          } else {
            toast(`Location acquired. GPS is improving...`, {
              icon: "📍",
              duration: 3000
            });
          }
        }
      },
      (error) => {
        console.error("❌ [Water Filter Locator] Geolocation error:", error);
        let errorMsg = "";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Location access denied. Please allow location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location unavailable. Please ensure GPS is enabled on your device.";
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out. Please check your GPS settings.";
            break;
          default:
            errorMsg = "An unknown error occurred while getting your location.";
        }
        
        toast.error(errorMsg);
        setLocationError(errorMsg);
        setLoading(false);
      },
      geoOptions
    );

    return () => {
      if (watchIdRef.current !== null) {
        console.log("🛑 [Water Filter Locator] Stopping location watch");
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ✨ UPDATED: Calculate nearest AVAILABLE water filter
  useEffect(() => {
    if (!userLocation || waterFilters.length === 0) return;

    let minDist = Infinity;
    let nearest = null;

    // Filter only available water filters
    const availableFilters = waterFilters.filter(filter => filter.status === 'available');

    if (availableFilters.length === 0) {
      // No available filters
      setNearestFilter(null);
      return;
    }

    availableFilters.forEach((filter) => {
      const filterLoc = [filter.location.coordinates[1], filter.location.coordinates[0]];
      const dist = L.latLng(userLocation).distanceTo(filterLoc);

      if (dist < minDist) {
        minDist = dist;
        nearest = filter;
      }
    });

    if (nearest) {
      setNearestFilter({
        filter: nearest,
        distance: (minDist / 1000).toFixed(2), // Convert meters to km
      });
    }
  }, [userLocation, waterFilters]);

  // Render quality stars
  const renderQualityStars = (quality) => {
    return '⭐'.repeat(quality) + '☆'.repeat(5 - quality);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4 animate-pulse">
              <span className="text-4xl">💧</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Acquiring GPS Location</h2>
            <p className="text-gray-600 mb-4">Please wait while we get your precise location...</p>
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <p>✓ Make sure location permission is allowed</p>
              <p>✓ GPS should be enabled on your device</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (locationError || !userLocation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <span className="text-4xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Access Required</h2>
            <p className="text-gray-600 mb-4">
              {locationError || "Unable to access your location"}
            </p>
            <div className="text-sm text-gray-500 space-y-2 text-left bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">To fix this:</p>
              <p>1. Click the location icon in your browser's address bar</p>
              <p>2. Select "Allow" for location access</p>
              <p>3. Refresh the page</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        💧 Find Water Filters Near You
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
        {/* ✨ UPDATED: Show message based on availability */}
        {nearestFilter ? (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-blue-600">
              Nearest Available Water Filter: {nearestFilter.filter.name}
            </h2>
            <p className="text-gray-600">
              Approx. <strong>{nearestFilter.distance} km</strong> away
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Available
              </span>
              <span className="text-sm">
                Quality: {renderQualityStars(nearestFilter.filter.quality)}
              </span>
            </div>
          </div>
        ) : waterFilters.length > 0 ? (
          <div className="mb-4 text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h2 className="text-lg font-semibold text-yellow-800">
              ⚠️ No Available Water Filters Nearby
            </h2>
            <p className="text-sm text-yellow-700 mt-1">
              All nearby water filters are currently unavailable. Please check the map or contact admin.
            </p>
          </div>
        ) : null}

        <div className="w-full h-full">
          <MapContainer
            center={userLocation}
            zoom={16}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <RecenterMap center={userLocation} />

            {/* User's current location marker */}
            <Marker position={userLocation} icon={userPinIcon}>
              <Popup>
                <strong>📍 You are here</strong>
                <br />
                Lat: {userLocation[0].toFixed(6)}
                <br />
                Lng: {userLocation[1].toFixed(6)}
              </Popup>
            </Marker>

            {/* Water filter markers */}
            {waterFilters.map((filter) => (
              <Marker
                key={filter._id}
                position={[filter.location.coordinates[1], filter.location.coordinates[0]]}
                icon={filter.status === "available" ? waterIconAvailable : waterIconUnavailable}
              >
                <Popup>
                  <div className="text-center">
                    <strong className="text-lg">💧 {filter.name}</strong>
                    <br />
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      filter.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {filter.status === 'available' ? '✓ Available' : '✗ Unavailable'}
                    </span>
                    <br />
                    <span className="text-sm mt-1 block">
                      Quality: {renderQualityStars(filter.quality)} ({filter.quality}/5)
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      Lat: {filter.location.coordinates[1].toFixed(5)}, 
                      Lng: {filter.location.coordinates[0].toFixed(5)}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💧</span>
            </div>
            <span className="text-sm text-gray-700">Available Water Filter</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💧</span>
            </div>
            <span className="text-sm text-gray-700">Unavailable Water Filter</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Quality: ⭐⭐⭐⭐⭐ (1-5 stars)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateWaterFiltersPage;
