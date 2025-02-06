require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const hbs = require("hbs");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI).then(() => {console.log("DB Connection Success");
  }).catch((err) => {console.error("DB Connection Failed");
    console.error(err);
    process.exit(1);});
 
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SessionsKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan(":url :method"))

// Routes
const authRoutes = require("./routes/loginRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/", authRoutes);

app.use("/", homeRoutes);

app.get("/*", (req, res) => {
  res.status(404);
  res.send("Page Not Found!");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
