// client/src/hooks/useDeviceLocation.js
import { useState, useEffect, useRef } from 'react';

export const useDeviceLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const watchIdRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log("📍 [Location Hook] Starting geolocation...");
    
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation not supported by your browser.";
      setLocationError(errorMsg);
      setLoading(false);
      return;
    }

    // Set a maximum wait time of 10 seconds
    timeoutRef.current = setTimeout(() => {
      console.log("⏱️ [Location Hook] Timeout - falling back to lower accuracy");
      
      // Try one more time with lower accuracy requirements
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("✅ [Location Hook] Got fallback location:", latitude, longitude);
          setUserLocation([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error("❌ [Location Hook] Fallback also failed:", error);
          // Use a default location (replace with your campus coordinates)
          const defaultLocation = [12.296289562835137, 76.60266203616874];
          console.log("🏫 [Location Hook] Using default campus location");
          setUserLocation(defaultLocation);
          setLocationError("Using default campus location. Please enable GPS for accurate positioning.");
          setLoading(false);
        },
        {
          enableHighAccuracy: false, // Lower accuracy for faster response
          timeout: 5000,
          maximumAge: 60000 // Accept cached location up to 1 minute old
        }
      );
    }, 10000); // 10 second timeout

    // Initial high-accuracy attempt
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    };

    watchIdRef.current = navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        
        console.log("✅ [Location Hook] High-accuracy location:", {
          latitude,
          longitude,
          accuracy: `${accuracy.toFixed(0)}m`
        });
        
        // Clear the timeout since we got location
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        console.error("❌ [Location Hook] High-accuracy failed:", error.message);
        // Don't set error yet, let timeout handler try low-accuracy
      },
      geoOptions
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { userLocation, loading, locationError };
};