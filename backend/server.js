const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/plants', require('./routes/plants'));
app.use('/api/accessories', require('./routes/accessories'));
app.use('/api/care-guides', require('./routes/careGuides'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
