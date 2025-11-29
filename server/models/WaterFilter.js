const mongoose = require('mongoose');

const waterFilterSchema = new mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['available', 'unavailable'], 
    default: 'available' 
  },
  quality: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
    required: true
  },
  addedBy: {
    type: String,
    default: 'admin'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

waterFilterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('WaterFilter', waterFilterSchema);
