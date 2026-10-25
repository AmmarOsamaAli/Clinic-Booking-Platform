function verifyOrigin(req, res, next) {
  const requests = ["GET", "HEAD", "OPTIONS"];
  const Origin = "http://localhost:5173";
  if (requests.includes(req.method)) {
    return next();
  } else if (Origin === req.get("Origin")) {
    return next();
  } else {
    res.status(403).json({ message: "Error" });
  }
}

module.exports = verifyOrigin;
