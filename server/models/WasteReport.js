const mongoose = require('mongoose');

const wasteReportSchema = new mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  description: { type: String },
  photoUrl: { type: String },
  status: { type: String, enum: ['reported', 'cleaned'], default: 'reported' },
  reportedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

wasteReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('WasteReport', wasteReportSchema);