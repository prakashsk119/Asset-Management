const mongoose = require('mongoose');

const AssetCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('AssetCategory', AssetCategorySchema)
