 import {Authenticate} from 'authentication-api-ibm'

const secretKey = process.env.SECRET_KEY
const Authentication = new Authenticate(null, null)


export const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            Error: 'Access unauthorized.'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = Authentication.authorize(token);
        req.user = payload; 
        next();
    } catch (err) {
        return res.status(401).json({
            Error: 'Access unauthorized.'});
    }
};