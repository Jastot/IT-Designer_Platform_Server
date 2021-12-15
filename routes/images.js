const express = require('express');
const {
  getImages,
  createImage,
} = require('../controllers/images.js');

const router = express.Router({ mergeParams: true });

router.route('/').post(createImage).get(getImages);

module.exports = router;
