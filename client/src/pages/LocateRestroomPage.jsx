import React, { useState, useEffect } from 'react';
import { restroomAPI } from '../utils/api';
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
  iconUrl: '/icons/user-location.svg',
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

const LocateRestroomPage = () => {
  const [restrooms, setRestrooms] = useState([]);
  const [gender, setGender] = useState('');
  const [nearestRestroom, setNearestRestroom] = useState(null);
  const { userLocation, loading, locationError } = useDeviceLocation();
  
  useEffect(() => {
    fetchRestrooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, userLocation]);

  
  useEffect(() => {
    if (!userLocation) return;
    
    if (restrooms.length === 0) {
      setNearestRestroom(null);
      return;
    }

    let nearest = null;
    let minDist = Infinity;

    const availableRRs = restrooms.filter(rr => rr.status === 'available');

    if (availableRRs.length === 0) {
      setNearestRestroom(null);
      return;
    }

    availableRRs.forEach((rr) => {
      const rrLoc = [rr.location.coordinates[1], rr.location.coordinates[0]];
      const dist = L.latLng(userLocation).distanceTo(rrLoc);

      if (dist < minDist) {
        minDist = dist;
        nearest = rr;
      }
    });

    if (nearest) {
      setNearestRestroom({
        rr: nearest,
        distance: (minDist / 1000).toFixed(2),
      });
    }
  }, [userLocation, restrooms]);

  const fetchRestrooms = async () => {
    try {
      const { data } = await restroomAPI.getAllRestrooms(gender);
      setRestrooms(data);
    } catch (error) {
      toast.error('Failed to load restrooms');
    }
  };

  const center = userLocation ? { lat: userLocation[0], lng: userLocation[1] } : { lat: 28.5355, lng: 77.3910 };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px] mt-8 max-w-7xl mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
        <p className="ml-4 text-gray-600 font-medium">Acquiring current location...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">🚻 Locate Restrooms</h1>
      {locationError && <p className="text-red-500 mb-4">{locationError}</p>}
      
      <div className="mb-6 flex gap-4">
        <button onClick={() => setGender('')} className={`px-4 py-2 rounded-md font-semibold ${gender === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
        <button onClick={() => setGender('Male')} className={`px-4 py-2 rounded-md font-semibold ${gender === 'Male' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Male</button>
        <button onClick={() => setGender('Female')} className={`px-4 py-2 rounded-md font-semibold ${gender === 'Female' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Female</button>
        <button onClick={() => setGender('Unisex')} className={`px-4 py-2 rounded-md font-semibold ${gender === 'Unisex' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Unisex</button>
      </div>

      {nearestRestroom ? (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 text-center border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold text-indigo-600">
            Nearest Open Restroom: {nearestRestroom.rr.name}
          </h2>
          <p className="text-gray-600">
            Approx. <strong>{nearestRestroom.distance} km</strong> away
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 text-center border-l-4 border-gray-300">
          {restrooms.length > 0 && !locationError && !userLocation ? 'Waiting for location...' : 'No open restrooms nearby.'}
        </div>
      )}

      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-indigo-200 relative z-0">
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

          {restrooms.filter(r => r.status === 'available').map(r => (
            <Marker 
              key={r._id} 
              position={[r.location.coordinates[1], r.location.coordinates[0]]}
            >
              <Popup>
                <div className="text-center">
                  <span className="text-2xl">{r.gender === 'Female' ? '🚺' : r.gender === 'Male' ? '🚹' : '🚻'}</span>
                  <h3 className="font-bold text-lg mt-1">{r.name}</h3>
                  <p className="text-gray-600">{r.gender} Restroom</p>
                  <p className={`font-semibold ${r.status === 'available' ? 'text-green-600' : 'text-red-500'}`}>
                    {r.status === 'available' ? 'Available' : 'Unavailable'}
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

export default LocateRestroomPage;