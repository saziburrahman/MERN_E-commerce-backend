const jwt = require("jsonwebtoken");
const { secretKey } = require("../EnvVariable.js");

const verifyToken = (req, res, next) => {
  const Bearartoken = req.headers["authorization"];
  if (!Bearartoken) {
    res.status(403);
    throw new Error("No token");
  }
  const token = Bearartoken.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("Failed to authenticate token");
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
