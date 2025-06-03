const Station = require('../models/Station');

exports.createStation = async (req, res) => {
  try {
    console.log('CreateStation request body:', req.body);
    console.log('Authenticated user:', req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    const station = new Station({ ...req.body, createdBy: req.user.id });
    await station.save();

    res.status(201).json(station);
  } catch (error) {
    console.error('Error in createStation:', error);
    res.status(500).json({ message: 'Failed to add station', error: error.message });
  }
};

exports.getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stations' });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update station' });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete station' });
  }
};
