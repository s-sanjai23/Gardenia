const express = require('express');
const router = express.Router();
const CareGuide = require('../models/CareGuide');

// @route   GET api/care-guides/:plantId
// @desc    Get care guides for a specific plant
// @access  Public
router.get('/:plantId', async (req, res) => {
  try {
    const careGuide = await CareGuide.findOne({ plantId: req.params.plantId });
    if (!careGuide) {
      return res.status(404).json({ msg: 'Care guides not found for this plant' });
    }
    res.json(careGuide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
