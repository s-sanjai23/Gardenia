const mongoose = require('mongoose');

const careGuideSchema = new mongoose.Schema({
  plantId: { type: String, required: true },
  guides: [{ type: String, required: true }],
});

module.exports = mongoose.model('CareGuide', careGuideSchema);
