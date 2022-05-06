const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //get token from the header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token, auth denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};