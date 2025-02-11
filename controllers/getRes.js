const UserRecord = require("../models/userRecord");
const UserExam = require("../models/userExam");
const UserClips = require("../models/userClips");

const jwt = require("jsonwebtoken");
const userClips = require("../models/userClips");


exports.resData = async (req, res) => {
        // console.log("dnj")
        const token = jwt.decode(req.cookies.authToken,process.env.JWT_SECRET)
        const { type, date } = req.query;
        // console.log("type:",type,"date:",date)
        
        if (type === "overall"){

            let userRecord = await UserRecord.findOne({ userId: token.userId });
            let data = {}; // Store response data
    
            // If date exists in `dailyRecords`, use it; otherwise, return default 0 values
                data = userRecord.dailyRecords.get(date) || {
                    todaysClips: 0,
                    todaysExams: 0,
                    todaysScore: 0,
                    todaysTimeSpent: 0,
                    todaysBadges: 0,
                    streakDays: 0,
                    examsGive: [],
                    clipsWatch: []
                };
            
            res.render("partials/overallrec", { data: data })
        }
        else if( type === "clips"){
            let userRecord = await UserClips.findOne({ userId: token.userId });
            let data = {}; 
            if (userRecord) {
                // If date exists in `dailyRecords`, use it; otherwise, return default 0 values
                    data = userRecord.dailyRecords.get(date) 
                    if (data) {
                        res.render("partials/overallrec")   
                    }
                    else{
                        res.render("partials/norec")
                    }
                }else{
                    res.render("partials/norec")
                } 

        }
        else if( type === "exam"){
            let userRecord = await UserExam.findOne({ userId: token.userId });
            let data = {}; 
            if (userRecord) {
                // If date exists in `dailyRecords`, use it; otherwise, return default 0 values
                    data = userRecord.dailyRecords.get(date) 
                    if (data) {
                        res.render("partials/overallrec")   
                    }
                    else{
                        res.render("partials/norec")
                    }
                }else{
                    res.render("partials/norec")
                } 

        }

};
