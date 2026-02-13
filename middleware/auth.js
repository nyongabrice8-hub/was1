const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// JWT verification middleware
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send('Unauthorized');
        req.user = user;
        next();
    });
}

// Admin authorization middleware
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).send('Admin access required');
    }
}

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});

module.exports = {
    verifyToken,
    isAdmin,
    limiter
};