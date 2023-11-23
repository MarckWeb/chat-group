import { Router } from "express";
import commentsImagesController from '../controllers/image.comment.js'
const { getCommentsImages, createCommentImages, deleteCommentsImages } = commentsImagesController;

const commentsImages = Router();

commentsImages.route('/')
   .get(getCommentsImages)
   .post(createCommentImages)

commentsImages.route('/:id')
   .delete(deleteCommentsImages)


export default commentsImages