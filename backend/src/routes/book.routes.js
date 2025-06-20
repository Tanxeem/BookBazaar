import express from "express";
import { createBook, DeleteBook, getAllBooks, getBookById, updateBook } from "../controllers/book.controllers.js";
import validate from "../middleware/validator.middleware.js";
import { bookSchema } from "../validators/auth.validators.js";
import checkAdmin from "../middleware/admin.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";


const bookRouter = express.Router();

bookRouter.post("/create",authMiddleware, checkAdmin, validate(bookSchema), createBook);
bookRouter.get("/getallbooks", getAllBooks);
bookRouter.get("/getbookbyid/:id", getBookById);
bookRouter.put("/updatebook/:id",authMiddleware, checkAdmin, validate(bookSchema.partial()), updateBook);
bookRouter.delete("/deletebook/:id",authMiddleware,checkAdmin, DeleteBook);

export default bookRouter;