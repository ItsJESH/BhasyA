const User = require("../models/users");
const UserActivity = require("../models/userActivity");
const UserRecord = require("../models/userRecord");

const CryptoJS = require("crypto-js");
const sendEmail = require("../utils/sendEmail");
const Crypto = require("crypto");

const secretKey = process.env.SECRET_KEY;


exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      uname,
      email,
      mobile,
      password,
      gender,
      bday,
      cpassword,
    } = req.body;
    // console.log(fullName, uname, email, mobile, password, gender, bday, cpassword);
    // Check if user already exists
    const verificationToken = Crypto.randomBytes(32).toString("hex");
    // console.log(verificationToken);
    const unme = uname.trim();
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: unme }],
    });
    if (existingUser) {
      // console.log(existingUser)
      return res
        .status(409)
        .redirect(
          "/login?error=" +
            encodeURIComponent(
              "User already exists with this email or username!"
            )
        );
    }
    if (password != cpassword) {
      return res
        .status(409)
        .redirect(
          "/login?error=" +
            encodeURIComponent(
              "Password and Confirm Password are not the same!"
            )
        );
    }
    // Create new user
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretKey
    ).toString();
    const newUser = new User({
      name: fullName,
      username: unme,
      email: email,
      number: mobile,
      password: encryptedPassword,
      gender: gender,
      DOB: bday,
      verificationToken: verificationToken,
    });
    const verificationLink = `http://localhost:8383/verify/${verificationToken}`;
    // console.log(verificationLink);
    await sendEmail(
      email,
      "Verify Your Email",
      `Click this link to verify your account: ${verificationLink}`
    );

    await newUser.save();
    res.redirect("/verify");
  } catch (error) {
    res.status(500).send("Error registering user: " + error.message);
  }
};

exports.getVerify = (req, res) => {
  res.render("verify");
};



exports.verifyUser = async (req, res) => {
    try {
      const { token } = req.params;
      const user = await User.findOne({ verificationToken: token });
  
      if (!user) {
        return res.status(400).send("Invalid verification link.");
      }
  
      // Update user as verified
      user.verified = true;
      user.verificationToken = null; // Remove token after verification
      await user.save();
      const today = new Date().toISOString().split("T")[0]; // This will get the format YYYY-MM-DD
      await UserRecord.create({
        userId: user._id,
        username: user.username,
        dailyRecords: {
          [today]: {
            clipsWatched: 0,
            timeSpent: 0,
            badgesEarned: 0,
            examsGiven: 0,
            streakDays: 0, // Starting streak from day 0
          },
        },
        overall: {},
      });
      console.log(req.ip);
      await UserActivity.create({
        userId: user._id,
        username: user.username,
        activities: [
          {
            type: "Account Verified",
            timestamp: new Date(),
            ip: req.ip,
            device: req.headers["user-agent"],
            cookie: {
              value: user._id,
              expiresAt: new Date(),
            },
          },
        ],
      });
  
      res.redirect("/login?message=Account verified successfully!"); // Redirect to login page
    } catch (error) {
      res.status(500).send("Error verifying user");
    }
  };
  