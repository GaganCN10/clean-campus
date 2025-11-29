// ===== server/utils/seedData.js =====
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Dustbin = require('../models/Dustbin');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-management');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await Dustbin.deleteMany({});

    // Create admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@college.edu',
      password: 'admin123'
    });
    await admin.save();
    console.log('✅ Admin user created (username: admin, password: admin123)');

    // Create sample dustbins (replace coordinates with your college location)
    const dustbins = [
      {
        name: 'Library Dustbin',
        location: { type: 'Point', coordinates: [77.5946, 12.2958] },
        type: 'general',
        landmark: 'Near Main Library',
        addedBy: admin._id
      },
      {
        name: 'Cafeteria Dustbin',
        location: { type: 'Point', coordinates: [77.5950, 12.2960] },
        type: 'organic',
        landmark: 'Student Cafeteria',
        addedBy: admin._id
      },
      {
        name: 'Admin Block Dustbin',
        location: { type: 'Point', coordinates: [77.5940, 12.2955] },
        type: 'recycling',
        landmark: 'Administrative Building',
        addedBy: admin._id
      },
      {
        name: 'Sports Complex',
        location: { type: 'Point', coordinates: [77.5935, 12.2950] },
        type: 'general',
        landmark: 'Sports Ground',
        addedBy: admin._id
      },
      {
        name: 'Hostel Block A',
        location: { type: 'Point', coordinates: [77.5955, 12.2965] },
        type: 'general',
        landmark: 'Boys Hostel Block A',
        addedBy: admin._id
      }
    ];

    await Dustbin.insertMany(dustbins);
    console.log('✅ Sample dustbins created');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();