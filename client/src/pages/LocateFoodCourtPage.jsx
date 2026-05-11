import React, { useState, useEffect } from 'react';
import { foodCourtAPI } from '../utils/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-hot-toast';
import { useDeviceLocation } from '../hooks/useDeviceLocation';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const userPinIcon = new L.Icon({
  iconUrl: '/icons/user-location.svg', // Assuming this exists from other maps
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

const LocateFoodCourtPage = () => {
  const [foodCourts, setFoodCourts] = useState([]);
  const [nearestFoodCourt, setNearestFoodCourt] = useState(null);
  const { userLocation, loading, locationError } = useDeviceLocation();
  
  useEffect(() => {
    fetchFoodCourts();
  }, [userLocation]); // Re-fetch or filter if needed based on location later

  
  useEffect(() => {
    if (!userLocation) return;

    if (foodCourts.length === 0) {
      setNearestFoodCourt(null);
      return;
    }

    let nearest = null;
    let minDist = Infinity;

    const availableFCs = foodCourts.filter(fc => fc.status === 'open');

    if (availableFCs.length === 0) {
      setNearestFoodCourt(null);
      return;
    }

    availableFCs.forEach((fc) => {
      const fcLoc = [fc.location.coordinates[1], fc.location.coordinates[0]];
      const dist = L.latLng(userLocation).distanceTo(fcLoc);

      if (dist < minDist) {
        minDist = dist;
        nearest = fc;
      }
    });

    if (nearest) {
      setNearestFoodCourt({
        fc: nearest,
        distance: (minDist / 1000).toFixed(2),
      });
    }
  }, [userLocation, foodCourts]);

  const fetchFoodCourts = async () => {
    try {
      // If backend supports finding nearest, you can pass longitude/latitude here
      // For now we get all, as implemented previously
      const { data } = await foodCourtAPI.getAllFoodCourts();
      setFoodCourts(data);
    } catch (error) {
      toast.error('Failed to load food courts');
    }
  };

  const center = userLocation ? { lat: userLocation[0], lng: userLocation[1] } : { lat: 28.5355, lng: 77.3910 };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px] mt-8 max-w-7xl mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
        <p className="ml-4 text-gray-600 font-medium">Acquiring current location...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-2">🍔 Locate Food Courts</h1>
      
      {locationError && <p className="text-red-500 mb-4">{locationError}</p>}
      
      {nearestFoodCourt ? (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 text-center border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-orange-600">
            Nearest Open Food Court: {nearestFoodCourt.fc.name}
          </h2>
          <p className="text-gray-600">
            Approx. <strong>{nearestFoodCourt.distance} km</strong> away
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 text-center border-l-4 border-gray-300">
           {foodCourts.length > 0 && !locationError && !userLocation ? 'Waiting for location...' : 'No open food courts nearby.'}
        </div>
      )}
      
      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-orange-200 relative z-0">
        <MapContainer center={[center.lat, center.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {userLocation && (
            <Marker position={userLocation} icon={userPinIcon}>
              <Popup>
                <div className="font-bold">You are here</div>
              </Popup>
            </Marker>
          )}

          {foodCourts.filter(fc => fc.status === 'open').map(fc => (
            <Marker 
              key={fc._id} 
              position={[fc.location.coordinates[1], fc.location.coordinates[0]]}
            >
              <Popup>
                <div className="text-center">
                  <span className="text-2xl">🍔</span>
                  <h3 className="font-bold text-lg mt-1">{fc.name}</h3>
                  <p className={`font-semibold ${fc.status === 'open' ? 'text-green-600' : 'text-red-500'}`}>
                    {fc.status === 'open' ? 'Open' : 'Closed'}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocateFoodCourtPage;