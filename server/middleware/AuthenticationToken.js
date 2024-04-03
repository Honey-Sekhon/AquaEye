const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Authorization header is required");

  try {
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Token not found");

    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.json({ error: "Invalid Token" });
    }
  }
};

module.exports = { authenticateToken };
