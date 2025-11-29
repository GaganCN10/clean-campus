import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../utils/api"; // Assuming '../utils/api' is your configured axios instance
import toast from "react-hot-toast";

// Custom Icons
const dustbinIconAvailable = new L.Icon({
  iconUrl: "/icons/dustbin-available-icon.svg",
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

const dustbinIconFull = new L.Icon({
  iconUrl: "/icons/dustbin-full-icon.svg",
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
    // Only recenter if a location is available
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const LocateDustbinPage = () => {
  const [userLocation, setUserLocation] = useState(null); // Device location (array: [lat, lng])
  const [dustbins, setDustbins] = useState([]);
  const [nearestDustbin, setNearestDustbin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const watchIdRef = useRef(null);

  // Fetch dustbins
  useEffect(() => {
    const fetchDustbins = async () => {
      try {
        const res = await api.get("/api/dustbins");
        setDustbins(res.data);
      } catch (err) {
        console.error("❌ Failed to load dustbins:", err);
        toast.error("Failed to load dustbins. Check API connection.");
      }
    };
    fetchDustbins();
  }, []);

  // Get user's current location with high accuracy
  useEffect(() => {
    console.log("📍 [Dustbin Locator] Starting geolocation...");
    
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

    // Use watchPosition for continuous location updates
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
        console.error("❌ [Dustbin Locator] Geolocation error:", error);
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

    // Cleanup function
    return () => {
      if (watchIdRef.current !== null) {
        console.log("🛑 [Dustbin Locator] Stopping location watch");
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Calculate nearest dustbin
  useEffect(() => {
    if (!userLocation || dustbins.length === 0) return;

    let minDist = Infinity;
    let nearest = null;

    dustbins.forEach((d) => {
      // NOTE: Assuming dustbin coordinates are stored as [longitude, latitude] (GeoJSON standard)
      const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]];
      
      // Calculate distance in meters
      const dist = L.latLng(userLocation).distanceTo(dustbinLoc); 

      if (dist < minDist) {
        minDist = dist;
        nearest = d;
      }
    });

    if (nearest) {
      setNearestDustbin({
        dustbin: nearest,
        distance: (minDist / 1000).toFixed(2), // Convert meters to km
      });
    }
  }, [userLocation, dustbins]);

  // --- Loading/Error State Render (Re-used UI from your original file) ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 animate-pulse">
              <span className="text-4xl">📍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Acquiring GPS Location</h2>
            <p className="text-gray-600 mb-4">Please wait while we get your precise location...</p>
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
              className="mt-6 w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  // --- End of Loading/Error State Render ---

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Find Dustbins Near You
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
        {nearestDustbin && (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-emerald-600">
              Nearest Dustbin: {nearestDustbin.dustbin.name}
            </h2>
            <p className="text-gray-600">
              Approx. **{nearestDustbin.distance} km** away
            </p>
          </div>
        )}

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

            {/* Dustbin markers */}
            {dustbins.map((dustbin) => (
              <Marker
                key={dustbin._id}
                // GeoJSON stores coordinates as [Lng, Lat] - Leaflet needs [Lat, Lng]
                position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
                icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
              >
                <Popup>
                  <b>{dustbin.name}</b>
                  <br />
                  Status: **{dustbin.status.toUpperCase()}**
                  <br />
                  Lat: {dustbin.location.coordinates[1].toFixed(5)}, 
                  Lon: {dustbin.location.coordinates[0].toFixed(5)}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocateDustbinPage;