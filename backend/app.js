require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

const gamesRoutes = require('./routes/games');
app.use('/api/games', gamesRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => console.error('MongoDB connection error:', err));