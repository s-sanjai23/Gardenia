
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'cart.onModel',
      },
      onModel: {
        type: String,
        required: true,
        enum: ['Plant', 'Accessory'],
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
