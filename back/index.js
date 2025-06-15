// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log(err));


app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});


app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});


app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});


app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
});


app.delete('/users', async (req, res) => {
  await User.deleteMany({});
  res.json({ message: 'Todos los usuarios eliminados' });
});


app.post('/users/bulk', async (req, res) => {
  const users = await User.insertMany(req.body);
  res.json(users);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
