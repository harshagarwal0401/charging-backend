const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = createToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isMatch = await user?.comparePassword(req.body.password);
    if (!isMatch) throw new Error();
    const token = createToken(user);
    res.json({ token });
  } catch {
    res.status(400).json({ error: 'Invalid credentials' });
  }
};
