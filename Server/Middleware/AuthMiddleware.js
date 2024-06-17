import jwt from 'jsonwebtoken'

// check access token account 
const accessTokenMiddleware = (req, res, next) => {
    try {
        const headerToken = req.headers.authorization;
        const access_token = headerToken.split(" ")[1];
        const decodedAccessToken = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedAccessToken._id;

        if (decodedAccessToken) {
            next();
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send('Expired token')
        }
        return res.status(401).send('Authentication is not valid');
    }
}

const authMiddleware = { accessTokenMiddleware }

export default authMiddleware;