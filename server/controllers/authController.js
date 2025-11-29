// const Admin = require('../models/Admin');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await admin.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { id: admin._id, username: admin.username, role: admin.role } });

//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  console.log('🔐 Login attempt for username:', username);
  
  try {
    // Validate input
    if (!username || !password) {
      console.log('❌ Missing username or password');
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('❌ Admin not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        role: admin.role,
        username: admin.username
      }, 
      process.env.JWT_SECRET || 'your-secret-key-change-in-production', 
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', username);

    // Send response
    res.json({ 
      success: true,
      token, 
      user: { 
        id: admin._id, 
        username: admin.username,
        email: admin.email,
        role: admin.role 
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};