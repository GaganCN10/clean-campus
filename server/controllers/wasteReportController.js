// const WasteReport = require('../models/WasteReport');
// const { v4: uuidv4 } = require('uuid'); // for random usernames

// exports.getWasteReports = async (req, res) => {
//   try {
//     const reports = await WasteReport.find({}).sort({ createdAt: -1 });
//     res.json(reports);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.createWasteReport = async (req, res) => {
//   const { lat, lng, description, photoUrl } = req.body;
  
//   // Generate a random username for tracking
//   const reportedBy = `user_${uuidv4().substring(0, 8)}`;

//   const newReport = new WasteReport({
//     location: { type: 'Point', coordinates: [lng, lat] },
//     description,
//     photoUrl,
//     reportedBy,
//   });

//   try {
//     const savedReport = await newReport.save();
//     res.status(201).json(savedReport);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const WasteReport = require('../models/WasteReport');
const { v4: uuidv4 } = require('uuid');

exports.getWasteReports = async (req, res) => {
  try {
    const reports = await WasteReport.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createWasteReport = async (req, res) => {
  const { lat, lng, description } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }

  const reportedBy = `user_${uuidv4().substring(0, 8)}`;

  const newReport = new WasteReport({
    location: { type: 'Point', coordinates: [lng, lat] },
    description,
    reportedBy,
  });

  try {
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
