import ApiKey from "../models/apikey.models.js";

const verifyApikey = async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const keyDoc = await ApiKey.findOne({ 
            key: apiKey, 
            active: true,
            expiresAt: { $gt: new Date() }
         }).populate("user");
        if (!keyDoc) {
            return res.status(401).json({ success: false, message: "Invalid or expired API key" });
        }
        req.apikey = keyDoc;
        next();
    } catch (error) {
         return res.status(500).json({ error: 'Server error while verifying API key' });
    }
}

export default verifyApikey;