const jwt = require("jsonwebtoken");

const config = process.env;
// если честно
// думаю, это нечестно
// ты в порядке, если верить друзьям
// а еще ты смогла найти кого-то вместо меня
// а я - #####
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
