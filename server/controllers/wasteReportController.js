const WasteReport = require('../models/WasteReport');

let uuidv4;

// Load uuid dynamically (ESM-safe for Node 18 / Vercel)
(async () => {
  const { v4 } = await import('uuid');
  uuidv4 = v4;
})();

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

  // Safety check (very unlikely, but good practice)
  if (!uuidv4) {
    return res.status(503).json({ message: 'UUID generator not ready' });
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
