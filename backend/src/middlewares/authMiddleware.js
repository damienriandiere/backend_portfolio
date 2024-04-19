const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  let token = req.headers.authorization;
  const accessKey = process.env.ACCESS_KEY_SECRET;

  if (!token) {
    console.error("Token not found");
    return res.status(401).json({ message: "Token not found" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, accessKey, async (err, user) => {
    if (err) {
      console.error("Invalid token" + err.message);
      return res.status(403).json({ message: "Invalid token" + err.message });
    }

    req.user = user;
    next();
  });
}

module.exports = authMiddleware;
