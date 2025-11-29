// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const morgan = require('morgan');
// require('dotenv').config();

// const app = express();

// app.use(cors({
//   origin: true, // Allow all origins during development
//   credentials: true
// }));
// // Middleware
// app.use(helmet());
// app.use(morgan('combined'));
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-management', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('📁 Connected to MongoDB'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/waste-reports', require('./routes/wasteReports'));
// app.use('/api/dustbins', require('./routes/dustbins'));
// app.use('/api/admin', require('./routes/admin'));

// // Default route
// app.get('/', (req, res) => {
//   res.json({ message: '🌱 College Waste Management API is running!' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const morgan = require('morgan');
// require('dotenv').config();

// const app = express();

// // CORS Configuration - Allow all origins in development
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
    
//     // Allow all origins in development
//     console.log('📨 Request from origin:', origin);
//     callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// // Middleware
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));
// app.use(morgan('combined'));
// app.use(cors(corsOptions));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Log all requests
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-management', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('📁 Connected to MongoDB'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/waste-reports', require('./routes/wasteReports'));
// app.use('/api/dustbins', require('./routes/dustbins'));
// app.use('/api/admin', require('./routes/admin'));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: '🌱 College Waste Management API is running!',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       auth: '/api/auth',
//       wasteReports: '/api/waste-reports',
//       dustbins: '/api/dustbins',
//       admin: '/api/admin'
//     }
//   });
// });

// // Test route for connectivity
// app.get('/api/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'API is working!',
//     clientIP: req.ip,
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❌ Error:', err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   console.log('❌ 404 - Route not found:', req.originalUrl);
//   res.status(404).json({ message: 'Route not found', path: req.originalUrl });
// });

// const PORT = process.env.PORT || 5000;

// // Listen on all network interfaces (0.0.0.0) to allow mobile access
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📱 Local access: http://localhost:${PORT}`);
  
//   // Show network IP for mobile access
//   const os = require('os');
//   const networkInterfaces = os.networkInterfaces();
//   const addresses = [];
  
//   for (const name of Object.keys(networkInterfaces)) {
//     for (const iface of networkInterfaces[name]) {
//       if (iface.family === 'IPv4' && !iface.internal) {
//         addresses.push(iface.address);
//       }
//     }
//   }
  
//   if (addresses.length > 0) {
//     console.log(`📱 Mobile access: http://${addresses[0]}:${PORT}`);
//   }
// });


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const morgan = require('morgan');
// require('dotenv').config();

// const app = express();

// // CORS Configuration - Allow all origins in development
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
//     
//     // Allow all origins in development
//     console.log('📨 Request from origin:', origin);
//     callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// // Middleware
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));
// app.use(morgan('combined'));
// app.use(cors(corsOptions));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Log all requests
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-management', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('📁 Connected to MongoDB'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/waste-reports', require('./routes/wasteReports'));
// app.use('/api/dustbins', require('./routes/dustbins'));
// app.use('/api/admin', require('./routes/admin'));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: '🌱 College Waste Management API is running!',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       auth: '/api/auth',
//       wasteReports: '/api/waste-reports',
//       dustbins: '/api/dustbins',
//       admin: '/api/admin'
//     }
//   });
// });

// // Test route for connectivity
// app.get('/api/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'API is working!',
//     clientIP: req.ip,
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❌ Error:', err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   console.log('❌ 404 - Route not found:', req.originalUrl);
//   res.status(404).json({ message: 'Route not found', path: req.originalUrl });
// });

// const PORT = process.env.PORT || 5000;

// // Listen on all network interfaces (0.0.0.0) to allow mobile access
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📱 Local access: http://localhost:${PORT}`);
//   
//   // Show network IP for mobile access
//   const os = require('os');
//   const networkInterfaces = os.networkInterfaces();
//   const addresses = [];
//   
//   for (const name of Object.keys(networkInterfaces)) {
//     for (const iface of networkInterfaces[name]) {
//       if (iface.family === 'IPv4' && !iface.internal) {
//         addresses.push(iface.address);
//       }
//     }
//   }
//   
//   if (addresses.length > 0) {
//     console.log(`📱 Mobile access: http://${addresses[0]}:${PORT}`);
//   }
// });



// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const os = require('os');
// require('dotenv').config();

// const app = express();

// // Enhanced CORS Configuration for port forwarding
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, Postman)
//     if (!origin) {
//       console.log('📨 Request with no origin (mobile/Postman)');
//       return callback(null, true);
//     }
    
//     // Allow ALL origins in development (including VSCode port forwarding)
//     console.log('📨 Request from origin:', origin);
//     callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
//   exposedHeaders: ['Content-Length', 'x-auth-token'],
//   maxAge: 86400 // 24 hours
// };

// // Middleware - ORDER MATTERS!
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
// }));

// // Enable CORS BEFORE other middleware
// app.use(cors(corsOptions));

// // Handle preflight requests
// app.options('*', cors(corsOptions));

// app.use(morgan('combined'));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Log ALL requests with detailed info
// app.use((req, res, next) => {
//   console.log(`\n${'='.repeat(60)}`);
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   console.log(`Origin: ${req.headers.origin || 'No origin'}`);
//   console.log(`User-Agent: ${req.headers['user-agent']}`);
//   console.log(`IP: ${req.ip}`);
//   console.log(`${'='.repeat(60)}\n`);
//   next();
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-management', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ Connected to MongoDB');
//   console.log(`📁 Database: ${mongoose.connection.name}`);
// })
// .catch(err => {
//   console.error('❌ MongoDB connection error:', err);
//   process.exit(1);
// });

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: '🌱 College Waste Management API is running!',
//     timestamp: new Date().toISOString(),
//     status: 'healthy',
//     endpoints: {
//       auth: '/api/auth',
//       wasteReports: '/api/waste-reports',
//       dustbins: '/api/dustbins',
//       admin: '/api/admin',
//       test: '/api/test'
//     }
//   });
// });

// // Test connectivity route
// app.get('/api/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'API is working perfectly!',
//     clientIP: req.ip,
//     origin: req.headers.origin,
//     timestamp: new Date().toISOString()
//   });
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/waste-reports', require('./routes/wasteReports'));
// app.use('/api/dustbins', require('./routes/dustbins'));
// app.use('/api/admin', require('./routes/admin'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❌ Error occurred:');
//   console.error(err.stack);
//   res.status(err.status || 500).json({ 
//     message: err.message || 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   console.log('❌ 404 - Route not found:', req.originalUrl);
//   res.status(404).json({ 
//     message: 'Route not found', 
//     path: req.originalUrl,
//     availableEndpoints: ['/api/auth', '/api/waste-reports', '/api/dustbins', '/api/admin']
//   });
// });

// const PORT = process.env.PORT || 5000;

// // Listen on all network interfaces (0.0.0.0)
// const server = app.listen(PORT, '0.0.0.0', () => {
//   console.log('\n' + '='.repeat(70));
//   console.log('🚀 SERVER STARTED SUCCESSFULLY');
//   console.log('='.repeat(70));
//   console.log(`📅 Time: ${new Date().toISOString()}`);
//   console.log(`🌐 Port: ${PORT}`);
//   console.log(`\n📱 Access URLs:`);
//   console.log(`   Local:    http://localhost:${PORT}`);
//   console.log(`   Local:    http://127.0.0.1:${PORT}`);
  
//   // Show all network interfaces for mobile/port forwarding access
//   const networkInterfaces = os.networkInterfaces();
//   const addresses = [];
  
//   for (const name of Object.keys(networkInterfaces)) {
//     for (const iface of networkInterfaces[name]) {
//       if (iface.family === 'IPv4' && !iface.internal) {
//         addresses.push({ name, address: iface.address });
//       }
//     }
//   }
  
//   if (addresses.length > 0) {
//     console.log(`\n🌍 Network Access (for mobile/port forwarding):`);
//     addresses.forEach(({ name, address }) => {
//       console.log(`   ${name}: http://${address}:${PORT}`);
//     });
//   }
  
//   console.log(`\n📝 API Endpoints:`);
//   console.log(`   POST   /api/auth/login`);
//   console.log(`   GET    /api/dustbins`);
//   console.log(`   GET    /api/waste-reports`);
//   console.log(`   POST   /api/waste-reports`);
//   console.log(`   GET    /api/admin/reports`);
//   console.log(`   PUT    /api/admin/clean/:id`);
  
//   console.log('\n' + '='.repeat(70) + '\n');
// });

// // Handle server errors
// server.on('error', (error) => {
//   if (error.code === 'EADDRINUSE') {
//     console.error(`❌ Port ${PORT} is already in use!`);
//     console.error('💡 Try: killall node (or use a different port)');
//   } else {
//     console.error('❌ Server error:', error);
//   }
//   process.exit(1);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('\n⚠️  SIGTERM received, shutting down gracefully...');
//   server.close(() => {
//     console.log('✅ Server closed');
//     mongoose.connection.close(false, () => {
//       console.log('✅ MongoDB connection closed');
//       process.exit(0);
//     });
//   });
// });

// process.on('SIGINT', () => {
//   console.log('\n⚠️  SIGINT received, shutting down gracefully...');
//   server.close(() => {
//     console.log('✅ Server closed');
//     mongoose.connection.close(false, () => {
//       console.log('✅ MongoDB connection closed');
//       process.exit(0);
//     });
// //   });
// // });


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const os = require("os");
// require("dotenv").config();

// const app = express();

// // ============================================================
// // ✅ Intelligent CORS Configuration
// // ============================================================
// const getAllowedOrigins = () => {
//   const allowed = [
//     "http://localhost:3000",
//     "http://127.0.0.1:3000",
//     process.env.CLIENT_URL, // e.g. deployed frontend
//   ];

//   // Also add LAN IPs (so phone/port-forwarding works)
//   const networkInterfaces = os.networkInterfaces();
//   for (const name in networkInterfaces) {
//     for (const iface of networkInterfaces[name]) {
//       if (iface.family === "IPv4" && !iface.internal) {
//         allowed.push(`http://${iface.address}:3000`);
//       }
//     }
//   }
//   return allowed.filter(Boolean);
// };

// const allowedOrigins = getAllowedOrigins();

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) {
//       console.log("📨 Request with no origin (mobile/Postman)");
//       return callback(null, true);
//     }
//     if (allowedOrigins.includes(origin)) {
//       console.log("✅ Allowed Origin:", origin);
//       callback(null, true);
//     } else {
//       console.warn("🚫 Blocked Origin:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
//   exposedHeaders: ["Content-Length", "x-auth-token"],
//   maxAge: 86400,
// };

// // ============================================================
// // Middleware
// // ============================================================
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//     crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
//   })
// );

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// app.use(morgan("dev"));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// // ============================================================
// // Logging Middleware
// // ============================================================
// app.use((req, res, next) => {
//   console.log(`\n${"=".repeat(60)}`);
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   console.log(`Origin: ${req.headers.origin || "No origin"}`);
//   console.log(`User-Agent: ${req.headers["user-agent"]}`);
//   console.log(`IP: ${req.ip}`);
//   console.log(`${"=".repeat(60)}\n`);
//   next();
// });

// // ============================================================
// // MongoDB Connection
// // ============================================================
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/waste-management", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // ============================================================
// // Routes
// // ============================================================
// app.get("/", (req, res) => {
//   res.json({
//     message: "🌱 College Waste Management API is running!",
//     status: "healthy",
//   });
// });

// app.get("/api/test", (req, res) => {
//   res.json({
//     success: true,
//     origin: req.headers.origin,
//     timestamp: new Date().toISOString(),
//   });
// });

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/waste-reports", require("./routes/wasteReports"));
// app.use("/api/dustbins", require("./routes/dustbins"));
// app.use("/api/admin", require("./routes/admin"));

// // ============================================================
// // Error + 404 Handling
// // ============================================================
// app.use((err, req, res, next) => {
//   console.error("❌ Error:", err.message);
//   res.status(err.status || 500).json({
//     message: err.message || "Something went wrong!",
//   });
// });

// app.use("*", (req, res) => {
//   res.status(404).json({ message: "Route not found", path: req.originalUrl });
// });

// // ============================================================
// // Server Start
// // ============================================================
// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, "0.0.0.0", () => {
//   console.log("\n" + "=".repeat(60));
//   console.log("🚀 SERVER STARTED SUCCESSFULLY");
//   console.log(`🌐 Port: ${PORT}`);

//   const networkInterfaces = os.networkInterfaces();
//   for (const name in networkInterfaces) {
//     for (const iface of networkInterfaces[name]) {
//       if (iface.family === "IPv4" && !iface.internal) {
//         console.log(`📱 Mobile/LAN Access: http://${iface.address}:${PORT}`);
//       }
//     }
//   }
//   console.log("=" .repeat(60) + "\n");
// });

// process.on("SIGINT", () => {
//   console.log("\n⚠️  Shutting down gracefully...");
//   server.close(() => mongoose.connection.close(false, () => process.exit(0)));
// });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const os = require('os');
require('dotenv').config();

const app = express();

// ✅ Dynamic CORS config — works with local, port-forward, deployed
const getAllowedOrigins = () => {
  const allowed = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.CLIENT_URL,
  ];

  // Allow LAN IPs (for phone or VSCode port-forwarding)
  const networkInterfaces = os.networkInterfaces();
  for (const name in networkInterfaces) {
    for (const iface of networkInterfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        allowed.push(`http://${iface.address}:3000`);
      }
    }
  }
  return allowed.filter(Boolean);
};

// const allowedOrigins = getAllowedOrigins();

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // Allow Postman/mobile
//     if (allowedOrigins.includes(origin)) {
//       console.log('✅ CORS Allowed:', origin);
//       callback(null, true);
//     } else {
//       console.warn('🚫 CORS Blocked:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };


const allowedOrigins = [
  'https://clean-eco-campus.vercel.app', // your frontend
  'http://localhost:3000',                // local dev
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS Allowed:', origin);
      callback(null, true);
    } else {
      console.warn('🚫 CORS Blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','x-auth-token'],
  exposedHeaders: ['x-auth-token','Content-Length'],
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // enable preflight requests

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  })
);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Mongo Error:', err));

app.get('/', (req, res) => res.json({ status: 'API working fine ✅' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/dustbins', require('./routes/dustbins'));
app.use('/api/waste-reports', require('./routes/wasteReports'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // show LAN IPs for testing on phone
  const networkInterfaces = os.networkInterfaces();
  for (const name in networkInterfaces) {
    for (const iface of networkInterfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`📱 Mobile access: http://${iface.address}:${PORT}`);
      }
    }
  }
});
