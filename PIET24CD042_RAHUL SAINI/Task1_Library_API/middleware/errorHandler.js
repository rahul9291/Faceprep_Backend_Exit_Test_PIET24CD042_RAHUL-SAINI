module.exports = (err, req, res, next) => {
  console.error(err.stack || err);
  if (err.name === 'ValidationError' || err.name === 'CastError' || err.code === 11000) {
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
};
