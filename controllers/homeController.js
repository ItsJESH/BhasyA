exports.getHome = (req, res) => {
    if (req.session.user) {
        res.render('index', { username: req.session.user });
    } else {
        res.redirect('/login'); // If user is not logged in, redirect to login page
    }
};
