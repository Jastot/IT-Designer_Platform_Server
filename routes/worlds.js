const express = require('express');
const {
  updateWorld,
  deleteWorld,
  getWorld,
  getWorlds,
  createWorld,
} = require('../controllers/worlds.js');

const router = express.Router({ mergeParams: true });

router.route('/').post(createWorld).get(getWorlds);
router
  .route('/:id')
  .get(getWorld)
  .delete(deleteWorld)
  .put(updateWorld);

module.exports = router;
