const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');

// @route   GET api/accessories
// @desc    Get all accessories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
