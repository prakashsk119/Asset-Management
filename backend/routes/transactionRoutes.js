
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', getTransaction, (req, res) => {
  res.json(res.transaction)
})

router.post('/', async (req, res) => {
  const transaction = new Transaction({
  })

  try {
    const newTransaction = await transaction.save()
    res.status(201).json(newTransaction)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

async function getTransaction(req, res, next) {
  let transaction
  try {
    transaction = await Transaction.findById(req.params.id)
    if (transaction == null) {
      return res.status(404).json({ message: 'Transaction not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.transaction = transaction
  next()
}

// PUT update an existing transaction
router.put('/:id', getTransaction, async (req, res) => {
  // Update properties of the transaction object
  // Example: res.transaction.amount = req.body.amount;

  try {
    const updatedTransaction = await res.transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getTransaction, async (req, res) => {
  try {
    await res.transaction.remove();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
