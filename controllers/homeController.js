const User = require("../models/users");
const UserRecord = require("../models/userRecord");

const jwt = require("jsonwebtoken");


exports.getHome = async (req, res) => {

        const token = jwt.decode(req.cookies.authToken,process.env.JWT_SECRET)
        const user = await User.findOne({_id:token.userId}).populate({path:'userRecordId'})
        res.render('index', {user});
    
};
