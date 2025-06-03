import express from "express";
import { createBook, DeleteBook, getAllBooks, getBookById, updateBook } from "../controllers/book.controllers.js";


const bookRouter = express.Router();

bookRouter.post("/create", createBook);
bookRouter.get("/getallbooks", getAllBooks);
bookRouter.post("/getbookbyid/:id", getBookById);
bookRouter.put("/updatebook", updateBook);
bookRouter.delete("/deletebook", DeleteBook);

export default bookRouter;