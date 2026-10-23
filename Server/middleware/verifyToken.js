const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function verifyToken(req, res, next) {
  let decoded;
  try {
    const token = req.cookies.accessToken
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
  try {
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    req.user = decoded;

    if (user.isBlocked)
      return res.status(403).json({ message: "This User is Blocked and Can't Log in" });
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = verifyToken;
