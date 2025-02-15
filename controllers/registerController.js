const User = require("../models/users");
const UserActivity = require("../models/userActivity");
const UserRecord = require("../models/userRecord");

const CryptoJS = require("crypto-js");
const sendEmail = require("../utils/sendEmail");
const Crypto = require("crypto");
const userActivity = require("../models/userActivity");
const { console } = require("inspector");

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
    // 
    // Check if user already exists
    const verificationToken = Crypto.randomBytes(32).toString("hex");
    // 
    const unme = uname.trim();
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: unme }],
    });
    if (existingUser) {
      // 
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
    // const verificationLink = `http://localhost:8383/verify/${verificationToken}`;
    
    const verificationLink = `https://bhasya.vercel.app/verify/${verificationToken}`;
    // 
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
  try {
    res.render("verify");
  } catch (e) {
    res.status(500).send("Error Rendring Page: " + error.message);
  }
};


exports.verifyUser = async (req, res) => {
  
  const token = req.params.token;
  
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).send("Invalid verification link.");
    }
    
    // Update user as verified
    
    user.verified = true;
    user.verificationToken = null; // Remove token after verification
    await user.save();
    
    const today = new Date().toISOString().split("T")[0]; // This will get the format YYYY-MM-DD
    const userrec = new UserRecord({
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
    

    const useract = new UserActivity({
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
    
    
    await useract.save();
    
    await userrec.save();
    
    await User.findByIdAndUpdate(user._id,
      {$set: {userRecordId:userrec._id,userActivityId:useract._id}}
      );
    res.redirect("/login?message=Account verified successfully!"); // Redirect to login page
  
};
