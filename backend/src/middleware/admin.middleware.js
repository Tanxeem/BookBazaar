import User from "../models/user.models.js";


const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user =await User.findById(userId);
        if(user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        next();
    } catch (error) {
        console.log("here show error",error)
        return res.status(500).json({success: false, message: "Unauthorized" })
    }
}

export default checkAdmin;