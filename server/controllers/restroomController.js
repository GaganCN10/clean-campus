const Restroom = require('../models/Restroom');

exports.getRestrooms = async (req, res) => {
  try {
    // If gender is provided, filter by it. Otherwise return all.
    const { gender } = req.query;
    let query = {};
    if (gender) {
      query.gender = gender;
    }
    const restrooms = await Restroom.find(query);
    res.json(restrooms);
  } catch (err) {
    console.error('❌ Error fetching restrooms:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addRestroom = async (req, res) => {
  try {
    const { name, latitude, longitude, gender } = req.body;

    if (!name || !latitude || !longitude || !gender) {
      return res.status(400).json({ message: 'Name, latitude, longitude, and gender are required' });
    }

    if (!['Male', 'Female', 'Unisex'].includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender' });
    }

    if (latitude < -90 || latitude > 90) return res.status(400).json({ message: 'Invalid latitude' });
    if (longitude < -180 || longitude > 180) return res.status(400).json({ message: 'Invalid longitude' });

    const newRestroom = new Restroom({
      name: name.trim(),
      location: { type: 'Point', coordinates: [longitude, latitude] },
      gender,
      status: 'available',
      addedBy: req.admin?.username || 'admin'
    });

    await newRestroom.save();
    res.status(201).json({ message: 'Restroom added successfully', restroom: newRestroom });
  } catch (err) {
    console.error('❌ Error adding restroom:', err);
    res.status(500).json({ message: 'Server error while adding restroom' });
  }
};

exports.toggleRestroomStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ message: 'Invalid ID' });

    const restroom = await Restroom.findById(id);
    if (!restroom) return res.status(404).json({ message: 'Not found' });

    restroom.status = restroom.status === 'available' ? 'unavailable' : 'available';
    restroom.lastUpdated = Date.now();
    await restroom.save();

    res.json({ message: 'Status updated', restroom });
  } catch (err) {
    console.error('❌ Error toggling restroom status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteRestroom = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ message: 'Invalid ID' });

    const deleted = await Restroom.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting restroom:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
