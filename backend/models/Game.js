const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  release_date: { type: String },
  required_age: { type: Number },
  price: { type: Number },
  about_the_game: { type: String },
  short_description: { type: String },
  header_image: { type: String },
  windows: { type: Boolean },
  mac: { type: Boolean },
  linux: { type: Boolean },
  achievements: { type: Number },
  recommendations: { type: Number },
  supported_languages: [String],
  packages: [String], // Puede cambiarse si quieres más detalle
  developers: [String],
  publishers: [String],
  categories: [String],
  genres: [String],
  screenshots: [String],
  user_score: { type: Number },
  positive: { type: Number },
  negative: { type: Number },
  estimated_owners: { type: String },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);