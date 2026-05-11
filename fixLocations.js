const fs = require('fs');

const foodCourtCode = `import React, { useState, useEffect } from 'react';
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
  const { userLocation, loading, locationError } = useDeviceLocation();
  
  useEffect(() => {
    fetchFoodCourts();
  }, [userLocation]); // Re-fetch or filter if needed based on location later

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

          {foodCourts.map(fc => (
            <Marker 
              key={fc._id} 
              position={[fc.location.coordinates[1], fc.location.coordinates[0]]}
            >
              <Popup>
                <div className="text-center">
                  <span className="text-2xl">🍔</span>
                  <h3 className="font-bold text-lg mt-1">{fc.name}</h3>
                  <p className={\`font-semibold \${fc.status === 'open' ? 'text-green-600' : 'text-red-500'}\`}>
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

export default LocateFoodCourtPage;`;

const restroomCode = `import React, { useState, useEffect } from 'react';
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
  const { userLocation, loading, locationError } = useDeviceLocation();
  
  useEffect(() => {
    fetchRestrooms();
  }, [gender, userLocation]);

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
        <button onClick={() => setGender('')} className={\`px-4 py-2 rounded-md font-semibold \${gender === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>All</button>
        <button onClick={() => setGender('Male')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Male' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Male</button>
        <button onClick={() => setGender('Female')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Female' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Female</button>
        <button onClick={() => setGender('Unisex')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Unisex' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Unisex</button>
      </div>

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

          {restrooms.map(r => (
            <Marker 
              key={r._id} 
              position={[r.location.coordinates[1], r.location.coordinates[0]]}
            >
              <Popup>
                <div className="text-center">
                  <span className="text-2xl">{r.gender === 'Female' ? '🚺' : r.gender === 'Male' ? '🚹' : '🚻'}</span>
                  <h3 className="font-bold text-lg mt-1">{r.name}</h3>
                  <p className="text-gray-600">{r.gender} Restroom</p>
                  <p className={\`font-semibold \${r.status === 'open' ? 'text-green-600' : 'text-red-500'}\`}>
                    {r.status === 'open' ? 'Open' : 'Closed'}
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

export default LocateRestroomPage;`;

fs.writeFileSync('client/src/pages/LocateFoodCourtPage.jsx', foodCourtCode);
fs.writeFileSync('client/src/pages/LocateRestroomPage.jsx', restroomCode);
