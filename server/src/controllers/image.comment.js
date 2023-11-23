import pool from "../db/connection.js";

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
      const { content, userId, channelId } = req.body
      console.log(req.body)

      const [resultComment] = await pool.execute('INSERT INTO comments ( content, user_id, channel_id) VALUES (?, ?, ?)', [content, userId, channelId]);
      console.log('comemet resulatdo')
      console.log(resultComment)

      if (resultComment.affectedRows > 0) {
         return res.status(200).send({
            status: 200,
            ok: true,
            message: 'se registro un comentario correctamente'
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

      const [comments] = await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id])
      console.log('delete comments', comments)
      if (comments.affectedRows <= 0) return res.status(404).send({
         message: 'comentario no encontrado',
         state: 404
      })
      res.send({
         message: 'comentario elinado con exito'
      })
   } catch (error) {
      console.log(error)
      return res.status(500).send("Error al eliminar el usuario");
   }
}


const commentsImagesController = {
   getCommentsImages,
   createCommentImages,
   deleteCommentsImages
}

export default commentsImagesController 