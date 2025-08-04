const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const mongoose = require('mongoose');

router.get('/search', async (req, res) => {
  const {
    name,
    minPrice,
    maxPrice,
    genres,
    windows,
    mac,
    linux,
    categories,
    tags,
    sortBy = 'positive',
    order = 'desc',
    page = 1,
    limit = 20
  } = req.query;
  const filters = {};

  // Name
  if (name) filters.name = { $regex: name, $options: 'i' };

  // Price
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }

  // Genres
  if (genres) filters.genres = { $in: genres };

  // Categories
  if (categories) filters.categories = { $in: categories };

  // Tags
  if (tags) filters[`tags.${tags}`] = { $exists: true };

  // Systems
  const systemFilters = [];
  if (windows === 'true') systemFilters.push('windows');
  if (mac === 'true') systemFilters.push('mac');
  if (linux === 'true') systemFilters.push('linux');

  if (systemFilters.length > 0) {
    filters.systems = { $in: systemFilters };
  }

  // Paginación
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const sortDirection = order === 'desc' ? -1 : 1;
  const sortOptions = { [sortBy]: sortDirection };

  const projection = {
    name: 1,
    price: 1,
    header_image: 1,
    short_description: 1,
    positive: 1,
  };

  try {
    const total = await Game.countDocuments(filters);
    const games = await Game.find(filters, projection)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      results: games
    });
  } catch (err) {
    console.error('Error searching for games:', err);
    res.status(500).json({ error: 'An error occurred while searching for games' });
  }
});

router.get('/getData', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    console.error('Error fetching game by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Only used for changes boolean systems to array systems
router.put('/change-systems', async (req, res) => {
  try {
    const records = await Game.find({}, { _id: 1, windows: 1, linux: 1, mac: 1 });

    for (const record of records) {
      const newSystems = [];

      if (record.windows) newSystems.push('windows');
      if (record.linux) newSystems.push('linux');
      if (record.mac) newSystems.push('mac');

      record.systems = newSystems;

      // Delete boolean fields
      delete record.windows;
      delete record.linux;
      delete record.mac;

      await record.save();
    }

    res.json({ message: 'Migración completada' });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Error en la migración' });
  }
});

router.get('/searchRecommendation', async (req, res) => {
  const { _id, tags } = req.query;

  const filters = {};

  filters._id = { $ne: _id };
  if (tags) {
    const tagArray = JSON.parse(tags);
    tagArray.forEach(tag => {
      filters[`tags.${tag}`] = { $exists: true };
    });
  }

  const projection = {
    name: 1,
    price: 1,
    header_image: 1,
    positive: 1,
  };

  try {
    const relatedItems = await Game.find(filters, projection)
      .sort({ positive: -1 })
      .limit(4);
    res.json({ results: relatedItems });
  } catch (err) {
    console.error('Error searching for games:', err);
    res.status(500).json({ error: 'An error occurred while searching for games' });
  }
});

module.exports = router;