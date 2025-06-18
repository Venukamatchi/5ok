const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = mongoose.model('recipes', new mongoose.Schema({}, { strict: false }));

router.get('/', async (req, res) => {
  const recipes = await Recipe.find({}, {
    _id: 1, title: 1, cuisine: 1, rating: 1, total_time: 1
  }).limit(20);
  res.json(recipes);
});

router.get('/detail/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  const recipe = await Recipe.findById(id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

router.get('/search/:q', async (req, res) => {
  const q = req.params.q;
  const results = await Recipe.find({
    $or: [
      { cuisine: new RegExp(q, 'i') },
      { title: new RegExp(q, 'i') }
    ]
  }, {
    _id: 1, title: 1, cuisine: 1, rating: 1, total_time: 1
  }).limit(20);
  res.json(results);
});

router.post('/add', async (req, res) => {
  const result = await Recipe.create(req.body);
  res.json({ message: "✅ Recipe added!", data: result });
});

router.put('/edit/:id', async (req, res) => {
  const result = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "✏️ Recipe updated!", data: result });
});

router.delete('/delete/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "🗑️ Recipe deleted!" });
});

module.exports = router;

