// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import Header from './components/common/Header';
// import HomePage from './pages/HomePage';
// import WasteReportPage from './pages/WasteReportPage';
// import LocateDustbinPage from './pages/LocateDustbinPage';
// import AdminPage from './pages/AdminPage';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Header />
//           <main>
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/report-waste" element={<WasteReportPage />} />
//               <Route path="/locate-dustbins" element={<LocateDustbinPage />} />
//               <Route path="/admin" element={<AdminPage />} />
//             </Routes>
//           </main>
//           <Toaster position="top-right" />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import WasteReportPage from './pages/WasteReportPage';
import LocateDustbinPage from './pages/LocateDustbinPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/report-waste" element={<WasteReportPage />} />
              <Route path="/locate-dustbins" element={<LocateDustbinPage />} />
              {/* The main admin page renders the login form or dashboard based on AuthContext */}
              <Route path="/admin" element={<AdminPage />} /> 
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
