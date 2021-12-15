const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require('../controllers/users.js');

const router = express.Router({ mergeParams: true });

router.route('/').get(getUsers);
router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
