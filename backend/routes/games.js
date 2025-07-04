const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/search', async (req, res) => {
  const { name, minPrice, maxPrice, genres, windows, mac, linux, sortBy = 'positive', order = 'desc', page = 1, limit = 20 } = req.query;
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
  if (genres) {
    const genreArray = genres.split(',').map(g => g.trim());
    filters.genres = { $in: genreArray };
  }

  // Systems
  if (windows !== undefined) filters.windows = windows === 'true';
  if (mac !== undefined) filters.mac = mac === 'true';
  if (linux !== undefined) filters.linux = linux === 'true';

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

module.exports = router;
