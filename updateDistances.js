const fs = require('fs');

const run = () => {
    // 1. Food Court
    let fcCode = fs.readFileSync('client/src/pages/LocateFoodCourtPage.jsx', 'utf8');
    
    // Add nearest state
    fcCode = fcCode.replace(
        `const [foodCourts, setFoodCourts] = useState([]);`,
        `const [foodCourts, setFoodCourts] = useState([]);\n  const [nearestFoodCourt, setNearestFoodCourt] = useState(null);`
    );
    
    // Add proximity calculation via useEffect
    const nearestFcEffect = `
  useEffect(() => {
    if (!userLocation || foodCourts.length === 0) return;

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
`;
    fcCode = fcCode.replace(`const fetchFoodCourts = async () => {`, `${nearestFcEffect}\n  const fetchFoodCourts = async () => {`);

    // Add UI element above the map
    const nearestFcUI = `
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
      
      <div className="h-[600px]`;
    
    fcCode = fcCode.replace(`{locationError && <p className="text-red-500 mb-4">{locationError}</p>}\n      \n      <div className="h-[600px]`, nearestFcUI);

    fs.writeFileSync('client/src/pages/LocateFoodCourtPage.jsx', fcCode);


    // 2. Restrooms
    let rrCode = fs.readFileSync('client/src/pages/LocateRestroomPage.jsx', 'utf8');

    // Add nearest state
    rrCode = rrCode.replace(
        `const [gender, setGender] = useState('');`,
        `const [gender, setGender] = useState('');\n  const [nearestRestroom, setNearestRestroom] = useState(null);`
    );

    // Add proximity calculation
    const nearestRrEffect = `
  useEffect(() => {
    if (!userLocation || restrooms.length === 0) return;

    let nearest = null;
    let minDist = Infinity;

    const availableRRs = restrooms.filter(rr => rr.status === 'open');

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
`;
    rrCode = rrCode.replace(`const fetchRestrooms = async () => {`, `${nearestRrEffect}\n  const fetchRestrooms = async () => {`);

    // Add UI element
    const nearestRrUI = `
      <div className="mb-6 flex gap-4">
        <button onClick={() => setGender('')} className={\`px-4 py-2 rounded-md font-semibold \${gender === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>All</button>
        <button onClick={() => setGender('Male')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Male' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Male</button>
        <button onClick={() => setGender('Female')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Female' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Female</button>
        <button onClick={() => setGender('Unisex')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Unisex' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Unisex</button>
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

      <div className="h-[600px]`;

    const oldRrUI = `
      <div className="mb-6 flex gap-4">
        <button onClick={() => setGender('')} className={\`px-4 py-2 rounded-md font-semibold \${gender === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>All</button>
        <button onClick={() => setGender('Male')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Male' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Male</button>
        <button onClick={() => setGender('Female')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Female' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Female</button>
        <button onClick={() => setGender('Unisex')} className={\`px-4 py-2 rounded-md font-semibold \${gender === 'Unisex' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>Unisex</button>
      </div>

      <div className="h-[600px]`;

    rrCode = rrCode.replace(oldRrUI, nearestRrUI);

    fs.writeFileSync('client/src/pages/LocateRestroomPage.jsx', rrCode);
};

run();
