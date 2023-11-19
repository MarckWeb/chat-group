import { Router } from "express";
import commentsController from "../controllers/comments.controller.js";
const { getComments, createComment, deleteComments } = commentsController;

const comments = Router();

comments.route('/')
   .get(getComments)
   .post(createComment)

comments.route('/:id')
   .delete(deleteComments)


export default comments