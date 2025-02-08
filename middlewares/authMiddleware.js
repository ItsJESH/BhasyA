const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken; // Get the token from the cookies

  if (!token) {
    return res
      .status(401)
      .redirect("/login?error=" + encodeURIComponent("Not authorized"));
    // No token found
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res
        .status(401)
        .redirect(
          "/login?error=" +
            encodeURIComponent("Not authorized, Please Login Again")
        ); // Invalid token
    }

    next(); // Proceed to the next middleware/route handler
  }); // User is authenticated, proceed to the next route
};

module.exports = authMiddleware;
