
const express = require('express')
const router = express.Router()
const Asset = require('../models/assest')

router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find()
    res.json(assets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', getAsset, (req, res) => {
  res.json(res.asset);
})
router.post('/', async (req, res) => {
  const asset = new Asset({
    name: req.body.name,
  })

  try {
    const newAsset = await asset.save()
    res.status(201).json(newAsset)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

async function getAsset(req, res, next) {
  let asset
  try {
    asset = await Asset.findById(req.params.id)
    if (asset == null) {
      return res.status(404).json({ message: 'Asset not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.asset = asset
  next()
}

router.put('/:id', getAsset, async (req, res) => {
  res.asset.name = req.body.name

  try {
    const updatedAsset = await res.asset.save()
    res.json(updatedAsset)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', getAsset, async (req, res) => {
  try {
    await res.asset.remove();
    res.json({ message: 'Asset deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
