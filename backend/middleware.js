const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).json({ messsage: "No token provided" });
  }
  const token = authorization.split(" ");

  try {
    const decoded = jwt.verify(token[1], JWT_SECRET);
    if (decoded.userId) {
      //   console.log(decoded);
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }

  // jwt.verify(token[1], JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ message: "Failed to authenticate token" });
  //   }
  //   if ((decoded.username = req.headers.username)) {
  //     next();
  //   }
  // });
}

module.exports = authMiddleware;
