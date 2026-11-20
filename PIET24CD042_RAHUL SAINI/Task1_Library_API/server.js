require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.status(200).json({ message: 'Library Book Management API is running' }));
app.use('/books', bookRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is missing. Create a .env file using .env.example.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Library API running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
