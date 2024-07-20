
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
const { OAuth2Client } = require("google-auth-library");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Не авторизован" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e)
    res.status(403).json({ message: "Не авторизован" });
  }
};
