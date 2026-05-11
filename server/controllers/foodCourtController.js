const FoodCourt = require('../models/FoodCourt');

exports.getFoodCourts = async (req, res) => {
  try {
    const foodCourts = await FoodCourt.find({});
    res.json(foodCourts);
  } catch (err) {
    console.error('❌ Error fetching food courts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addFoodCourt = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({ message: 'Name, latitude, and longitude are required' });
    }

    if (latitude < -90 || latitude > 90) return res.status(400).json({ message: 'Invalid latitude' });
    if (longitude < -180 || longitude > 180) return res.status(400).json({ message: 'Invalid longitude' });

    const newFoodCourt = new FoodCourt({
      name: name.trim(),
      location: { type: 'Point', coordinates: [longitude, latitude] },
      status: 'open',
      addedBy: req.admin?.username || 'admin'
    });

    await newFoodCourt.save();
    res.status(201).json({ message: 'Food court added successfully', foodCourt: newFoodCourt });
  } catch (err) {
    console.error('❌ Error adding food court:', err);
    res.status(500).json({ message: 'Server error while adding food court' });
  }
};

exports.toggleFoodCourtStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ message: 'Invalid ID' });

    const foodCourt = await FoodCourt.findById(id);
    if (!foodCourt) return res.status(404).json({ message: 'Not found' });

    foodCourt.status = foodCourt.status === 'open' ? 'closed' : 'open';
    foodCourt.lastUpdated = Date.now();
    await foodCourt.save();

    res.json({ message: 'Status updated', foodCourt });
  } catch (err) {
    console.error('❌ Error toggling food court status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFoodCourt = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ message: 'Invalid ID' });

    const deleted = await FoodCourt.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting food court:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
