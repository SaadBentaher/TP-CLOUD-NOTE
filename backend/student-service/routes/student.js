const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const verifyToken = require('../middleware/verifyToken');

router.get('/all', verifyToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.post('/add', verifyToken, async (req, res) => {
  const { nom, email, cours } = req.body;

  try {
    const student = new Student({ nom, email, cours });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.post('/enroll/:etudiant_id/:cours_id', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.params.etudiant_id);
    if (!student) return res.status(404).send('Étudiant non trouvé.');

    if (!student.cours.includes(req.params.cours_id)) {
      student.cours.push(req.params.cours_id);
      await student.save();
    }

    res.json(student);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

router.get('/enrolledCourses/:etudiant_id', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.params.etudiant_id);
    if (!student) return res.status(404).send('Étudiant non trouvé.');
    res.json(student.cours);
  } catch (err) {
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;