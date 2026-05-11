const mongoose = require('mongoose');

const restroomSchema = new mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  name: { type: String, required: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: true
  },
  status: { 
    type: String, 
    enum: ['available', 'unavailable'], 
    default: 'available' 
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

restroomSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restroom', restroomSchema);
