const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({"message":"authorization failed in middleware, not present"});
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(403).json({"message":"authorization failed in middleware, doesn't start with Bearer"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({"message":"authorization failed in middleware"});
    }
};

module.exports = {
    authMiddleware
}