const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['in stock', 'issued', 'scrapped'],
    default: 'in stock',
  },
  value: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssetCategory',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null,
  },
})

module.exports = mongoose.model('Asset', AssetSchema)
