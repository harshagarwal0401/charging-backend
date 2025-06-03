const express = require('express');
const {
  createStation,
  getStations,
  updateStation,
  deleteStation,
} = require('../controllers/stationController');

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protect create, update, delete routes with authMiddleware
router.post('/', authMiddleware, createStation);
router.get('/', getStations); // if you want public access to get stations, remove authMiddleware here
router.put('/:id', authMiddleware, updateStation);
router.delete('/:id', authMiddleware, deleteStation);

module.exports = router;
