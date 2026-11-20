const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();


router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});


router.get('/students', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json({ count: students.length, students });
  } catch (err) { next(err); }
});

module.exports = router;
