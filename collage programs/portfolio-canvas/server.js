const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./backend/routes/contactRoutes');
const reviewRoutes = require('./backend/routes/reviewRoutes');
const { connectDB } = require('./backend/config/db');

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.MONGODB_URI) {
  connectDB(process.env.MONGODB_URI);
}

app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);

const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
