import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

// small component to imperatively set view when position changes
function SetView({ center, zoom = 13 }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      // setView keeps map interactive but recenters to user location
      map.setView([center.lat, center.lng], zoom, { animate: true });
    }
  }, [center, map, zoom]);
  return null;
}

export default function MapWithCenter({ center, zoom = 13, children, ...rest }) {
  const initialCenter = center || { lat: 0, lng: 0 }; // will be reset by SetView when center becomes available

  return (
    <MapContainer center={[initialCenter.lat, initialCenter.lng]} zoom={zoom} style={{ height: '100%', width: '100%' }} {...rest}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetView center={center} zoom={zoom} />
      {center && <Marker position={[center.lat, center.lng]} />}
      {children}
    </MapContainer>
  );
}
