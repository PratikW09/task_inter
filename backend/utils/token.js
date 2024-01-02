const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    const secretKey = process.env.JWT_SEXRECT;
    
    const token = jwt.sign(
        {
            userId: user._id,
            
        },
        secretKey,
        {
            expiresIn: '7d', 
        }
    );
    return token;
};


const verifyTokenMiddleware = (req, res, next) => {

    const cookie = req.headers.cookie;

    if(!cookie){return res.status(401).json({ error: 'Unauthorized - Token missing' });}
    const token = cookie.split("=")[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }

    const secretKey = process.env.JWT_SEXRECT;

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};


module.exports = { generateToken,verifyTokenMiddleware };