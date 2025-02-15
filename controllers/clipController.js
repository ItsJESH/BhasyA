
const jwt = require("jsonwebtoken");


exports.getHome = async (req, res) => {
        const token = jwt.decode(req.cookies.authToken,process.env.JWT_SECRET)
        // res.render('index', {user});
        res.render('clips');
};
