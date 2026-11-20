require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many requests. Try again later.' }
}));

app.get('/', (req, res) => res.status(200).json({ message: 'Student Portal API is running' }));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error('MONGODB_URI and JWT_SECRET must be set in .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Student Portal API running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
