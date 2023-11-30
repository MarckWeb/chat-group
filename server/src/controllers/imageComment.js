import pool from "../db/connection.js";
import { uploadImage } from '../libs/clodudinary.js'

//GET
const getCommentsImages = async (req, res) => {
   try {
      const [commentsImages] = await pool.query('SELECT * FROM comment_images')
      res.send(commentsImages)
   } catch (e) {
      console.error(e);
      return res.status(500).send("Error al buscar comentariso con imagen");
   }
}

const createCommentImages = async (req, res) => {
   try {
      const { commentsId } = req.body

      let imageUrl;
      let imageId;
      if (req.files && req.files.imageComment) {
         const fileImage = req.files.imageComment
         const result = await uploadImage(fileImage.tempFilePath)
         imageUrl = result.secure_url
         imageId = result.public_id
      }

      const [resultCommentImage] = await pool.execute('INSERT INTO comment_images ( comment_id, image_url, imageComment_id) VALUES (?, ?, ?)', [commentsId, imageUrl, imageId]);

      if (resultCommentImage.affectedRows > 0) {
         return res.status(200).send({
            status: 200,
            ok: true,
            message: 'se registro un comentario imagen correctamente'
         });

      } else {
         res.send({
            message: 'error al crear un nuevo comentario',
            state: 404,
         })
      }

   } catch (e) {
      console.error(e)
      return res.status(500).send("Error al crear el comentario catch");
   }
}

const deleteCommentsImages = async (req, res) => {
   try {

      const [commentsImage] = await pool.query('DELETE FROM comment_images WHERE id = ?', [req.params.id])

      if (commentsImage.affectedRows <= 0) return res.status(404).send({
         message: 'comentario imagen no encontrado',
         state: 404
      })
      res.send({
         message: 'comentario elinado con exito'
      })
   } catch (error) {
      console.log(error)
      return res.status(500).send("Error al eliminar la imagen del comentario");
   }
}


const commentsImagesController = {
   getCommentsImages,
   createCommentImages,
   deleteCommentsImages
}

export default commentsImagesController 