import React, { useEffect } from 'react';
//import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AOS from 'aos'; // Correct import path for the AOS library
import 'aos/dist/aos.css'; // Correct import path for the CSS

const slogans = [
  "Today's Slogan: A clean campus is a happy campus!",
  "Today's Slogan: Keep it clean, keep it green!",
  "Today's Slogan: Your waste, your responsibility!",
  "Today's Slogan: Clean today for a better tomorrow!",
  "Today's Slogan: Small steps lead to big changes!"
];

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    const sloganElement = document.getElementById('daily-slogan');
    if (sloganElement) {
      const randomIndex = Math.floor(Math.random() * slogans.length);
      sloganElement.textContent = slogans[randomIndex];
    }
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" data-aos="fade-down" style={{ color: 'green' }}>
              Keep Our Campus Clean
            </h1>
            <div className="mt-6 max-w-lg mx-auto">
              <p className="text-xl slogan-transition" id="daily-slogan"></p>
            </div>
            <div className="mt-10 flex justify-center space-x-6">
              <div className="rounded-md shadow">
                <a href="/report-waste" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
                  Report Waste
                </a>
              </div>
              <div className="rounded-md shadow">
                <a href="/locate-dustbins" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out">
                  Locate Dustbins
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div id="features" className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3">
        </div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl" data-aos="fade-up">Features</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4" data-aos="fade-up" data-aos-delay="100">Empowering our community to maintain a clean environment.</p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none" style={{ borderRadius: '1rem' }}>
            <div className="flex flex-col rounded-lg justify-center items-center shadow-lg overflow-hidden feature-card border-8 border-solid border-green-500" data-aos="zoom-in">
              <div className="flex-shrink-0 p-0 flex justify-center items-center">
              {/* <div className="flex items-center justify-center w-full h-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div> */}
           <i data-feather="map" className="h-10 w-10 text-white">
            </i>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">Locate Dustbins</h3>
                  <p className="mt-3 text-base text-gray-500">Use our interactive map to find the nearest dustbins with real-time availability status.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden feature-card border-8 border-solid border-green-500" data-aos="zoom-in" data-aos-delay="100">
              <div className="flex-shrink-0 p-6 flex justify-center items-center">
                {/* <i data-feather="alert-triangle" className="h-10 w-10 text-white mx-auto flex items-center justify-center">
                  <i data-feather="map" className="h-10 w-10 text-white"></i>
                </i> */}
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">Report Waste</h3>
                  <p className="mt-3 text-base text-gray-500">Report a pile of waste or a full dustbin with a single click, helping our team to act faster.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden feature-card border-8 border-solid border-green-500" data-aos="zoom-in" data-aos-delay="200">
              <div className="flex-shrink-0 p-6 flex justify-center items-center">
                {/* <i data-feather="check-square" className="h-10 w-10 text-white mx-auto flex items-center justify-center"></i> */}
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">Admin Dashboard</h3>
                  <p className="mt-3 text-base text-gray-500">Admins can manage reports and monitor dustbin status from a centralized dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How It Works Section */}
    
      <div id="how-it-works" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl" data-aos="fade-up">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500" data-aos="fade-up" data-aos-delay="100">A simple guide to get started and make a difference.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6" data-aos="fade-up" data-aos-delay="200">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                <i data-feather="map-pin" className="h-6 w-6 flex items-center justify-center">1</i>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Find Dustbins</h3>
              <p className="mt-2 text-base text-gray-500">Use the map to find nearby dustbins and their current status.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6" data-aos="fade-up" data-aos-delay="300">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                <i data-feather="camera" className="h-6 w-6 flex items-center justify-center">2</i>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Take a Photo</h3>
              <p className="mt-2 text-base text-gray-500">If you spot a problem, take a picture of the waste pile or full bin.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6" data-aos="fade-up" data-aos-delay="400">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                <i data-feather="send" className="h-6 w-6 flex items-center justify-center">3</i>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Submit Report</h3>
              <p className="mt-2 text-base text-gray-500">Upload the photo and location details to our system.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6" data-aos="fade-up" data-aos-delay="500">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                <i data-feather="truck" className="h-6 w-6 flex items-center justify-center">4</i>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Waste Collection</h3>
              <p className="mt-2 text-base text-gray-500">Our team receives the report and dispatches a collection team.</p>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-gray-800" style={{ borderRadius: '2rem', border: '2px solid #fff', background: '#2d3748' }}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between" data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-green-500">Join our clean campus initiative today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="/report-waste" className="inline-flex items-center justify-center px-5 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                Report Waste
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;