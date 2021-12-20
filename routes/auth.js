const express = require('express');
const {
  login,
  register,
} = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.post('/welcome', (req, res) => {
  const auth = require('../middleware/auth');
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
