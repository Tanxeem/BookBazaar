import User from "../models/user.models.js"

export const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
   try {
    const existingUser = await User.findOne({email})
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    const newUser = User.create({
        name,
        email,
        password
    })
    if(!newUser) {
        return res.status(400).json({
            success: false,
            message: "Failed to create user"
        })
    }

    await newUser.save()
    return res.status(200).json({
        success: true,
        message: "User created successfully"
    })
    
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:['User created failed please check the details', error.message]
    })
   }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
     const user = await User.findOne({email})
     if(!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        })
     }

     const isMatched = await user.isPasswordMatched(password)
     if(!isMatched) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
     }

     const token = await user.generateAccesToken();

     res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: "none"
     })

     return res.status(200).json({
        success: true,
        message: "User logged in successfully"
     })
 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:['User login failed please check the details', error.message]
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error:"Error logging out user"
        })
    }
}

export const me = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: req.user
        })
    } catch (error) {
        return res.status(500).json({success: false, message: "Something went wrong" })
    }
}