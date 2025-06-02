import { ACCESS_TOKEN_SECRET } from "../config/server";
import User  from "../models/user.models";
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "Unauthorized not varified token"
            })
        }
        const user = await User.findById(decoded._id).select({
    _id: true,
    email: true,
    name: true,
    role: true,
    avatar: true
});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized" })
    }
}

export default authMiddleware;