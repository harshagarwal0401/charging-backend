require('dotenv').config(); // MUST be at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend URL
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
