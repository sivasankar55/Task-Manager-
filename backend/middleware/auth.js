import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req,res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get the token from header Bearer token
            token = req.headers.authorization.split(' ')[1];

            // verify the token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            //Attach user to request without the password
            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user) {
                return res.status(401).json({msg:'Not authorized, user not found'});
            }

            next();

        } catch (error) {
            console.error(error);
            res.status(401).json({msg:'Not authorized,token failed'});
        }
    }

    if(!token) {
        res.status(401).json({msg:'Not authorized, no token'});
    }
};

export default protect;