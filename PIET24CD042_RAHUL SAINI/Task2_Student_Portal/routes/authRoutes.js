const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  next();
};

// POST /register
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['student', 'admin']).withMessage('Role must be student or admin')
], validateRequest, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email.toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email: normalizedEmail, password: hashedPassword, role: role || 'student'
    });
    res.status(201).json({
      message: 'Registration successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already registered' });
    next(err);
  }
});

// POST /login
router.post('/login', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], validateRequest, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'Login successful',
      token,
      expiresIn: '1h',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
});

module.exports = router;
