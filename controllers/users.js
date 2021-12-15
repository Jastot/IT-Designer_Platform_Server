const User = require('../models/User.js');

// @desc    Получение списка всех пользователей
// @route   GET /users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// @desc    Получение  пользователя по его id
// @route   GET /users/:id
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// @desc    Изменение профиля пользователя по id
// @route   PUT /users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// @desc    Удаление должности по id
// @route   DELETE /users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};
