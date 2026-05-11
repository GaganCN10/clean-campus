const mongoose = require('mongoose');

const foodCourtSchema = new mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'closed'], 
    default: 'open' 
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

foodCourtSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('FoodCourt', foodCourtSchema);
