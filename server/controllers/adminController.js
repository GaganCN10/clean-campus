const WasteReport = require('../models/WasteReport');

exports.getAdminReports = async (req, res) => {
  try {
    const reports = await WasteReport.find({ status: 'reported' }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markAsClean = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await WasteReport.findByIdAndUpdate(id, { status: 'cleaned' }, { new: true });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report marked as clean', report });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};