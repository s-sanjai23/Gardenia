const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true,
}));
app.use(express.json());

// Health check for deployment platforms
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Gardenia API' });
});

// Define Routes
app.use('/api/plants', require('./routes/plants'));
app.use('/api/accessories', require('./routes/accessories'));
app.use('/api/care-guides', require('./routes/careGuides'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gardenia API started on port ${PORT}`);
});
