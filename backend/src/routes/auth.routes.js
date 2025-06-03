import express from "express";
import { generateApiKey, login, logout, me, register } from "../controllers/auth.controllers.js";
import validate from "../middleware/validator.middleware.js";
import { userLoginValidator, userRegistrationValidator } from "../validators/auth.validators.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",validate(userRegistrationValidator), register);
authRouter.post("/login",validate(userLoginValidator), login);
authRouter.post("/logout",authMiddleware, logout);
authRouter.get("/me",authMiddleware, me);
authRouter.post("/apikey",authMiddleware, generateApiKey);


export default authRouter;