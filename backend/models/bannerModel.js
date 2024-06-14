const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  bannerImage: [String],
  is_active: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
