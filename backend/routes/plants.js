const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// @route   GET api/plants
// @desc    Get all plants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/plants/:id
// @desc    Get plant by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findOne({ id: req.params.id });
    if (!plant) {
      return res.status(404).json({ msg: 'Plant not found' });
    }
    res.json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
