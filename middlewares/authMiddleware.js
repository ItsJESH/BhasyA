const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }
    next();  // User is authenticated, proceed to the next route
};

module.exports = authMiddleware;
