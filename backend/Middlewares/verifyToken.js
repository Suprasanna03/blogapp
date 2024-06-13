const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    // Get bearer token from headers of req
    const bearerToken = req.headers.authorization;
    // If bearer token not available
    if (!bearerToken) {
        return res.status(401).send({ message: "Unauthorized access, login to continue" });
    }
    // Extract token from bearer token
    const token = bearerToken.split(' ')[1];
    try {
        // Verify token
        jwt.verify(token, process.env.SECRET_KEY);
        // Token verification successful, move to the next middleware
        next();
    } catch (err) {
        // Token verification failed, send appropriate error response
        return res.status(401).send({ message: "Invalid token" });
    }
}

module.exports = verifyToken;
