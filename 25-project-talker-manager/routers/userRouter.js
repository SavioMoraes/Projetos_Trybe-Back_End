const express = require('express');

const router = express.Router();
const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/validation');

router.post(
  '/',
  isValidEmail,
  isValidPassword,
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }),
);

module.exports = router;