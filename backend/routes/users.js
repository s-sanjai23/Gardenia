
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Plant = require('../models/Plant');
const Accessory = require('../models/Accessory');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'yourSecretToken', // Replace with a secret from your config
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'yourSecretToken', // Replace with a secret from your config
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const auth = require('../middleware/auth');

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/cart
// @desc    Get user cart
// @access  Private
router.get('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.item');
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/cart
// @desc    Add item to cart
// @access  Private
router.post('/cart', auth, async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    let product;
    let productModel;

    if (itemId.startsWith('p')) {
      product = await Plant.findOne({ id: itemId });
      productModel = 'Plant';
    } else if (itemId.startsWith('a')) {
      product = await Accessory.findOne({ id: itemId });
      productModel = 'Accessory';
    }

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const user = await User.findById(req.user.id);

    const itemIndex = user.cart.findIndex((cartItem) => cartItem.item.equals(product._id));

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ item: product._id, onModel: productModel, quantity });
    }

    await user.save();
    const populatedUser = await User.findById(req.user.id).populate('cart.item');
    res.json(populatedUser.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/cart/:itemId
// @desc    Update item quantity in cart
// @access  Private
router.put('/cart/:itemId', auth, async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  try {
    let product;
    if (itemId.startsWith('p')) {
      product = await Plant.findOne({ id: itemId });
    } else if (itemId.startsWith('a')) {
      product = await Accessory.findOne({ id: itemId });
    }

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const user = await User.findById(req.user.id);

    const itemIndex = user.cart.findIndex((p) => p.item.equals(product._id));

    if (itemIndex > -1) {
      // Item in cart, update quantity
      user.cart[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    await user.save();
    const populatedUser = await User.findById(req.user.id).populate('cart.item');
    res.json(populatedUser.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/cart/:itemId', auth, async (req, res) => {
  const { itemId } = req.params;

  try {
    let product;
    if (itemId.startsWith('p')) {
      product = await Plant.findOne({ id: itemId });
    } else if (itemId.startsWith('a')) {
      product = await Accessory.findOne({ id: itemId });
    }

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter((cartItem) => !cartItem.item.equals(product._id));

    await user.save();

    const populatedUser = await User.findById(req.user.id).populate('cart.item');
    res.json(populatedUser.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

