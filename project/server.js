const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:8000' }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/securin')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

