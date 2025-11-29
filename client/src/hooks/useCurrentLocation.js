import { useState, useEffect } from 'react';

export default function useCurrentLocation(options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }) {
  const [position, setPosition] = useState(null); // { lat, lng }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError(new Error('Geolocation not supported by this browser.'));
      setLoading(false);
      return;
    }

    let mounted = true;
    const success = (pos) => {
      if (!mounted) return;
      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
      setLoading(false);
    };

    const fail = (err) => {
      if (!mounted) return;
      setError(err);
      setLoading(false);
    };

    // Request current position once
    navigator.geolocation.getCurrentPosition(success, fail, options);

    return () => { mounted = false; };
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return { position, loading, error };
}
