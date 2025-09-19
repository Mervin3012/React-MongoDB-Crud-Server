const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  description: { type: String, required: true },
});

const FoodModel = mongoose.model('Food', FoodSchema);

module.exports = FoodModel;