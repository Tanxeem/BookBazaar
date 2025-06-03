import express, { urlencoded } from "express";
import { FRONTEND_URL, PORT } from "./config/server.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
import bookRouter from "./routes/book.routes.js";
import reviewsRouter from "./routes/review.routes.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use("/api/v1/users", authRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/reviews", reviewsRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});