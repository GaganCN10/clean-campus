const Dustbin = require('../models/Dustbin');

exports.getDustbins = async (req, res) => {
  try {
    const dustbins = await Dustbin.find({});
    res.json(dustbins);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addDustbin = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({ 
        message: 'Name, latitude, and longitude are required' 
      });
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({ 
        message: 'Invalid latitude. Must be between -90 and 90' 
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({ 
        message: 'Invalid longitude. Must be between -180 and 180' 
      });
    }

    const newDustbin = new Dustbin({
      name: name.trim(),
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      status: 'active',
    });

    await newDustbin.save();
    console.log('✅ New dustbin added:', newDustbin.name);

    res.status(201).json({
      message: 'Dustbin added successfully',
      dustbin: newDustbin,
    });
  } catch (err) {
    console.error('❌ Error adding dustbin:', err);
    res.status(500).json({ message: 'Server error while adding dustbin' });
  }
};

// ✨ NEW: Delete dustbin by admin
exports.deleteDustbin = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid dustbin ID' });
    }

    const dustbin = await Dustbin.findByIdAndDelete(id);

    if (!dustbin) {
      return res.status(404).json({ message: 'Dustbin not found' });
    }

    console.log('🗑️ Dustbin deleted:', dustbin.name);

    res.json({
      message: 'Dustbin deleted successfully',
      deletedDustbin: dustbin,
    });
  } catch (err) {
    console.error('❌ Error deleting dustbin:', err);
    res.status(500).json({ message: 'Server error while deleting dustbin' });
  }
};
