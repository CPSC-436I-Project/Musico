const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

const createToken = (id) => {
    const token = jwt.sign({_id: id}, process.env.JWT_SECRET, {
        expiresIn: 1008000
    });
    return token;
}

module.exports.verifyToken = verifyToken;
module.exports.createToken = createToken;