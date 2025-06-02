import User from "../models/user.models.js";


const checkAdmin = (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = User.findById(userId);
        if(user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Unauthorized" })
    }
}

export default checkAdmin;