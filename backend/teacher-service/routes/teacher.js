const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const verifyToken = require('../middleware/verifyToken');

router.get('/all', verifyToken, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.post('/add', verifyToken, async (req, res) => {
  const { name, bio, cours } = req.body;
  try {
    const teacher = new Teacher({ name, bio, cours });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.post('/assign/:professeur_id/:cours_id', verifyToken, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.professeur_id);
    if (!teacher) return res.status(404).send('Professeur non trouvé.');
    if (!teacher.cours.includes(req.params.cours_id)) {
      teacher.cours.push(req.params.cours_id);
      await teacher.save();
    }

    res.json(teacher);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.get('/enrolledStudents/:cours_id', verifyToken, async (req, res) => {
  try {
    const students = await Student.find({ cours: req.params.cours_id });
    res.json(students);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;