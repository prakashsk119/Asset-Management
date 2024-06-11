const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['issue', 'return', 'scrap'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Transaction', TransactionSchema)
