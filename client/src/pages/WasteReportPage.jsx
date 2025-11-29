// import React, { useState } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         setPosition(e.latlng);
//       },
//     });
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('lat', position.lat);
//     formData.append('lng', position.lng);
//     formData.append('description', description);
//     if (photo) {
//       formData.append('photo', photo);
//     }

//     try {
//       await api.post('/api/waste-reports', {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//         photoUrl: '' // In a real app, you'd upload the photo and get a URL here
//       });
//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   const wasteIcon = new L.Icon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Report Waste Location</h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={[12.9221, 74.8560]} // Default to a central campus location
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapClickHandler />
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Location Coordinates</label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={position?.lat || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={position?.lng || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm"
//                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect, useCallback } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// // --- Custom Leaflet Icon Definitions ---

// // Red icon for the actual waste report location
// const wasteIcon = L.icon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
// });

// // Blue icon for the user's current location (like Google Maps)
// const userIcon = L.icon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
// });


// // --- Component to handle map clicks and set the report position ---
// const MapClickHandler = ({ setReportPosition }) => {
//     useMapEvents({
//         click: (e) => {
//             // This updates the main report position (red marker) when the user clicks
//             setReportPosition(e.latlng);
//         },
//     });
//     return null;
// };

// // --- Component to find user location, center the map, and set initial positions ---
// const LocationFinderAndCenter = ({ setReportPosition, setCurrentLocationMarker }) => {
//     const map = useMap(); // Get the Leaflet map instance

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (pos) => {
//                     const latlng = {
//                         lat: pos.coords.latitude,
//                         lng: pos.coords.longitude
//                     };
                    
//                     // 1. Center the map to user's current location
//                     map.setView([latlng.lat, latlng.lng], map.getZoom()); 
                    
//                     // 2. Set the static blue marker for current location reference
//                     setCurrentLocationMarker(latlng);
                    
//                     // 3. Set the initial report position (red marker/form fields) to current location
//                     setReportPosition(latlng); 
                    
//                     toast.success('Location found! The red marker shows your current position. Click on the map to mark the waste spot.');
//                 },
//                 (error) => {
//                     console.error('Geolocation failed:', error);
//                     toast.error('Could not determine your location. Please select the location on the map manually.');
//                 },
//                 {
//                     enableHighAccuracy: true,
//                     timeout: 5000,
//                     maximumAge: 0
//                 }
//             );
//         } else {
//             toast.error('Geolocation is not supported by your browser.');
//         }
//     }, [map, setReportPosition, setCurrentLocationMarker]);

//     return null;
// };


// // --- Main WasteReportPage Component ---
// const WasteReportPage = () => {
//     // State for the actual location of the waste report (red marker, populates form)
//     const [reportPosition, setReportPosition] = useState(null);
    
//     // State for the user's fixed current location marker (blue marker, for reference)
//     const [currentLocationMarker, setCurrentLocationMarker] = useState(null); 
    
//     const [description, setDescription] = useState('');
//     const [photo, setPhoto] = useState(null);
    
//     // Default center for the map if geolocation fails (e.g., campus center: Mangalore, India)
//     const defaultCenter = [12.9221, 74.8560]; 

//     // Memoize the setter functions to maintain function identity and prevent child component re-renders
//     const memoizedSetReportPosition = useCallback(setReportPosition, []);
//     const memoizedSetCurrentLocationMarker = useCallback(setCurrentLocationMarker, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!reportPosition) {
//             toast.error('Please select a location on the map.');
//             return;
//         }

//         // Your existing submit logic, using reportPosition for coordinates
//         const formData = new FormData();
//         formData.append('lat', reportPosition.lat);
//         formData.append('lng', reportPosition.lng);
//         formData.append('description', description);
//         if (photo) {
//             formData.append('photo', photo);
//         }

//         try {
//             await api.post('/api/waste-reports', {
//                 lat: reportPosition.lat,
//                 lng: reportPosition.lng,
//                 description,
//                 photoUrl: '' 
//             });
//             toast.success('Waste report submitted successfully!');
//             setReportPosition(null);
//             setCurrentLocationMarker(null);
//             setDescription('');
//             setPhoto(null);
//         } catch (error) {
//             toast.error('Failed to submit report.');
//             console.error(error);
//         }
//     };

//     // Format coordinates for display in the input fields
//     const formattedLat = reportPosition?.lat ? reportPosition.lat.toFixed(6) : '';
//     const formattedLng = reportPosition?.lng ? reportPosition.lng.toFixed(6) : '';


//     return (
//         <div className="container mx-auto p-4 md:p-8">
//             <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Report Waste Location</h1>
//             <div className="grid md:grid-cols-2 gap-8">
//                 <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//                     <MapContainer
//                         // Initial center is the default campus location
//                         center={defaultCenter} 
//                         zoom={16}
//                         scrollWheelZoom={true}
//                         className="leaflet-container"
//                     >
//                         <TileLayer
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />
                        
//                         {/* 1 & 2. Find user location, center map, and place blue marker */}
//                         <LocationFinderAndCenter 
//                             setReportPosition={memoizedSetReportPosition}
//                             setCurrentLocationMarker={memoizedSetCurrentLocationMarker}
//                         />
                        
//                         {/* Handle map clicks for setting the report position */}
//                         <MapClickHandler setReportPosition={memoizedSetReportPosition} />

//                         {/* Blue Marker: User's Current Location (Fixed reference point) */}
//                         {currentLocationMarker && (
//                             <Marker position={currentLocationMarker} icon={userIcon}>
//                                 <L.Tooltip>Your Current Location</L.Tooltip>
//                             </Marker>
//                         )}

//                         {/* Red Marker: The location being reported (Moves with click, populates form) */}
//                         {reportPosition && (
//                             <Marker position={reportPosition} icon={wasteIcon}>
//                                 <L.Tooltip permanent>Waste Spot</L.Tooltip>
//                             </Marker>
//                         )}
                        
//                     </MapContainer>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-lg">
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-medium mb-2">Location Coordinates</label>
//                             <div className="flex space-x-2">
//                                 {/* 3. Latitude Field (Extracts coordinate from the red marker) */}
//                                 <input
//                                     type="text"
//                                     placeholder="Latitude"
//                                     value={formattedLat}
//                                     readOnly
//                                     className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
//                                 />
//                                 {/* 3. Longitude Field (Extracts coordinate from the red marker) */}
//                                 <input
//                                     type="text"
//                                     placeholder="Longitude"
//                                     value={formattedLng}
//                                     readOnly
//                                     className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                                 Description (Optional)
//                             </label>
//                             <textarea
//                                 id="description"
//                                 rows="3"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full rounded-md border-gray-300 shadow-sm"
//                                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                                 Photo (Optional)
//                             </label>
//                             <input
//                                 type="file"
//                                 id="photo"
//                                 accept="image/*"
//                                 onChange={(e) => setPhoto(e.target.files[0])}
//                                 className="w-full text-gray-700"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//                         >
//                             Submit Report
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WasteReportPage;


// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // user's actual location

//   // Custom component to handle map clicks
//   const MapClickHandler = () => {
//     const map = useMap();
//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16); // set initial map view to user's location
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });
//     return null;
//   };

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (err) => {
//           console.warn('Geolocation failed, using default location.', err);
//           setUserLocation([12.9221, 74.8560]); // fallback
//         }
//       );
//     } else {
//       setUserLocation([12.9221, 74.8560]); // fallback if geolocation not supported
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('lat', position.lat);
//       formData.append('lng', position.lng);
//       formData.append('description', description);
//       if (photo) formData.append('photo', photo);

//       await api.post('/api/waste-reports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Only render map if userLocation is determined
//   if (!userLocation) return <div>Loading map...</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapClickHandler />
//             {position && <Marker position={position} icon={wasteIcon}></Marker>}
//           </MapContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Location Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={position?.lat || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={position?.lng || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm"
//                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;







// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // user's current location

//   // Component to handle map clicks and set map view
//   const MapClickHandler = () => {
//     const map = useMap();
//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (err) => {
//           console.warn('Geolocation failed, using default location.', err);
//           setUserLocation([12.9221, 74.8560]); // fallback
//         }
//       );
//     } else {
//       setUserLocation([12.9221, 74.8560]); // fallback if geolocation not supported
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('lat', position.lat);
//       formData.append('lng', position.lng);
//       formData.append('description', description);
//       if (photo) formData.append('photo', photo);

//       await api.post('/api/waste-reports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   if (!userLocation) return <div>Loading map...</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapClickHandler />
//             {position && <Marker position={position} icon={wasteIcon}></Marker>}
//           </MapContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Location Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={position?.lat || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={position?.lng || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm"
//                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;




// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null); // clicked marker
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // user's current location

//   // Map click handler & set map view
//   const MapClickHandler = () => {
//     const map = useMap();
//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16); // move map to user's location
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (err) => {
//           console.warn('Geolocation failed, using default location.', err);
//           setUserLocation([12.9221, 74.8560]); // fallback
//         }
//       );
//     } else {
//       setUserLocation([12.9221, 74.8560]); // fallback if geolocation not supported
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('lat', position.lat);
//       formData.append('lng', position.lng);
//       formData.append('description', description);
//       if (photo) formData.append('photo', photo);

//       await api.post('/api/waste-reports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   // Red marker for waste report
//   const wasteIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Blue marker for user location
//   const userIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   if (!userLocation) return <div>Loading map...</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapClickHandler />
//             {/* User's location marker */}
//             <Marker position={userLocation} icon={userIcon} />
//             {/* Clicked waste report marker */}
//             {position && <Marker position={position} icon={wasteIcon}></Marker>}
//           </MapContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Location Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={position?.lat || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={position?.lng || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm"
//                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null); // clicked location
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // user current location

//   // Red marker for waste report
//   const wasteIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Blue marker for user location
//   const userIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Get user location dynamically
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (err) => {
//           console.warn('Geolocation failed, using default location.', err);
//           setUserLocation([12.9221, 74.8560]); // fallback
//         }
//       );
//     } else {
//       setUserLocation([12.9221, 74.8560]);
//     }
//   }, []);

//   // Component to handle clicks and recenter map
//   const MapHandler = () => {
//     const map = useMap();

//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16); // dynamically recenter map
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('lat', position.lat);
//       formData.append('lng', position.lng);
//       formData.append('description', description);
//       if (photo) formData.append('photo', photo);

//       await api.post('/api/waste-reports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   if (!userLocation) return <div>Loading map...</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapHandler />
//             {/* User current location marker */}
//             <Marker position={userLocation} icon={userIcon} />
//             {/* Clicked marker */}
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             {/* <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Location Coordinates</label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={position?.lat || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={position?.lng || ''}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>
//             </div> */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Location Coordinates</label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={formattedLat} // Changed from position?.lat to formattedLat
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50" // Added classes for styling
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={formattedLng} // Changed from position?.lng to formattedLng
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50" // Added classes for styling
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm"
//                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;




// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null); // clicked location
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // user current location

//   // Red marker for waste report
//   const wasteIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Blue marker for user location
//   const userIcon = new L.Icon({
//     iconUrl:
//       'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl:
//       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Get user location dynamically
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (err) => {
//           console.warn('Geolocation failed, using default location.', err);
//           setUserLocation([12.9221, 74.8560]); // fallback
//         }
//       );
//     } else {
//       setUserLocation([12.9221, 74.8560]);
//     }
//   }, []);

//   // Component to handle clicks and recenter map
//   const MapHandler = () => {
//     const map = useMap();

//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16); // dynamically recenter map
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('lat', position.lat);
//       formData.append('lng', position.lng);
//       formData.append('description', description);
//       if (photo) formData.append('photo', photo);

//       await api.post('/api/waste-reports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   if (!userLocation) return <div>Loading map...</div>;

//   // Formatted coordinates for display
//   const formattedLat = position?.lat?.toFixed(6) || '';
//   const formattedLng = position?.lng?.toFixed(6) || '';

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapHandler />
//             {/* User current location marker */}
//             <Marker position={userLocation} icon={userIcon} />
//             {/* Clicked marker */}
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Location Coordinates</label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={formattedLat}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={formattedLng}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm p-2"
//                 placeholder="e.g., 'Overflowing dustbin near the cafeteria'"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;




// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import toast from 'react-hot-toast';

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null); // Clicked location
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // User current location
//   const [loading, setLoading] = useState(true);

//   // Red marker for waste report
//   const wasteIcon = new L.Icon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Blue marker for user location
//   const userIcon = new L.Icon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // ✅ Get user device location precisely
//   useEffect(() => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setUserLocation([latitude, longitude]);
//           setLoading(false);
//         },
//         (err) => {
//           console.error('Geolocation error:', err);
//           toast.error('Unable to access location. Please enable GPS.');
//           setLoading(false);
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       toast.error('Geolocation is not supported in your browser.');
//       setLoading(false);
//     }
//   }, []);

//   // Handle map clicks
//   const MapHandler = () => {
//     const map = useMap();

//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error('Please select a location on the map.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('lat', position.lat);
//       formData.append('lng', position.lng);
//       formData.append('description', description);
//       if (photo) formData.append('photo', photo);

//       await api.post('/api/waste-reports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Waste report submitted successfully!');
//       setPosition(null);
//       setDescription('');
//       setPhoto(null);
//     } catch (error) {
//       toast.error('Failed to submit report.');
//       console.error(error);
//     }
//   };

//   if (loading) return <div>Fetching device location...</div>;
//   if (!userLocation) return <div>Unable to get your location. Please allow GPS access.</div>;

//   const formattedLat = position?.lat?.toFixed(6) || '';
//   const formattedLng = position?.lng?.toFixed(6) || '';

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Map Section */}
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer
//             center={userLocation}
//             zoom={16}
//             scrollWheelZoom={true}
//             className="leaflet-container"
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapHandler />
//             <Marker position={userLocation} icon={userIcon}>
//               <L.Popup>You are here</L.Popup>
//             </Marker>
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>

//         {/* Form Section */}
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Location Coordinates</label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Latitude"
//                   value={formattedLat}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Longitude"
//                   value={formattedLng}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 id="description"
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 shadow-sm p-2"
//                 placeholder="e.g., Overflowing dustbin near the cafeteria"
//               />
//             </div>

//             <div className="mb-6">
//               <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 className="w-full text-gray-700"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // ✅ Get user location safely
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
//         toast.error("Unable to access location. Enable GPS.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }, []);

//   // ✅ Map handler
//   const MapHandler = () => {
//     const map = useMap();

//     useEffect(() => {
//       if (userLocation) map.setView(userLocation, 16);
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("lat", position.lat);
//       formData.append("lng", position.lng);
//       formData.append("description", description);
//       if (photo) formData.append("photo", photo);

//       await api.post("/api/waste-reports", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//       setPhoto(null);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) return <div>Fetching your location...</div>;
//   if (!userLocation) return <div>Unable to get your location. Please allow GPS.</div>;

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>You are here</Popup>
//             </Marker>
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Photo (Optional)
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const wasteIcon = new L.Icon({
//     iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user location
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
//         toast.error("Enable GPS to continue.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }, []);

//   // Map handler
//   const MapHandler = () => {
//     const map = useMap();

//     useEffect(() => {
//       if (userLocation) map.setView(userLocation, 16);
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("lat", position.lat);
//       formData.append("lng", position.lng);
//       formData.append("description", description);
//       if (photo) formData.append("photo", photo);

//       await api.post("/api/waste-reports", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//       setPhoto(null);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) return <div>Fetching your location...</div>;
//   if (!userLocation) return <div>Enable GPS to continue.</div>;

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer center={userLocation} zoom={16} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapHandler />
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>You are here</Popup>
//             </Marker>
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Selected Coordinates</label>
//               <div className="flex space-x-2">
//                 <input type="text" value={lat} readOnly className="w-full rounded-md border-gray-300 p-2 bg-gray-50" />
//                 <input type="text" value={lng} readOnly className="w-full rounded-md border-gray-300 p-2 bg-gray-50" />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Description (Optional)</label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">Photo (Optional)</label>
//               <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user location
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
//         toast.error("Unable to access location. Enable GPS.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }, []);

//   // Map handler
//   const MapHandler = () => {
//     const map = useMap();
//     useEffect(() => {
//       if (userLocation) map.setView(userLocation, 16);
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) return <div>Fetching your location...</div>;
//   if (!userLocation) return <div>Unable to get your location. Please allow GPS.</div>;

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>You are here</Popup>
//             </Marker>
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   className="w-full rounded-md border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const wasteIcon = new L.Icon({
//     iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

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
//         console.error(err);
//         toast.error("Unable to access location. Enable GPS.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//     );
//   }, []);

//   const MapHandler = () => {
//     const map = useMap();
//     useEffect(() => {
//       if (userLocation) map.setView(userLocation, 16);
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }
//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });
//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) return <div>Fetching your location...</div>;
//   if (!userLocation) return <div>Enable GPS to continue.</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Report Waste Location</h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
//           <MapContainer center={userLocation} zoom={16} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <MapHandler />
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>You are here</Popup>
//             </Marker>
//             {position && <Marker position={position} icon={wasteIcon} />}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Selected Coordinates</label>
//               <div className="flex space-x-2">
//                 <input type="text" readOnly value={position?.lat?.toFixed(6) || ""} className="w-full rounded-md border-gray-300 p-2 bg-gray-50"/>
//                 <input type="text" readOnly value={position?.lng?.toFixed(6) || ""} className="w-full rounded-md border-gray-300 p-2 bg-gray-50"/>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Description (Optional)</label>
//               <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-md border-gray-300 p-2" placeholder="e.g., Overflowing dustbin near main gate"/>
//             </div>

//             <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700">Submit Report</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;




// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const location = [pos.coords.latitude, pos.coords.longitude];
//         setUserLocation(location);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         toast.error("Unable to access location. Enable GPS.");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }, []);

//   // Map handler - handles both centering and click events
//   const MapHandler = () => {
//     const map = useMap();
    
//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16, {
//           animate: true,
//           duration: 1
//         });
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => setPosition(e.latlng),
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) return <div className="text-center py-10">Fetching your location...</div>;
//   if (!userLocation) return <div className="text-center py-10">Unable to get your location. Please allow GPS.</div>;

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>You are here</Popup>
//             </Marker>
//             {position && <Marker position={position} icon={wasteIcon}>
//               <Popup>Waste location selected</Popup>
//             </Marker>}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Latitude"
//                   className="w-full rounded-md border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Longitude"
//                   className="w-full rounded-md border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 Click on the map to select a location
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors"
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user's current location
//   useEffect(() => {
//     console.log("📍 [Waste Report] Requesting user location...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       console.error("❌", errorMsg);
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         console.log("✅ [Waste Report] Got user location:", { latitude, longitude });
        
//         const location = [latitude, longitude];
//         setUserLocation(location);
//         setLoading(false);
//         toast.success("Location found!");
//       },
//       (error) => {
//         console.error("❌ [Waste Report] Geolocation error:", error);
//         let errorMsg = "Unable to get your location. ";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg += "Please allow location access.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg += "Location information unavailable.";
//             break;
//           case error.TIMEOUT:
//             errorMsg += "Location request timed out.";
//             break;
//           default:
//             errorMsg += "Unknown error occurred.";
//         }
        
//         toast.error(errorMsg);
//         setLocationError(errorMsg);
//         setLoading(false);
//       },
//       { 
//         enableHighAccuracy: true, 
//         timeout: 10000, 
//         maximumAge: 0 
//       }
//     );
//   }, []);

//   // Map handler - handles both centering and click events
//   const MapHandler = () => {
//     const map = useMap();
    
//     useEffect(() => {
//       if (userLocation) {
//         console.log("🎯 [Waste Report] Centering map to:", userLocation);
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => {
//         console.log("📍 Clicked location:", e.latlng);
//         setPosition(e.latlng);
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     console.log("📤 Submitting waste report:", position);

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error("❌ Failed to submit report:", err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl">📍 Fetching your location...</div>
//         <div className="text-sm text-gray-500 mt-2">Please allow location access when prompted</div>
//       </div>
//     );
//   }

//   if (locationError || !userLocation) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to get your location"}</div>
//         <div className="text-sm text-gray-600 mt-4">
//           Please enable GPS and allow location access in your browser settings, then refresh the page.
//         </div>
//       </div>
//     );
//   }

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       {/* Debug info */}
//       <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
//         <strong>📍 Your Location:</strong> Lat: {userLocation[0].toFixed(6)}, Lng: {userLocation[1].toFixed(6)}
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             {/* User location marker */}
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {/* Waste location marker */}
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 👆 Click anywhere on the map to select waste location
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
//               disabled={!position}
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user's current location
//   useEffect(() => {
//     console.log("📍 [Waste Report] Requesting user location...");
    
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
//       console.log(`📍 [Waste Report] Attempt ${attempts} to get GPS location...`);
      
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude, accuracy } = pos.coords;
//           console.log("✅ [Waste Report] Got user location:", { 
//             latitude, 
//             longitude, 
//             accuracy: `${accuracy.toFixed(0)}m` 
//           });
          
//           // Check if accuracy is reasonable (< 1000m means likely GPS, not IP)
//           if (accuracy > 1000 && attempts < maxAttempts) {
//             console.warn("⚠️ [Waste Report] Low accuracy (likely IP-based), retrying...");
//             toast("Getting precise location...", { icon: "🔄" });
//             setTimeout(getPosition, 1000);
//             return;
//           }
          
//           const location = [latitude, longitude];
//           setUserLocation(location);
//           setLoading(false);
//           toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//         },
//         (error) => {
//           console.error("❌ [Waste Report] Geolocation error:", error);
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

//   // Map handler - handles both centering and click events
//   const MapHandler = () => {
//     const map = useMap();
    
//     useEffect(() => {
//       if (userLocation) {
//         console.log("🎯 [Waste Report] Centering map to:", userLocation);
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => {
//         console.log("📍 Clicked location:", e.latlng);
//         setPosition(e.latlng);
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     console.log("📤 Submitting waste report:", position);

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error("❌ Failed to submit report:", err);
//       toast.error("Failed to submit report.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl">📍 Fetching your location...</div>
//         <div className="text-sm text-gray-500 mt-2">Please allow location access when prompted</div>
//       </div>
//     );
//   }

//   if (locationError || !userLocation) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to get your location"}</div>
//         <div className="text-sm text-gray-600 mt-4">
//           Please enable GPS and allow location access in your browser settings, then refresh the page.
//         </div>
//       </div>
//     );
//   }

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       {/* Debug info */}
//       <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
//         <strong>📍 Your Location:</strong> Lat: {userLocation[0].toFixed(6)}, Lng: {userLocation[1].toFixed(6)}
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             {/* User location marker */}
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {/* Waste location marker */}
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 👆 Click anywhere on the map to select waste location
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
//               disabled={!position}
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const [useManualLocation, setUseManualLocation] = useState(false);
//   const [manualLat, setManualLat] = useState("12.296077815874076");
//   const [manualLng, setManualLng] = useState("76.60307608638223");

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user's current location
//   useEffect(() => {
//     console.log("📍 [Waste Report] Requesting user location...");
    
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
//       console.log(`📍 [Waste Report] Attempt ${attempts} to get GPS location...`);
      
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude, accuracy } = pos.coords;
//           console.log("✅ [Waste Report] Got user location:", { 
//             latitude, 
//             longitude, 
//             accuracy: `${accuracy.toFixed(0)}m` 
//           });
          
//           // Check if accuracy is reasonable (< 1000m means likely GPS, not IP)
//           if (accuracy > 1000 && attempts < maxAttempts) {
//             console.warn("⚠️ [Waste Report] Low accuracy (likely IP-based), retrying...");
//             toast("Getting precise location...", { icon: "🔄" });
//             setTimeout(getPosition, 1000);
//             return;
//           }
          
//           const location = [latitude, longitude];
//           setUserLocation(location);
//           setLoading(false);
//           toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//         },
//         (error) => {
//           console.error("❌ [Waste Report] Geolocation error:", error);
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

//   // Map handler - handles both centering and click events
//   const MapHandler = () => {
//     const map = useMap();
    
//     useEffect(() => {
//       if (userLocation) {
//         console.log("🎯 [Waste Report] Centering map to:", userLocation);
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => {
//         console.log("📍 Clicked location:", e.latlng);
//         setPosition(e.latlng);
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     console.log("📤 Submitting waste report:", position);

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error("❌ Failed to submit report:", err);
//       toast.error("Failed to submit report.");
//     }
//   };

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
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to get your location"}</div>
//         <div className="text-sm text-gray-600 mt-4">
//           Please enable GPS and allow location access in your browser settings, then refresh the page.
//         </div>
//       </div>
//     );
//   }

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       {/* Debug info */}
//       <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
//         <strong>📍 Your Location:</strong> Lat: {userLocation[0].toFixed(6)}, Lng: {userLocation[1].toFixed(6)}
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             {/* User location marker */}
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {/* Waste location marker */}
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 👆 Click anywhere on the map to select waste location
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
//               disabled={!position}
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const [useManualLocation, setUseManualLocation] = useState(false);
//   const [manualLat, setManualLat] = useState("12.296289562835137");
//   const [manualLng, setManualLng] = useState("76.60266203616874");

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user's current location
//   useEffect(() => {
//     // Skip geolocation if manual mode
//     if (useManualLocation) {
//       setLoading(false);
//       return;
//     }

//     console.log("📍 [Waste Report] Requesting user location...");
    
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
//       console.log(`📍 [Waste Report] Attempt ${attempts} to get GPS location...`);
      
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude, accuracy } = pos.coords;
//           console.log("✅ [Waste Report] Got user location:", { 
//             latitude, 
//             longitude, 
//             accuracy: `${accuracy.toFixed(0)}m` 
//           });
          
//           // Check if accuracy is reasonable
//           // accuracy > 5000m means almost certainly IP-based location
//           if (accuracy > 5000 && attempts < maxAttempts) {
//             console.warn(`⚠️ [Waste Report] Very low accuracy (${accuracy.toFixed(0)}m - likely IP-based), retrying...`);
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
          
//           const location = [latitude, longitude];
//           setUserLocation(location);
//           setLoading(false);
          
//           if (accuracy <= 100) {
//             toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//           }
//         },
//         (error) => {
//           console.error("❌ [Waste Report] Geolocation error:", error);
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

//   // Map handler - handles both centering and click events
//   const MapHandler = () => {
//     const map = useMap();
    
//     useEffect(() => {
//       if (userLocation) {
//         console.log("🎯 [Waste Report] Centering map to:", userLocation);
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => {
//         console.log("📍 Clicked location:", e.latlng);
//         setPosition(e.latlng);
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map.");
//       return;
//     }

//     console.log("📤 Submitting waste report:", position);

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.success("Waste report submitted!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       console.error("❌ Failed to submit report:", err);
//       toast.error("Failed to submit report.");
//     }
//   };

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
//         <div className="text-xl text-red-600">❌ {locationError || "Unable to get your location"}</div>
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

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
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
//             className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 whitespace-nowrap"
//           >
//             Set Manual Location
//           </button>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             {/* User location marker */}
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {/* Waste location marker */}
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 👆 Click anywhere on the map to select waste location
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
//               disabled={!position}
//             >
//               Submit Report
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;


// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const watchIdRef = useRef(null);

//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   // Get user's current location with high accuracy
//   useEffect(() => {
//     console.log("📍 [Waste Report] Starting geolocation with high accuracy mode...");
    
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
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
        
//         console.log("📍 [Waste Report] Position update:", {
//           lat: latitude,
//           lng: longitude,
//           accuracy: `${accuracy.toFixed(1)}m`,
//           timestamp: new Date(pos.timestamp).toLocaleTimeString()
//         });

//         // Always update location
//         const location = [latitude, longitude];
//         setUserLocation(location);
        
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
//         }
//       },
//       (error) => {
//         console.error("❌ [Waste Report] Geolocation error:", error);
//         let errorMsg = "";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg = "Location access denied. Please allow location access.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg = "Location unavailable. Please ensure GPS is enabled.";
//             break;
//           case error.TIMEOUT:
//             errorMsg = "Location request timed out. Please check GPS settings.";
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

//     // Cleanup
//     return () => {
//       if (watchIdRef.current !== null) {
//         console.log("🛑 [Waste Report] Stopping location watch");
//         navigator.geolocation.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   // Map handler
//   const MapHandler = () => {
//     const map = useMap();
    
//     useEffect(() => {
//       if (userLocation) {
//         console.log("🎯 [Waste Report] Centering map to:", userLocation);
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => {
//         console.log("📍 Clicked location:", e.latlng);
//         setPosition(e.latlng);
//         toast.success("Location selected!");
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map by clicking.");
//       return;
//     }

//     console.log("📤 Submitting waste report:", position);
    
//     const loadingToast = toast.loading("Submitting report...");

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.dismiss(loadingToast);
//       toast.success("Waste report submitted successfully!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       toast.dismiss(loadingToast);
//       console.error("❌ Failed to submit report:", err);
//       toast.error(err.response?.data?.message || "Failed to submit report. Please try again.");
//     }
//   };

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
//               {locationError || "Unable to get your location"}
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

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-emerald-600 mt-2 font-medium">
//                 👆 Click anywhere on the map to select waste location
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={!position}
//             >
//               {position ? "Submit Report" : "Select Location on Map"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;

// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api"; // Assuming '../utils/api' is your configured axios instance
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null); // Selected waste location (latlng object)
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null); // Device location (array: [lat, lng])
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const watchIdRef = useRef(null);

//   // Custom Icons
//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Get user's current location with high accuracy
//   useEffect(() => {
//     console.log("📍 [Waste Report] Starting geolocation with high accuracy mode...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     const geoOptions = {
//       enableHighAccuracy: true,
//       maximumAge: 0,
//       timeout: 30000
//     };

//     let initialPositionReceived = false;

//     // Use watchPosition for continuous location updates
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
        
//         const locationArray = [latitude, longitude];
//         const locationLatLng = L.latLng(latitude, longitude); // Leaflet LatLng object for 'position' state
//         setUserLocation(locationArray);
        
//         if (!initialPositionReceived) {
//           initialPositionReceived = true;
//           setLoading(false);
          
//           // **CORRECTION: Set the initial waste position to the user's location**
//           setPosition(locationLatLng); 

//           if (accuracy <= 50) {
//             toast.success(`Location acquired! Accuracy: ±${accuracy.toFixed(0)}m`);
//           } else {
//             toast(`Location acquired. GPS is improving...`, {
//               icon: "📍",
//               duration: 3000
//             });
//           }
//         }
//       },
//       (error) => {
//         console.error("❌ [Waste Report] Geolocation error:", error);
//         let errorMsg = "";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg = "Location access denied. Please allow location access.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg = "Location unavailable. Please ensure GPS is enabled.";
//             break;
//           case error.TIMEOUT:
//             errorMsg = "Location request timed out. Please check GPS settings.";
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

//     // Cleanup
//     return () => {
//       if (watchIdRef.current !== null) {
//         console.log("🛑 [Waste Report] Stopping location watch");
//         navigator.geolocation.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   // Component to handle map interactions
//   const MapHandler = () => {
//     const map = useMap();
    
//     // Recenter the map when userLocation changes
//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     // Handle map clicks to set waste position
//     useMapEvents({
//       click: (e) => {
//         setPosition(e.latlng);
//         toast.success("Location selected!");
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map by clicking.");
//       return;
//     }

//     const loadingToast = toast.loading("Submitting report...");

//     try {
//       // NOTE: You will need to handle photo file upload separately in a real application
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//         // photoUrl: uploadResult.url // placeholder
//       });

//       toast.dismiss(loadingToast);
//       toast.success("Waste report submitted successfully!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       toast.dismiss(loadingToast);
//       console.error("❌ Failed to submit report:", err);
//       toast.error(err.response?.data?.message || "Failed to submit report. Please check API connection.");
//     }
//   };

//   // --- Loading/Error State Render (Re-used UI from your original file) ---
//   if (loading) {
//      // ... (Your existing loading UI)
//      return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//               <div className="mb-6">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 animate-pulse">
//                   <span className="text-4xl">📍</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Acquiring GPS Location</h2>
//                 <p className="text-gray-600 mb-4">Please wait while we get your precise location...</p>
//                 <div className="flex justify-center space-x-2 mb-4">
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//                 <div className="text-sm text-gray-500 space-y-1">
//                   <p>✓ Make sure location permission is allowed</p>
//                   <p>✓ GPS should be enabled on your device</p>
//                 </div>
//               </div>
//             </div>
//         </div>
//       );
//   }

//   if (locationError || !userLocation) {
//       // ... (Your existing error UI)
//       return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//             <div className="mb-6">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
//                 <span className="text-4xl">❌</span>
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Access Required</h2>
//               <p className="text-gray-600 mb-4">
//                 {locationError || "Unable to get your location"}
//               </p>
//               <div className="text-sm text-gray-500 space-y-2 text-left bg-gray-50 p-4 rounded-lg">
//                 <p className="font-semibold">To fix this:</p>
//                 <p>1. Click the location icon in your browser's address bar</p>
//                 <p>2. Select "Allow" for location access</p>
//                 <p>3. Refresh the page</p>
//               </div>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-6 w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//   }
//   // --- End of Loading/Error State Render ---


//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             {/* User's current location marker (blue) */}
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {/* Selected waste location marker (red) */}
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-emerald-600 mt-2 font-medium">
//                 {position ? "Location successfully set!" : "👆 Click anywhere on the map to select waste location"}
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={!position}
//             >
//               {position ? "Submit Report" : "Select Location on Map"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;


// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api"; // Corrected API configuration is used here
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null); // Selected waste location (latlng object)
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null); // Device location (array: [lat, lng])
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const watchIdRef = useRef(null);

//   // Custom Icons (Using external markers for simplicity)
//   const wasteIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl:
//       "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Get user's current location with high accuracy
//   useEffect(() => {
//     console.log("📍 [Waste Report] Starting geolocation with high accuracy mode...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     const geoOptions = {
//       enableHighAccuracy: true,
//       maximumAge: 0,
//       timeout: 30000
//     };

//     let initialPositionReceived = false;

//     // Use watchPosition for continuous location updates
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
        
//         const locationArray = [latitude, longitude];
//         const locationLatLng = L.latLng(latitude, longitude); // Leaflet LatLng object
//         setUserLocation(locationArray);
        
//         if (!initialPositionReceived) {
//           initialPositionReceived = true;
//           setLoading(false);
          
//           // *** THE CRITICAL FIX: Set the initial waste position to the user's location ***
//           setPosition(locationLatLng); 

//           if (accuracy <= 50) {
//             toast.success(`Location acquired! Accuracy: ±${accuracy.toFixed(0)}m`);
//           } else {
//             toast(`Location acquired. GPS is improving...`, {
//               icon: "📍",
//               duration: 3000
//             });
//           }
//         }
//       },
//       (error) => {
//         console.error("❌ [Waste Report] Geolocation error:", error);
//         let errorMsg = "";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg = "Location access denied. Please allow location access.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg = "Location unavailable. Please ensure GPS is enabled.";
//             break;
//           case error.TIMEOUT:
//             errorMsg = "Location request timed out. Please check GPS settings.";
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

//     // Cleanup
//     return () => {
//       if (watchIdRef.current !== null) {
//         console.log("🛑 [Waste Report] Stopping location watch");
//         navigator.geolocation.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   // Component to handle map interactions and recentering
//   const MapHandler = () => {
//     const map = useMap();
    
//     // Recenter the map when userLocation changes
//     useEffect(() => {
//       if (userLocation) {
//         map.setView(userLocation, 16);
//       }
//     }, [userLocation, map]);

//     // Handle map clicks to set waste position
//     useMapEvents({
//       click: (e) => {
//         setPosition(e.latlng);
//         toast.success("Location selected!");
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map by clicking.");
//       return;
//     }

//     const loadingToast = toast.loading("Submitting report...");

//     try {
//       // NOTE: Placeholder for photo upload is omitted for simplicity in this file
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.dismiss(loadingToast);
//       toast.success("Waste report submitted successfully!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       toast.dismiss(loadingToast);
//       console.error("❌ Failed to submit report:", err);
//       // Accessing the error response from the backend
//       toast.error(err.response?.data?.message || err.message || "Failed to submit report. Check API connection.");
//     }
//   };

//   // --- Loading/Error State Render ---
//   if (loading) {
//      return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//               <div className="mb-6">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 animate-pulse">
//                   <span className="text-4xl">📍</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Acquiring GPS Location</h2>
//                 <p className="text-gray-600 mb-4">Please wait while we get your precise location...</p>
//                 <div className="flex justify-center space-x-2 mb-4">
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//                 <div className="text-sm text-gray-500 space-y-1">
//                   <p>✓ Make sure location permission is allowed</p>
//                   <p>✓ GPS should be enabled on your device</p>
//                 </div>
//               </div>
//             </div>
//         </div>
//       );
//   }

//   if (locationError || !userLocation) {
//       return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//             <div className="mb-6">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
//                 <span className="text-4xl">❌</span>
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Access Required</h2>
//               <p className="text-gray-600 mb-4">
//                 {locationError || "Unable to get your location"}
//               </p>
//               <div className="text-sm text-gray-500 space-y-2 text-left bg-gray-50 p-4 rounded-lg">
//                 <p className="font-semibold">To fix this:</p>
//                 <p>1. Click the location icon in your browser's address bar</p>
//                 <p>2. Select "Allow" for location access</p>
//                 <p>3. Refresh the page</p>
//               </div>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-6 w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//   }
//   // --- End of Loading/Error State Render ---


//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             {/* User's current location marker (blue) */}
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {/* Selected waste location marker (red) */}
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-emerald-600 mt-2 font-medium">
//                 {position ? "Location successfully set!" : "👆 Click anywhere on the map to select waste location"}
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={!position}
//             >
//               {position ? "Submit Report" : "Select Location on Map"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;



// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const WasteReportPage = () => {
//   const [position, setPosition] = useState(null);
//   const [description, setDescription] = useState("");
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const watchIdRef = useRef(null);
//   const mapRef = useRef(null);

//   const wasteIcon = new L.Icon({
//     iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   const userIcon = new L.Icon({
//     iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   // Get user's current location with high accuracy
//   useEffect(() => {
//     console.log("📍 [Waste Report] Starting geolocation...");
    
//     if (!navigator.geolocation) {
//       const errorMsg = "Geolocation not supported by your browser.";
//       toast.error(errorMsg);
//       setLocationError(errorMsg);
//       setLoading(false);
//       return;
//     }

//     const geoOptions = {
//       enableHighAccuracy: true,
//       maximumAge: 0,
//       timeout: 30000
//     };

//     let initialPositionReceived = false;

//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
        
//         console.log("✅ [Waste Report] Location:", { latitude, longitude, accuracy: `${accuracy.toFixed(0)}m` });
        
//         const locationArray = [latitude, longitude];
//         const locationLatLng = L.latLng(latitude, longitude);
        
//         setUserLocation(locationArray);
        
//         if (!initialPositionReceived) {
//           initialPositionReceived = true;
//           setLoading(false);
//           setPosition(locationLatLng); // Set initial position to user location
          
//           if (accuracy <= 100) {
//             toast.success(`Location found! (±${accuracy.toFixed(0)}m)`);
//           } else {
//             toast(`Location acquired. GPS is improving...`, {
//               icon: "📍",
//               duration: 3000
//             });
//           }
//         }
//       },
//       (error) => {
//         console.error("❌ [Waste Report] Geolocation error:", error);
//         let errorMsg = "";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg = "Location access denied. Please allow location access.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg = "Location unavailable. Please ensure GPS is enabled.";
//             break;
//           case error.TIMEOUT:
//             errorMsg = "Location request timed out. Please check GPS settings.";
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

//     return () => {
//       if (watchIdRef.current !== null) {
//         navigator.geolocation.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   // Component to handle map centering and clicks
//   const MapHandler = () => {
//     const map = useMap();
//     mapRef.current = map;
    
//     useEffect(() => {
//       if (userLocation && map) {
//         console.log("🎯 [Waste Report] Centering map to:", userLocation);
//         map.setView(userLocation, 16, { animate: true });
//       }
//     }, [userLocation, map]);

//     useMapEvents({
//       click: (e) => {
//         console.log("📍 Clicked location:", e.latlng);
//         setPosition(e.latlng);
//         toast.success("Location selected!");
//       },
//     });

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!position) {
//       toast.error("Please select a location on the map by clicking.");
//       return;
//     }

//     console.log("📤 Submitting waste report:", position);
//     const loadingToast = toast.loading("Submitting report...");

//     try {
//       await api.post("/api/waste-reports", {
//         lat: position.lat,
//         lng: position.lng,
//         description,
//       });

//       toast.dismiss(loadingToast);
//       toast.success("Waste report submitted successfully!");
//       setPosition(null);
//       setDescription("");
//     } catch (err) {
//       toast.dismiss(loadingToast);
//       console.error("❌ Failed to submit report:", err);
//       toast.error(err.response?.data?.message || "Failed to submit report. Please check API connection.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
//           <div className="mb-6">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 animate-pulse">
//               <span className="text-4xl">📍</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Acquiring GPS Location</h2>
//             <p className="text-gray-600 mb-4">Please wait while we get your precise location...</p>
//             <div className="flex justify-center space-x-2 mb-4">
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//             </div>
//             <div className="text-sm text-gray-500 space-y-1">
//               <p>✓ Make sure location permission is allowed</p>
//               <p>✓ GPS should be enabled on your device</p>
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
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Access Required</h2>
//             <p className="text-gray-600 mb-4">{locationError || "Unable to get your location"}</p>
//             <div className="text-sm text-gray-500 space-y-2 text-left bg-gray-50 p-4 rounded-lg">
//               <p className="font-semibold">To fix this:</p>
//               <p>1. Click the location icon in your browser's address bar</p>
//               <p>2. Select "Allow" for location access</p>
//               <p>3. Refresh the page</p>
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

//   const lat = position?.lat?.toFixed(6) || "";
//   const lng = position?.lng?.toFixed(6) || "";

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         Report Waste Location
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="md:h-96 h-64 rounded-xl shadow-lg overflow-hidden">
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
//             <MapHandler />
            
//             <Marker position={userLocation} icon={userIcon}>
//               <Popup>
//                 <strong>📍 You are here</strong>
//                 <br />
//                 Lat: {userLocation[0].toFixed(6)}
//                 <br />
//                 Lng: {userLocation[1].toFixed(6)}
//               </Popup>
//             </Marker>
            
//             {position && (
//               <Marker position={position} icon={wasteIcon}>
//                 <Popup>
//                   <strong>🗑️ Waste location</strong>
//                   <br />
//                   Lat: {position.lat.toFixed(6)}
//                   <br />
//                   Lng: {position.lng.toFixed(6)}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Selected Coordinates
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={lat}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={lng}
//                   readOnly
//                   placeholder="Click map to select"
//                   className="w-full rounded-md border border-gray-300 p-2 bg-gray-50"
//                 />
//               </div>
//               <p className="text-sm text-emerald-600 mt-2 font-medium">
//                 {position ? "Location successfully set!" : "👆 Click anywhere on the map to select waste location"}
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description (Optional)
//               </label>
//               <textarea
//                 rows="3"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 placeholder="e.g., Overflowing dustbin near main gate"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={!position}
//             >
//               {position ? "Submit Report" : "Select Location on Map"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteReportPage;

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