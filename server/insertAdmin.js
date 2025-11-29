const mongoose = require('mongoose');
   const Admin = require('./models/Admin');
   require('dotenv').config();

   async function createAdmin() {
     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-management');
     
     // Delete existing admin
     await Admin.deleteMany({ username: 'admin' });
     
     // Create new admin
     const admin = new Admin({
       username: 'admin',
       email: 'admin@college.edu',
       password: 'admin123'
     });
     
     await admin.save();
     console.log('✅ Admin created: username=admin, password=admin123');
     process.exit(0);
   }

   createAdmin();