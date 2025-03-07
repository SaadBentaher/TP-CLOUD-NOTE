const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verifyToken = require('../middleware/verifyToken');

dotenv.config();


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('Utilisateur déjà existant.');

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Identifiants incorrects.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Identifiants incorrects.');

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).send('Utilisateur non trouvé.');
    res.json(user);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;