const WaterFilter = require('../models/WaterFilter');

// Get all water filters
exports.getWaterFilters = async (req, res) => {
  try {
    const waterFilters = await WaterFilter.find({});
    res.json(waterFilters);
  } catch (err) {
    console.error('❌ Error fetching water filters:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new water filter (Admin only)
exports.addWaterFilter = async (req, res) => {
  try {
    const { name, latitude, longitude, quality } = req.body;

    // Validate input
    if (!name || !latitude || !longitude) {
      return res.status(400).json({ 
        message: 'Name, latitude, and longitude are required' 
      });
    }

    // Validate coordinates
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

    // Validate quality if provided
    if (quality && (quality < 1 || quality > 5)) {
      return res.status(400).json({
        message: 'Quality must be between 1 and 5'
      });
    }

    // Create new water filter
    const newWaterFilter = new WaterFilter({
      name: name.trim(),
      location: {
        type: 'Point',
        coordinates: [longitude, latitude], // MongoDB uses [lng, lat]
      },
      quality: quality || 5,
      status: 'available',
      addedBy: req.admin?.username || 'admin'
    });

    await newWaterFilter.save();
    console.log('✅ New water filter added:', newWaterFilter.name);

    res.status(201).json({
      message: 'Water filter added successfully',
      waterFilter: newWaterFilter,
    });
  } catch (err) {
    console.error('❌ Error adding water filter:', err);
    res.status(500).json({ message: 'Server error while adding water filter' });
  }
};

// Toggle water filter status (Admin only)
exports.toggleWaterFilterStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid water filter ID' });
    }

    const waterFilter = await WaterFilter.findById(id);

    if (!waterFilter) {
      return res.status(404).json({ message: 'Water filter not found' });
    }

    // Toggle status
    waterFilter.status = waterFilter.status === 'available' ? 'unavailable' : 'available';
    waterFilter.lastUpdated = Date.now();
    
    await waterFilter.save();

    console.log(`🔄 Water filter status toggled: ${waterFilter.name} → ${waterFilter.status}`);

    res.json({
      message: 'Water filter status updated successfully',
      waterFilter: waterFilter,
    });
  } catch (err) {
    console.error('❌ Error toggling water filter status:', err);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};

// Update water filter quality (Admin only)
exports.updateWaterFilterQuality = async (req, res) => {
  try {
    const { id } = req.params;
    const { quality } = req.body;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid water filter ID' });
    }

    // Validate quality
    if (!quality || quality < 1 || quality > 5) {
      return res.status(400).json({
        message: 'Quality must be between 1 and 5'
      });
    }

    const waterFilter = await WaterFilter.findById(id);

    if (!waterFilter) {
      return res.status(404).json({ message: 'Water filter not found' });
    }

    waterFilter.quality = quality;
    waterFilter.lastUpdated = Date.now();
    
    await waterFilter.save();

    console.log(`⭐ Water filter quality updated: ${waterFilter.name} → ${quality}/5`);

    res.json({
      message: 'Water filter quality updated successfully',
      waterFilter: waterFilter,
    });
  } catch (err) {
    console.error('❌ Error updating water filter quality:', err);
    res.status(500).json({ message: 'Server error while updating quality' });
  }
};

// Delete water filter (Admin only)
exports.deleteWaterFilter = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid water filter ID' });
    }

    const waterFilter = await WaterFilter.findByIdAndDelete(id);

    if (!waterFilter) {
      return res.status(404).json({ message: 'Water filter not found' });
    }

    console.log('🗑️ Water filter deleted:', waterFilter.name);

    res.json({
      message: 'Water filter deleted successfully',
      deletedWaterFilter: waterFilter,
    });
  } catch (err) {
    console.error('❌ Error deleting water filter:', err);
    res.status(500).json({ message: 'Server error while deleting water filter' });
  }
};
