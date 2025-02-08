const User = require("../models/users");
const UserActivity = require("../models/userActivity");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.loginPage = (req, res) => {
  try {
    res.render("login"); // Rendering the login page using Handlebars
  } catch (e) {
    res.status(500).send("Error Rendring Page: " + error.message);
  }
};

// Handle login request
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const uname = username.trim();
    // Check if username or email exists in the mock data
    const user = await User.findOne({
      $or: [{ email: uname }, { username: uname }],
    });
    // console.log(user);
    if (user) {
      // Verify password using bcrypt jsonwebtoken
      if (!user.verified) {
        return res.redirect("/verify");
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      if (password === decryptedPassword) {
        // Password matches
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET, // Secret Key
          { expiresIn: "30d" } // Token expires in 7 days
        );
        // Send token as HTTP-only cookie (More Secure)
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Only secure in production
          maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
        }); // Store username in session
        let userActivity = await UserActivity.findOne({ userId: user._id });

        if (!userActivity) {
          // If the user activity doesn't exist, create a new one
          userActivity = new UserActivity({
            userId: user._id,
            username: user.username,
            activities: [],
          });
        }

        // Add login activity to activities array
        userActivity.activities.push({
          type: "Login",
          ip: req.ip,
          device: req.headers["user-agent"],
          cookie: {
            value: token,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
          },
        });

        // Save the activity in the userActivity collection
        await userActivity.save();
        return res.redirect("/");
      } else {
        return res.redirect(
          "/login?error=" + encodeURIComponent("Invalid Username or Password")
        );
      }
    } else {
      return res.redirect(
        "/login?error=" + encodeURIComponent("User not found")
      );
    }
  } catch (e) {
    res.status(500).send("Error Loging user: " + error.message);
  }
};
