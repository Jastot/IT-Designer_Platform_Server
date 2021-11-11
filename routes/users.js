const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  createUser,
} = require('../controllers/users.js');

const router = express.Router({ mergeParams: true });

router.route('/').post(createUser).get(getUsers);
router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
