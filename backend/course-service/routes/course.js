const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const verifyToken = require('../middleware/verifyToken');


router.get('/all', verifyToken, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.post('/add', verifyToken, async (req, res) => {
  const { titre, professeur_id, description, prix } = req.body;

  try {
    const course = new Course({ titre, professeur_id, description, prix });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) return res.status(404).send('Cours non trouvé.');
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).send('Cours non trouvé.');
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.get('/search', verifyToken, async (req, res) => {
  const keyword = req.query.keyword || '';
  try {
    const courses = await Course.find({ titre: { $regex: keyword, $options: 'i' } });
    res.json(courses);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;