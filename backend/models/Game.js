const mongoose = require('mongoose');

const subPackageSchema = new mongoose.Schema({
  text: { type: String },
  description: { type: String },
  price: { type: Number }
}, { _id: false });

const packageSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  subs: [subPackageSchema]
}, { _id: false });

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  release_date: { type: String },
  required_age: { type: Number },
  price: { type: Number },
  about_the_game: { type: String },
  short_description: { type: String },
  header_image: { type: String },
  systems: [String],
  achievements: { type: Number },
  recommendations: { type: Number },
  supported_languages: [String],
  packages: [packageSchema],
  developers: [String],
  publishers: [String],
  categories: [String],
  genres: [String],
  screenshots: [String],
  positive: { type: Number },
  negative: { type: Number },
  estimated_owners: { type: String },
  tags: { type: Map, of: Number }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);