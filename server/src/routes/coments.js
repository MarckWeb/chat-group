import { Router } from "express";
import commentsController from "../controllers/comments.controller.js";
const { getComments, createComment } = commentsController;

const comments = Router();

comments.route('/')
   .get(getComments)
   .post(createComment)

export default comments