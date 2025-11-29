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

const allowedOrigins = [
  'https://ecolocate.vercel.app',           // ✅ Production frontend
  'https://ecolocate-j7aqi9nbb-gagancn10s-projects.vercel.app', // ✅ Preview deployment
  'http://localhost:3000',                  // Local dev
  'http://127.0.0.1:3000',                  // Local dev alternative
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
app.use('/api/water-filters', require('./routes/waterFilters')); // ✨ NEW

// ✨ ADD THIS DEBUG CODE:
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('📍 Route:', r.route.path)
  }
});
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
