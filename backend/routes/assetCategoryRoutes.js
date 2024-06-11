
const express = require('express')
const router = express.Router()
const AssetCategory = require('../models/assestCategory')

router.get('/', async (req, res) => {
  try {
    const assetCategories = await AssetCategory.find()
    res.json(assetCategories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
})

router.post('/', async (req, res) => {
  const assetCategory = new AssetCategory({
    name: req.body.name,
  })

  try {
    const newAssetCategory = await assetCategory.save()
    res.status(201).json(newAssetCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

async function getCategory(req, res, next) {
  let category
  try {
    category = await AssetCategory.findById(req.params.id)
    if (category == null) {
      return res.status(404).json({ message: 'Asset category not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.category = category
  next()
}

router.put('/:id', getCategory, async (req, res) => {
  res.category.name = req.body.name

  try {
    const updatedAssetCategory = await res.category.save()
    res.json(updatedAssetCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.remove()
    res.json({ message: 'Asset category deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
