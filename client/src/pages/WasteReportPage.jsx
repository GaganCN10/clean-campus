import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../utils/api";
import toast from "react-hot-toast";

const WasteReportPage = () => {
  const [position, setPosition] = useState(null);
  const [description, setDescription] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const timeoutRef = useRef(null);
  const mapRef = useRef(null);

  const wasteIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const userIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Get user's location with timeout and fallback
  useEffect(() => {
    console.log("📍 [Waste Report] Starting geolocation...");
    
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation not supported.";
      toast.error(errorMsg);
      setLocationError(errorMsg);
      setLoading(false);
      return;
    }

    // Set timeout - if no location after 8 seconds, use fallback
    timeoutRef.current = setTimeout(() => {
      console.log("⏱️ Timeout - trying fallback location method");
      
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const locationArray = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(locationArray);
          setPosition(L.latLng(pos.coords.latitude, pos.coords.longitude));
          setLoading(false);
          toast.success("Location acquired!");
        },
        () => {
          // If fallback also fails, use default campus location
          const defaultLocation = [12.296289562835137, 76.60266203616874];
          setUserLocation(defaultLocation);
          setPosition(L.latLng(defaultLocation[0], defaultLocation[1]));
          setLocationError("Using default location. Click map to adjust.");
          setLoading(false);
          toast("Using default location. Click map to set exact position.", { icon: "📍" });
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    }, 8000);

    // Try high accuracy first
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        const locationArray = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(locationArray);
        setPosition(L.latLng(pos.coords.latitude, pos.coords.longitude));
        setLoading(false);
        toast.success(`Location found! (±${pos.coords.accuracy.toFixed(0)}m)`);
      },
      (error) => {
        console.error("High accuracy failed:", error);
        // Let timeout handle fallback
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const MapHandler = () => {
    const map = useMap();
    mapRef.current = map;
    
    useEffect(() => {
      if (userLocation && map) {
        map.setView(userLocation, 16, { animate: true });
      }
    }, [userLocation, map]);

    useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        toast.success("Location selected!");
      },
    });

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position) {
      toast.error("Please select a location on the map.");
      return;
    }

    const loadingToast = toast.loading("Submitting report...");

    try {
      await api.post("/api/waste-reports", {
        lat: position.lat,
        lng: position.lng,
        description,
      });

      toast.dismiss(loadingToast);
      toast.success("Waste report submitted!");
      setPosition(null);
      setDescription("");
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit report.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 animate-pulse">
            <span className="text-4xl">📍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Getting Your Location</h2>
          <p className="text-gray-600 mb-4">Please wait a moment...</p>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-sm text-gray-500">This usually takes 5-10 seconds</p>
        </div>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Access Required</h2>
          <p className="text-gray-600 mb-4">{locationError || "Unable to get your location"}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const lat = position?.lat?.toFixed(6) || "";
  const lng = position?.lng?.toFixed(6) || "";

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Report Waste Location
      </h1>

      {locationError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">⚠️ {locationError}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
            <MapHandler />
            
            <Marker position={userLocation} icon={userIcon}>
              <Popup>📍 Your Location</Popup>
            </Marker>
            
            {position && (
              <Marker position={position} icon={wasteIcon}>
                <Popup>🗑️ Waste Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Selected Coordinates
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={lat}
                  readOnly
                  placeholder="Click map"
                  className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
                />
                <input
                  type="text"
                  value={lng}
                  readOnly
                  placeholder="Click map"
                  className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
                />
              </div>
              <p className="text-sm text-emerald-600 mt-2 font-medium">
                {position ? "✓ Location set!" : "👆 Click map to select waste location"}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description (Optional)
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="e.g., Overflowing dustbin near main gate"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
              disabled={!position}
            >
              {position ? "Submit Report" : "Select Location on Map"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WasteReportPage;