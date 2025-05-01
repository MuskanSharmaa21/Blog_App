const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

const checkIUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log(authorization)
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, "abcde");
      req.user = await authModel.findById(userID).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = checkIUserAuthenticated;