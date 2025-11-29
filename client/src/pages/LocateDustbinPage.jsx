// // client/src/pages/LocateDustbinPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// const dustbinIconAvailable = new L.Icon({
//   iconUrl: '/icons/dustbin-available-icon.svg',
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48]
// });
// const dustbinIconFull = new L.Icon({
//   iconUrl: '/icons/dustbin-full-icon.svg',
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48]
// });
// // user location pin (same as full dustbin red)
// const userPinIcon = new L.Icon({
//   iconUrl: '/icons/user-location.svg',
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48]
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [nearestDustbin, setNearestDustbin] = useState(null);

//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Use watchPosition to get device location; set initial center once we have it
//     if ('geolocation' in navigator) {
//       const id = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
//           // stop the initial watcher -- we only needed initial center here
//           navigator.geolocation.clearWatch(id);
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//           toast.error('Could not retrieve your location. Showing all dustbins.');
//         },
//         { enableHighAccuracy: true, maximumAge: 5000 }
//       );
//     } else {
//       toast.error('Geolocation is not supported by your browser.');
//     }


//     // Fetch dustbin data from your backend
//       const fetchDustbins = async () => {
//         try {
//           const res = await api.get('/api/dustbins');
//           setDustbins(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch dustbin locations.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDustbins();
//   }, []);

//   // Recenter Leaflet map when userLocation becomes available
//   useEffect(() => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.setView(userLocation, 16);
//     }
//   }, [userLocation]);

//   useEffect(() => {
//     if (userLocation && dustbins.length > 0) {
//       let closestDustbin = null;
//       let minDistance = Infinity;

//       dustbins.forEach(dustbin => {
//         const dustbinLocation = [dustbin.location.coordinates[1], dustbin.location.coordinates[0]];
//         const distance = L.latLng(userLocation).distanceTo(dustbinLocation);
        
//         if (distance < minDistance) {
//           minDistance = distance;
//           closestDustbin = dustbin;
//         }
//       });
//       setNearestDustbin({ dustbin: closestDustbin, distance: (minDistance / 1000).toFixed(2) });
//     }
//   }, [userLocation, dustbins]);

//     const LocationMarker = () => {
//     useMap().setView(userLocation, 16);
//     //|| [12.31639, 76.61380]
//     return userLocation === null ? null : (
//       <Marker position={userLocation} icon={userPinIcon}>
//         <Popup>You are here!</Popup>
//       </Marker>
//     );
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading map...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Dustbins Near You</h1>
//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {userLocation && nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               The nearest dustbin is: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approximately {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}
//         <div className="w-full h-full">
//           <MapContainer
//             whenCreated={(mapInstance) => { mapRef.current = mapInstance }}
//             center={userLocation || [12.31639, 76.61380]}
//             zoom={16}
//             scrollWheelZoom={true}
//             style={{ height: "100%", width: "100%" }}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {userLocation && <LocationMarker />}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[
//                   dustbin.location.coordinates[1],
//                   dustbin.location.coordinates[0],
//                 ]}
//                 icon={dustbin.status === 'available' ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <span className="font-semibold">{dustbin.name}</span>
//                   <br />
//                   <span className="text-sm text-gray-500">
//                     Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                   </span>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// const dustbinIconAvailable = new L.Icon({
//   iconUrl: '/icons/dustbin-available-icon.svg',
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: '/icons/dustbin-full-icon.svg',
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: '/icons/user-location.svg',
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // ✅ Get precise device location
//   useEffect(() => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//           toast.error('Please enable location services.');
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       toast.error('Geolocation is not supported by your browser.');
//     }
//   }, []);

//   // ✅ Fetch dustbins from backend
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get('/api/dustbins');
//         setDustbins(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch dustbin locations.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDustbins();
//   }, []);

//   // ✅ Recenter map dynamically
//   useEffect(() => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.setView(userLocation, 16);
//     }
//   }, [userLocation]);

//   // ✅ Compute nearest dustbin whenever data or location changes
//   useEffect(() => {
//     if (userLocation && dustbins.length > 0) {
//       let closestDustbin = null;
//       let minDistance = Infinity;

//       dustbins.forEach((dustbin) => {
//         const dustbinLocation = [dustbin.location.coordinates[1], dustbin.location.coordinates[0]];
//         const distance = L.latLng(userLocation).distanceTo(dustbinLocation);
//         if (distance < minDistance) {
//           minDistance = distance;
//           closestDustbin = dustbin;
//         }
//       });

//       if (closestDustbin) {
//         setNearestDustbin({
//           dustbin: closestDustbin,
//           distance: (minDistance / 1000).toFixed(2),
//         });
//       }
//     }
//   }, [userLocation, dustbins]);

//   if (loading) return <div className="text-center py-10">Loading map...</div>;
//   if (!userLocation) return <div className="text-center py-10">Waiting for location permission...</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* User Marker */}
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {/* Dustbin Markers */}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[
//                   dustbin.location.coordinates[1],
//                   dustbin.location.coordinates[0],
//                 ]}
//                 icon={dustbin.status === 'available' ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <span className="font-semibold">{dustbin.name}</span>
//                   <br />
//                   <span className="text-sm text-gray-500">
//                     Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                   </span>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;



// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // ✅ Get device location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setUserLocation([pos.coords.latitude, pos.coords.longitude]);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Please enable location access.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }, []);

//   // ✅ Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         setDustbins(res.data);
//       } catch (err) {
//         toast.error("Failed to load dustbins.");
//         console.error(err);
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // ✅ Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;
//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const loc = [d.location.coordinates[1], d.location.coordinates[0]];
//       const dist = L.latLng(userLocation).distanceTo(loc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   if (loading) return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation) return <div className="text-center py-10">Location not found. Enable GPS.</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             ref={mapRef}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[
//                   dustbin.location.coordinates[1],
//                   dustbin.location.coordinates[0],
//                 ]}
//                 icon={
//                   dustbin.status === "available"
//                     ? dustbinIconAvailable
//                     : dustbinIconFull
//                 }
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon:{" "}
//                   {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;



// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // ✅ Get device location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         if (!latitude || !longitude) {
//           toast.error("Could not get your location. Please refresh.");
//           setLoading(false);
//           return;
//         }
//         setUserLocation([latitude, longitude]);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Please enable location access and refresh.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//     );
//   }, []);

//   // ✅ Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         if (Array.isArray(res.data)) setDustbins(res.data);
//         else throw new Error("Invalid dustbin data");
//       } catch (err) {
//         toast.error("Failed to load dustbins.");
//         console.error(err);
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // ✅ Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;
//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       if (!d.location?.coordinates) return;
//       const loc = [d.location.coordinates[1], d.location.coordinates[0]]; // [lat, lng]
//       const dist = L.latLng(userLocation).distanceTo(loc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   if (loading) return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation) return <div className="text-center py-10">Location not found. Enable GPS.</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             ref={mapRef}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[
//                   dustbin.location.coordinates[1],
//                   dustbin.location.coordinates[0],
//                 ]}
//                 icon={
//                   dustbin.status === "available"
//                     ? dustbinIconAvailable
//                     : dustbinIconFull
//                 }
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon:{" "}
//                   {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;


// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // ✅ Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // ✅ Watch device location in real-time
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
//         console.log("Location fix:", latitude, longitude, "accuracy:", accuracy);

//         if (latitude && longitude) {
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
//         }
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Please enable location access and refresh.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // ✅ Fetch dustbins from backend
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         setDustbins(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // ✅ Calculate nearest dustbin whenever user location or data changes
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       // GeoJSON order is [lng, lat]
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]];
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//       console.log(userLocation);
//     }
//   }, [userLocation, dustbins]);

//   // ✅ Recenter map on location update
//   useEffect(() => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.setView(userLocation, 16);
//     }
//   }, [userLocation]);

//   if (loading)
//     return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation)
//     return (
//       <div className="text-center py-10">
//         Unable to access your location. Please enable GPS.
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             whenCreated={(map) => (mapRef.current = map)}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* User Marker */}
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {/* Dustbin Markers */}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[
//                   dustbin.location.coordinates[1],
//                   dustbin.location.coordinates[0],
//                 ]}
//                 icon={
//                   dustbin.status === "available"
//                     ? dustbinIconAvailable
//                     : dustbinIconFull
//                 }
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon:{" "}
//                   {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;

// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // Watch device location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         if (latitude && longitude) {
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
//         }
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Please enable location access and refresh the page.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // Fetch dustbins from backend
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         setDustbins(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]]; // lat, lng
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   // Recenter map
//   useEffect(() => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.setView(userLocation, 16);
//     }
//   }, [userLocation]);

//   if (loading)
//     return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation)
//     return (
//       <div className="text-center py-10">
//         Unable to access your location. Please enable GPS.
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             whenCreated={(map) => (mapRef.current = map)}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[
//                   dustbin.location.coordinates[1],
//                   dustbin.location.coordinates[0],
//                 ]}
//                 icon={
//                   dustbin.status === "available"
//                     ? dustbinIconAvailable
//                     : dustbinIconFull
//                 }
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon:{" "}
//                   {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;





// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // Get real-time device location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setUserLocation([latitude, longitude]);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Enable GPS and refresh the page.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // Fetch dustbins from backend
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         setDustbins(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]]; // lat, lng
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   // Recenter map on user location
//   useEffect(() => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.setView(userLocation, 16);
//     }
//   }, [userLocation]);

//   if (loading) return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation)
//     return <div className="text-center py-10">Unable to access your location. Enable GPS.</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             whenCreated={(map) => (mapRef.current = map)}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* User marker */}
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {/* Dustbin markers */}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
//                 icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;



// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const mapRef = useRef(null);

//   // Watch device location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         if (latitude && longitude) {
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
//         }
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Please enable location access and refresh the page.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         setDustbins(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]]; // lat,lng
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   // Recenter map
//   useEffect(() => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.setView(userLocation, 16);
//     }
//   }, [userLocation]);

//   if (loading) return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation)
//     return (
//       <div className="text-center py-10">
//         Unable to access your location. Please enable GPS.
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away.
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             whenCreated={(map) => (mapRef.current = map)}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>You are here</Popup>
//             </Marker>

//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
//                 icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// // Component to handle map centering - CRITICAL for centering on user location
// const RecenterMap = ({ lat, lng }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     if (lat && lng) {
//       console.log("🎯 Recentering map to:", lat, lng);
//       map.setView([lat, lng], 16);
//     }
//   }, [lat, lng, map]);
  
//   return null;
// };

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const [useManualLocation, setUseManualLocation] = useState(false);
//   const [manualLat, setManualLat] = useState("12.296077815874076");
//   const [manualLng, setManualLng] = useState("76.60307608638223");

//   // Get user's current location
//   useEffect(() => {
//     console.log("📍 Requesting user location...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       console.error("❌", errorMsg);
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     // Request current position with high accuracy - MUST use actual GPS
//     const geoOptions = {
//       enableHighAccuracy: true,  // Force GPS usage, not IP-based location
//       timeout: 15000,             // Increased timeout for GPS lock
//       maximumAge: 0               // Don't use cached location
//     };

//     // Try to get position multiple times if needed
//     let attempts = 0;
//     const maxAttempts = 2;

//     const getPosition = () => {
//       attempts++;
//       console.log(`📍 Attempt ${attempts} to get GPS location...`);
      
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude, accuracy } = position.coords;
//           console.log("✅ Got user location:", { 
//             latitude, 
//             longitude, 
//             accuracy: `${accuracy.toFixed(0)}m` 
//           });
          
//           // Check if accuracy is reasonable (< 100m means likely GPS, not IP)
//           if (accuracy > 1000 && attempts < maxAttempts) {
//             console.warn("⚠️ Low accuracy (likely IP-based), retrying...");
//             toast("Getting precise location...", { icon: "🔄" });
//             setTimeout(getPosition, 1000);
//             return;
//           }
          
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
//           toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//         },
//         (error) => {
//           console.error("❌ Geolocation error:", error);
//           let errorMsg = "Unable to get your location. ";
          
//           switch(error.code) {
//             case error.PERMISSION_DENIED:
//               errorMsg += "Please allow location access.";
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMsg += "Location information unavailable. Make sure GPS is enabled.";
//               break;
//             case error.TIMEOUT:
//               errorMsg += "Location request timed out. Make sure GPS is enabled.";
//               break;
//             default:
//               errorMsg += "Unknown error occurred.";
//           }
          
//           toast.error(errorMsg);
//           setLocationError(errorMsg);
//           setLoading(false);
//         },
//         geoOptions
//       );
//     };

//     getPosition();
//   }, []);

//   // Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         console.log("🗑️ Loaded dustbins:", res.data.length);
//         setDustbins(res.data);
//       } catch (err) {
//         console.error("❌ Failed to load dustbins:", err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]];
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       console.log("🎯 Nearest dustbin:", nearest.name, (minDist / 1000).toFixed(2), "km away");
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl">📍 Getting your precise GPS location...</div>
//         <div className="text-sm text-gray-500 mt-2">
//           Please allow location access and make sure GPS is enabled on your device
//         </div>
//         <div className="text-xs text-gray-400 mt-4">
//           This may take a few seconds while your device acquires GPS signal...
//         </div>
//       </div>
//     );
//   }

//   if (locationError || !userLocation) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to access your location"}</div>
//         <div className="text-sm text-gray-600 mt-4">
//           Please enable GPS and allow location access in your browser settings, then refresh the page.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       {/* Debug info */}
//       <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
//         <strong>📍 Your Location:</strong> Lat: {userLocation[0].toFixed(6)}, Lng: {userLocation[1].toFixed(6)}
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
            
//             {/* This component ensures the map centers on user location */}
//             <RecenterMap lat={userLocation[0]} lng={userLocation[1]} />

//             {/* User location marker */}
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>

//             {/* Dustbin markers */}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
//                 icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Status: {dustbin.status}
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, 
//                   Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// // Component to handle map centering - CRITICAL for centering on user location
// const RecenterMap = ({ lat, lng }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     if (lat && lng) {
//       console.log("🎯 Recentering map to:", lat, lng);
//       map.setView([lat, lng], 16);
//     }
//   }, [lat, lng, map]);
  
//   return null;
// };

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const [useManualLocation, setUseManualLocation] = useState(false);
//   const [manualLat, setManualLat] = useState("12.296077815874076");
//   const [manualLng, setManualLng] = useState("76.60307608638223");

//   // Get user's current location
//   useEffect(() => {
//     // Skip geolocation if manual mode
//     if (useManualLocation) {
//       setLoading(false);
//       return;
//     }

//     console.log("📍 Requesting user location...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       console.error("❌", errorMsg);
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     // Request current position with high accuracy - MUST use actual GPS
//     const geoOptions = {
//       enableHighAccuracy: true,  // Force GPS usage, not IP-based location
//       timeout: 15000,             // Increased timeout for GPS lock
//       maximumAge: 0               // Don't use cached location
//     };

//     // Try to get position multiple times if needed
//     let attempts = 0;
//     const maxAttempts = 3;

//     const getPosition = () => {
//       attempts++;
//       console.log(`📍 Attempt ${attempts} to get GPS location...`);
      
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude, accuracy } = position.coords;
//           console.log("✅ Got user location:", { 
//             latitude, 
//             longitude, 
//             accuracy: `${accuracy.toFixed(0)}m` 
//           });
          
//           // Check if accuracy is reasonable
//           // accuracy > 5000m means almost certainly IP-based location
//           if (accuracy > 5000 && attempts < maxAttempts) {
//             console.warn(`⚠️ Very low accuracy (${accuracy.toFixed(0)}m - likely IP-based), retrying...`);
//             toast.error(`Inaccurate location detected (±${(accuracy/1000).toFixed(1)}km). This appears to be IP-based.`);
//             setTimeout(getPosition, 1000);
//             return;
//           }
          
//           // Warn user if accuracy is still poor
//           if (accuracy > 1000) {
//             toast.error(`⚠️ Low accuracy location (±${(accuracy/1000).toFixed(1)}km). Click "Use Manual Location" for precise coordinates.`, {
//               duration: 6000
//             });
//             // Still set the location but show option to use manual
//             setLocationError("Inaccurate GPS - consider using manual location");
//           }
          
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
          
//           if (accuracy <= 100) {
//             toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//           }
//         },
//         (error) => {
//           console.error("❌ Geolocation error:", error);
//           let errorMsg = "Unable to get your location. ";
          
//           switch(error.code) {
//             case error.PERMISSION_DENIED:
//               errorMsg += "Please allow location access.";
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMsg += "Location information unavailable. Make sure GPS is enabled.";
//               break;
//             case error.TIMEOUT:
//               errorMsg += "Location request timed out. Make sure GPS is enabled.";
//               break;
//             default:
//               errorMsg += "Unknown error occurred.";
//           }
          
//           toast.error(errorMsg);
//           setLocationError(errorMsg);
//           setLoading(false);
//         },
//         geoOptions
//       );
//     };

//     getPosition();
//   }, [useManualLocation]);

//   // Handle manual location
//   const handleManualLocation = () => {
//     const lat = parseFloat(manualLat);
//     const lng = parseFloat(manualLng);
    
//     if (isNaN(lat) || isNaN(lng)) {
//       toast.error("Invalid coordinates");
//       return;
//     }
    
//     setUserLocation([lat, lng]);
//     toast.success("Manual location set!");
//   };

//   // Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         console.log("🗑️ Loaded dustbins:", res.data.length);
//         setDustbins(res.data);
//       } catch (err) {
//         console.error("❌ Failed to load dustbins:", err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]];
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       console.log("🎯 Nearest dustbin:", nearest.name, (minDist / 1000).toFixed(2), "km away");
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl">📍 Getting your precise GPS location...</div>
//         <div className="text-sm text-gray-500 mt-2">
//           Please allow location access and make sure GPS is enabled on your device
//         </div>
//         <div className="text-xs text-gray-400 mt-4">
//           This may take a few seconds while your device acquires GPS signal...
//         </div>
//         <button
//           onClick={() => setUseManualLocation(true)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Use Manual Location (Dev Mode)
//         </button>
//       </div>
//     );
//   }

//   if ((locationError || !userLocation) && !useManualLocation) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to access your location"}</div>
//         <div className="text-sm text-gray-600 mt-4">
//           Please enable GPS and allow location access in your browser settings, then refresh the page.
//         </div>
//         <button
//           onClick={() => setUseManualLocation(true)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Use Manual Location (Dev Mode)
//         </button>
//       </div>
//     );
//   }

//   // Manual location input
//   if (useManualLocation && !userLocation) {
//     return (
//       <div className="container mx-auto p-4 max-w-md">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Set Manual Location</h2>
//           <p className="text-sm text-gray-600 mb-4">For development/testing on PC</p>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Latitude</label>
//               <input
//                 type="text"
//                 value={manualLat}
//                 onChange={(e) => setManualLat(e.target.value)}
//                 className="w-full border rounded px-3 py-2"
//                 placeholder="e.g., 12.296077815874076"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Longitude</label>
//               <input
//                 type="text"
//                 value={manualLng}
//                 onChange={(e) => setManualLng(e.target.value)}
//                 className="w-full border rounded px-3 py-2"
//                 placeholder="e.g., 76.60307608638223"
//               />
//             </div>
//             <button
//               onClick={handleManualLocation}
//               className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
//             >
//               Set Location
//             </button>
//             <button
//               onClick={() => {
//                 setUseManualLocation(false);
//                 setLoading(true);
//               }}
//               className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
//             >
//               Use GPS Instead
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       {/* Debug info */}
//       <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
//         <strong>📍 Your Location:</strong> Lat: {userLocation[0].toFixed(6)}, Lng: {userLocation[1].toFixed(6)}
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
            
//             {/* This component ensures the map centers on user location */}
//             <RecenterMap lat={userLocation[0]} lng={userLocation[1]} />

//             {/* User location marker */}
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>

//             {/* Dustbin markers */}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
//                 icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Status: {dustbin.status}
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, 
//                   Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// // Component to handle map centering - CRITICAL for centering on user location
// const RecenterMap = ({ lat, lng }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     if (lat && lng) {
//       console.log("🎯 Recentering map to:", lat, lng);
//       map.setView([lat, lng], 16);
//     }
//   }, [lat, lng, map]);
  
//   return null;
// };

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const [useManualLocation, setUseManualLocation] = useState(false);
//   const [manualLat, setManualLat] = useState("12.296289562835137");
//   const [manualLng, setManualLng] = useState("76.60266203616874");

//   // Get user's current location
//   useEffect(() => {
//     // Skip geolocation if manual mode
//     if (useManualLocation) {
//       setLoading(false);
//       return;
//     }

//     console.log("📍 Requesting user location...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       console.error("❌", errorMsg);
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     // Request current position with high accuracy - MUST use actual GPS
//     const geoOptions = {
//       enableHighAccuracy: true,  // Force GPS usage, not IP-based location
//       timeout: 15000,             // Increased timeout for GPS lock
//       maximumAge: 0               // Don't use cached location
//     };

//     // Try to get position multiple times if needed
//     let attempts = 0;
//     const maxAttempts = 3;

//     const getPosition = () => {
//       attempts++;
//       console.log(`📍 Attempt ${attempts} to get GPS location...`);
      
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude, accuracy } = position.coords;
//           console.log("✅ Got user location:", { 
//             latitude, 
//             longitude, 
//             accuracy: `${accuracy.toFixed(0)}m` 
//           });
          
//           // Check if accuracy is reasonable
//           // accuracy > 5000m means almost certainly IP-based location
//           if (accuracy > 5000 && attempts < maxAttempts) {
//             console.warn(`⚠️ Very low accuracy (${accuracy.toFixed(0)}m - likely IP-based), retrying...`);
//             toast.error(`Inaccurate location detected (±${(accuracy/1000).toFixed(1)}km). This appears to be IP-based.`);
//             setTimeout(getPosition, 1000);
//             return;
//           }
          
//           // Warn user if accuracy is still poor
//           if (accuracy > 1000) {
//             toast.error(`⚠️ Low accuracy location (±${(accuracy/1000).toFixed(1)}km). Click "Use Manual Location" for precise coordinates.`, {
//               duration: 6000
//             });
//             // Still set the location but show option to use manual
//             setLocationError("Inaccurate GPS - consider using manual location");
//           }
          
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
          
//           if (accuracy <= 100) {
//             toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//           }
//         },
//         (error) => {
//           console.error("❌ Geolocation error:", error);
//           let errorMsg = "Unable to get your location. ";
          
//           switch(error.code) {
//             case error.PERMISSION_DENIED:
//               errorMsg += "Please allow location access.";
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMsg += "Location information unavailable. Make sure GPS is enabled.";
//               break;
//             case error.TIMEOUT:
//               errorMsg += "Location request timed out. Make sure GPS is enabled.";
//               break;
//             default:
//               errorMsg += "Unknown error occurred.";
//           }
          
//           toast.error(errorMsg);
//           setLocationError(errorMsg);
//           setLoading(false);
//         },
//         geoOptions
//       );
//     };

//     getPosition();
//   }, [useManualLocation]);

//   // Handle manual location
//   const handleManualLocation = () => {
//     const lat = parseFloat(manualLat);
//     const lng = parseFloat(manualLng);
    
//     if (isNaN(lat) || isNaN(lng)) {
//       toast.error("Invalid coordinates");
//       return;
//     }
    
//     setUserLocation([lat, lng]);
//     setLocationError(null); // Clear any errors
//     setUseManualLocation(false); // Exit manual mode
//     toast.success("Manual location set!");
//   };

//   // Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         console.log("🗑️ Loaded dustbins:", res.data.length);
//         setDustbins(res.data);
//       } catch (err) {
//         console.error("❌ Failed to load dustbins:", err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]];
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       console.log("🎯 Nearest dustbin:", nearest.name, (minDist / 1000).toFixed(2), "km away");
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl">📍 Getting your precise GPS location...</div>
//         <div className="text-sm text-gray-500 mt-2">
//           Please allow location access and make sure GPS is enabled on your device
//         </div>
//         <div className="text-xs text-gray-400 mt-4">
//           This may take a few seconds while your device acquires GPS signal...
//         </div>
//         <button
//           onClick={() => setUseManualLocation(true)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Use Manual Location (Dev Mode)
//         </button>
//       </div>
//     );
//   }

//   if ((locationError || !userLocation) && !useManualLocation) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to access your location"}</div>
//         <div className="text-sm text-gray-600 mt-4">
//           Please enable GPS and allow location access in your browser settings.
//         </div>
//         <button
//           onClick={() => setUseManualLocation(true)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Use Manual Location (Dev Mode)
//         </button>
//       </div>
//     );
//   }

//   // Manual location input - also show if location is inaccurate
//   if ((useManualLocation && !userLocation) || (useManualLocation && userLocation)) {
//     return (
//       <div className="container mx-auto p-4 max-w-md">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Set Manual Location</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             {userLocation 
//               ? "Update your location with precise coordinates" 
//               : "For development/testing on PC"}
//           </p>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Latitude</label>
//               <input
//                 type="text"
//                 value={manualLat}
//                 onChange={(e) => setManualLat(e.target.value)}
//                 className="w-full border rounded px-3 py-2"
//                 placeholder="e.g., 12.296289562835137"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Longitude</label>
//               <input
//                 type="text"
//                 value={manualLng}
//                 onChange={(e) => setManualLng(e.target.value)}
//                 className="w-full border rounded px-3 py-2"
//                 placeholder="e.g., 76.60266203616874"
//               />
//             </div>
//             <button
//               onClick={handleManualLocation}
//               className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
//             >
//               Set Location
//             </button>
//             {!userLocation && (
//               <button
//                 onClick={() => {
//                   setUseManualLocation(false);
//                   setLoading(true);
//                 }}
//                 className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
//               >
//                 Use GPS Instead
//               </button>
//             )}
//             {userLocation && (
//               <button
//                 onClick={() => setUseManualLocation(false)}
//                 className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       {/* Debug info with accuracy warning */}
//       <div className={`border rounded p-3 mb-4 text-sm ${
//         locationError && locationError.includes("Inaccurate") 
//           ? "bg-yellow-50 border-yellow-300" 
//           : "bg-blue-50 border-blue-200"
//       }`}>
//         <div className="flex justify-between items-center">
//           <div>
//             <strong>📍 Your Location:</strong> Lat: {userLocation[0].toFixed(6)}, Lng: {userLocation[1].toFixed(6)}
//             {locationError && locationError.includes("Inaccurate") && (
//               <div className="text-yellow-700 mt-1">
//                 ⚠️ This may be IP-based location (inaccurate)
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setUseManualLocation(true)}
//             className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
//           >
//             Set Manual Location
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
            
//             {/* This component ensures the map centers on user location */}
//             <RecenterMap lat={userLocation[0]} lng={userLocation[1]} />

//             {/* User location marker */}
//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>

//             {/* Dustbin markers */}
//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
//                 icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Status: {dustbin.status}
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, 
//                   Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;



// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// // Custom Icons
// const dustbinIconAvailable = new L.Icon({
//   iconUrl: "/icons/dustbin-available-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const dustbinIconFull = new L.Icon({
//   iconUrl: "/icons/dustbin-full-icon.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// const userPinIcon = new L.Icon({
//   iconUrl: "/icons/user-location.svg",
//   iconSize: [36, 48],
//   iconAnchor: [18, 48],
//   popupAnchor: [0, -48],
// });

// // Component to handle map centering
// const RecenterMap = ({ center, zoom = 16 }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     if (center) {
//       map.setView(center, zoom);
//     }
//   }, [center, zoom, map]);
  
//   return null;
// };

// const LocateDustbinPage = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [dustbins, setDustbins] = useState([]);
//   const [nearestDustbin, setNearestDustbin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const watchIdRef = useRef(null);

//   // Fetch dustbins
//   useEffect(() => {
//     const fetchDustbins = async () => {
//       try {
//         const res = await api.get("/api/dustbins");
//         console.log("🗑️ Loaded dustbins:", res.data.length);
//         setDustbins(res.data);
//       } catch (err) {
//         console.error("❌ Failed to load dustbins:", err);
//         toast.error("Failed to load dustbins.");
//       }
//     };
//     fetchDustbins();
//   }, []);

//   // Get user's current location with high accuracy
//   useEffect(() => {
//     console.log("📍 Starting geolocation with high accuracy mode...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       console.error("❌", errorMsg);
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     // Configuration for maximum GPS accuracy
//     const geoOptions = {
//       enableHighAccuracy: true,  // Use GPS instead of network/IP
//       maximumAge: 0,             // Don't use cached position
//       timeout: 30000             // 30 seconds timeout
//     };

//     let initialPositionReceived = false;

//     // Use watchPosition for continuous location updates
//     // This ensures we get the most accurate position over time
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude, accuracy } = position.coords;
        
//         console.log("📍 Position update:", {
//           lat: latitude,
//           lng: longitude,
//           accuracy: `${accuracy.toFixed(1)}m`,
//           timestamp: new Date(position.timestamp).toLocaleTimeString()
//         });

//         // Always update location, but inform user about accuracy
//         setUserLocation([latitude, longitude]);
        
//         if (!initialPositionReceived) {
//           initialPositionReceived = true;
//           setLoading(false);
          
//           if (accuracy <= 50) {
//             toast.success(`Location acquired! Accuracy: ±${accuracy.toFixed(0)}m`);
//           } else if (accuracy <= 200) {
//             toast.success(`Location acquired! Accuracy: ±${accuracy.toFixed(0)}m (Getting more precise...)`);
//           } else {
//             toast(`Location acquired with ±${accuracy.toFixed(0)}m accuracy. GPS is improving...`, {
//               icon: "📍",
//               duration: 3000
//             });
//           }
//         } else {
//           // Subsequent updates - only notify if significant accuracy improvement
//           if (accuracy <= 20) {
//             console.log("✨ High accuracy GPS lock achieved!");
//           }
//         }
//       },
//       (error) => {
//         console.error("❌ Geolocation error:", error);
//         let errorMsg = "";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg = "Location access denied. Please allow location access in your browser settings.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg = "Location unavailable. Please ensure GPS is enabled on your device.";
//             break;
//           case error.TIMEOUT:
//             errorMsg = "Location request timed out. Please check your GPS settings.";
//             break;
//           default:
//             errorMsg = "An unknown error occurred while getting your location.";
//         }
        
//         toast.error(errorMsg);
//         setLocationError(errorMsg);
//         setLoading(false);
//       },
//       geoOptions
//     );

//     // Cleanup function to stop watching position when component unmounts
//     return () => {
//       if (watchIdRef.current !== null) {
//         console.log("🛑 Stopping location watch");
//         navigator.geolocation.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   // Calculate nearest dustbin
//   useEffect(() => {
//     if (!userLocation || dustbins.length === 0) return;

//     let minDist = Infinity;
//     let nearest = null;

//     dustbins.forEach((d) => {
//       const dustbinLoc = [d.location.coordinates[1], d.location.coordinates[0]];
//       const dist = L.latLng(userLocation).distanceTo(dustbinLoc);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = d;
//       }
//     });

//     if (nearest) {
//       console.log("🎯 Nearest dustbin:", nearest.name, (minDist / 1000).toFixed(2), "km away");
//       setNearestDustbin({
//         dustbin: nearest,
//         distance: (minDist / 1000).toFixed(2),
//       });
//     }
//   }, [userLocation, dustbins]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//           <div className="mb-6">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 animate-pulse">
//               <span className="text-4xl">📍</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Acquiring GPS Location
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Please wait while we get your precise location...
//             </p>
//             <div className="flex justify-center space-x-2 mb-4">
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//             </div>
//             <div className="text-sm text-gray-500 space-y-1">
//               <p>✓ Make sure location permission is allowed</p>
//               <p>✓ GPS should be enabled on your device</p>
//               <p>✓ Move to an open area for better signal</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (locationError || !userLocation) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//           <div className="mb-6">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
//               <span className="text-4xl">❌</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Location Access Required
//             </h2>
//             <p className="text-gray-600 mb-4">
//               {locationError || "Unable to access your location"}
//             </p>
//             <div className="text-sm text-gray-500 space-y-2 text-left bg-gray-50 p-4 rounded-lg">
//               <p className="font-semibold">To fix this:</p>
//               <p>1. Click the location icon in your browser's address bar</p>
//               <p>2. Select "Allow" for location access</p>
//               <p>3. Make sure GPS is enabled on your device</p>
//               <p>4. Refresh the page</p>
//             </div>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-6 w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Find Dustbins Near You
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-[600px] flex flex-col items-center">
//         {nearestDustbin && (
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-emerald-600">
//               Nearest Dustbin: {nearestDustbin.dustbin.name}
//             </h2>
//             <p className="text-gray-600">
//               Approx. {nearestDustbin.distance} km away
//             </p>
//           </div>
//         )}

//         <div className="w-full h-full">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
            
//             <RecenterMap center={userLocation} />

//             <Marker position={userLocation} icon={userPinIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>

//             {dustbins.map((dustbin) => (
//               <Marker
//                 key={dustbin._id}
//                 position={[dustbin.location.coordinates[1], dustbin.location.coordinates[0]]}
//                 icon={dustbin.status === "available" ? dustbinIconAvailable : dustbinIconFull}
//               >
//                 <Popup>
//                   <b>{dustbin.name}</b>
//                   <br />
//                   Status: {dustbin.status}
//                   <br />
//                   Lat: {dustbin.location.coordinates[1].toFixed(5)}, 
//                   Lon: {dustbin.location.coordinates[0].toFixed(5)}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocateDustbinPage;


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