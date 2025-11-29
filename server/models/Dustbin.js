const mongoose = require('mongoose');

const dustbinSchema = new mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  name: { type: String, required: true },
  status: { type: String, default: 'active' },
});

dustbinSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Dustbin', dustbinSchema);