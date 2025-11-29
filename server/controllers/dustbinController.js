const Dustbin = require('../models/Dustbin');

exports.getDustbins = async (req, res) => {
  try {
    const dustbins = await Dustbin.find({});
    res.json(dustbins);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};