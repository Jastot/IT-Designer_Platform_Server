const World = require('../models/World.js');

// @desc    Получение списка всех миров
// @route   GET
exports.getWorlds = async (req, res, next) => {
  try {
    const worlds = await World.find();
    res.status(200).json({
      success: true,
      data: worlds,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// @desc    Получение  мира по его id
// @route   GET /:id
exports.getWorld = async (req, res, next) => {
  try {
    const world = await World.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: world,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// @desc    Создание мира
// @route   POST /create
exports.createWorld = async (req, res, next) => {
  try {
    const world = await World.create(req.body);
    res.status(201).json({
      success: true,
      data: world,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// @desc    Изменение мира по id
// @route   PUT /:id
exports.updateWorld = async (req, res, next) => {
  try {
    const world = await World.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: world,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// @desc    Удаление мира по id
// @route   DELETE /:id
exports.deleteWorld = async (req, res, next) => {
  try {
    await World.findByIdAndRemove(req.params.id);
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
