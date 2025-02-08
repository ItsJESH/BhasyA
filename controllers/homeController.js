exports.getHome = (req, res) => {
    if (req.cookies.authToken) {
        res.render('index', { username: "Heyy" });
    } else {
        res.redirect('/login'); // If user is not logged in, redirect to login page
    }
};
