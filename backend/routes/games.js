const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

router.get('/search', async (req, res) => {
  const { name, minPrice, maxPrice, genres, windows, mac, linux, page = 1, limit = 20 } = req.query;
  const filters = {};

  // Filtros
  if (name) filters.name = { $regex: name, $options: 'i' };
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }
  if (genres) {
    const genreArray = genres.split(',').map(g => g.trim());
    filters.genres = { $in: genreArray };
  }
  if (windows !== undefined) filters.windows = windows === 'true';
  if (mac !== undefined) filters.mac = mac === 'true';
  if (linux !== undefined) filters.linux = linux === 'true';

  // Paginación
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  try {
    const total = await Game.countDocuments(filters); // total de Games que cumplen los filtros
    const games = await Game.find(filters)
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

module.exports = router;
