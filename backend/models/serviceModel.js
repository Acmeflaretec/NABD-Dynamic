const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
