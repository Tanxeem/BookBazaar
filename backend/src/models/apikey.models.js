import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const ApiKey = mongoose.model("ApiKey", ApiKeySchema);
export default ApiKey;