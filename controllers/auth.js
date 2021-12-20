const User = require('../models/User');
const jwt = require('jsonwebtoken');
const perms = require('../config/permissions.json');
const bcrypt = require("bcrypt");

/**
 * @desc    sign-up
 * @route   POST /api/auth/register
 * @param {*} req
 * @param {*} res
 * @param {*} next
*/

exports.register = async (req, res) => {
    const body = req.body;

    if (!(body.login && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
  };



/**
 * @desc    Login
 * @route   POST /api/auth/login
 * @param {*} req
 * @param {*} res
 * @param {*} next
*/

exports.login = async (req, res, next) => {
    const body = req.body;
    const user = await User.findOne({ login: body.login });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        sendTokenResponse(user, 200, res);
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
};

// Получаем JWT из модели и отправляем в ответ на запрос
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token: token, userId: user._id});
}
