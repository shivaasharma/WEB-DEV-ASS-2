const express = require('express');
const router = express.Router();
let students = require('../data/students');

// Helper to auto-increment ID
let nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

// GET /students - Retrieve all students
router.get('/', (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - Retrieve a single student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json(student);
});

// POST /students - Create a new student
router.post('/', (req, res) => {
  const { name, age, course } = req.body;

  // Validation: Check for required fields
  if (!name || !age || !course) {
    return res.status(400).json({ error: "Please provide name, age, and course" });
  }

  const newStudent = {
    id: nextId++,
    name,
    age: Number(age),
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - Update an existing student record
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const { name, age, course } = req.body;

  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  // Update existing fields or retain old values
  students[studentIndex] = {
    id: studentId,
    name: name !== undefined ? name : students[studentIndex].name,
    age: age !== undefined ? Number(age) : students[studentIndex].age,
    course: course !== undefined ? course : students[studentIndex].course
  };

  res.status(200).json(students[studentIndex]);
});

// DELETE /students/:id - Remove a student record
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];
  res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
});

module.exports = router;