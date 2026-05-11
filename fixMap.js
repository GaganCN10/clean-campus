const fs = require('fs');

const foodCourtContent = `import React, { useState, useEffect } from 'react';
import { foodCourtAPI } from '../utils/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-hot-toast';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocateFoodCourtPage = () => {
  const [foodCourts, setFoodCourts] = useState([]);
  
  useEffect(() => {
    fetchFoodCourts();
  }, []);

  const fetchFoodCourts = async () => {
    try {
      const { data } = await foodCourtAPI.getAllFoodCourts();
      setFoodCourts(data);
    } catch (error) {
      toast.error('Failed to load food courts');
    }
  };

  const center = { lat: 28.5355, lng: 77.3910 }; // Default center

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">🍔 Locate Food Courts</h1>
      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-orange-200 relative z-0">
        <MapContainer center={[center.lat, center.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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

const restroomContent = `import React, { useState, useEffect } from 'react';
import { restroomAPI } from '../utils/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-hot-toast';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocateRestroomPage = () => {
  const [restrooms, setRestrooms] = useState([]);
  const [gender, setGender] = useState('');
  
  useEffect(() => {
    fetchRestrooms();
  }, [gender]);

  const fetchRestrooms = async () => {
    try {
      const { data } = await restroomAPI.getAllRestrooms(gender);
      setRestrooms(data);
    } catch (error) {
      toast.error('Failed to load restrooms');
    }
  };

  const center = { lat: 28.5355, lng: 77.3910 };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">🚻 Locate Restrooms</h1>
      
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

fs.writeFileSync('client/src/pages/LocateFoodCourtPage.jsx', foodCourtContent);
fs.writeFileSync('client/src/pages/LocateRestroomPage.jsx', restroomContent);
