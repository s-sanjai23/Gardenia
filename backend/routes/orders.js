const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// @route   GET api/orders
// @desc    Get user orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post('/', auth, async (req, res) => {
  const { items, total } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
      date: new Date(),
    });

    const order = await newOrder.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
