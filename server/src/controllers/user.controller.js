import pool from '../db/connection.js';
import { uploadImage, deleteImage } from '../libs/clodudinary.js'

//GET:Id
const getUser = async (req, res) => {
   try {
      const userSelectedId = req.params.id
      const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [userSelectedId])
      if (user.length <= 0) return res.status(404).send({
         message: 'usuario no encontrado',
         state: 404
      })
      res.send(user[0])
   } catch (e) {
      console.error(e);
      return res.status(500).send("Error al obtener el usuario");
   }
}

//GET
const getUsers = async (req, res) => {
   try {
      const [users] = await pool.query('SELECT * FROM user')
      res.send(users)
   } catch (e) {
      console.error(e);
      return res.status(500).send("Error al obtener a todos los usuarios");
   }
}

const updateUser = async (req, res) => {
   try {
      const { id } = req.params
      const { name, lastname, email } = req.body

      const [updateUser] = await pool.query('SELECT * FROM user WHERE id = ?', [id])

      if (updateUser.length === 0) {
         return res.status(404).json({
            message: 'Usuario no encontrado con el id ' + id
         })
      }

      let avatar = updateUser[0].image;
      let imageId = updateUser[0].image_id;

      if (req.files && req.files.image) {
         const fileImage = req.files.image
         const result = await uploadImage(fileImage.tempFilePath)

         if (updateUser[0].image && updateUser[0].image_id) {
            await deleteImage(updateUser[0].image_id);
         }

         avatar = result.secure_url
         imageId = result.public_id
      }

      const [user] = await pool.query('UPDATE user SET name = ?, lastname = ?, email = ?, profile_image=?, image_id =? WHERE id = ?', [name || updateUser[0].name, lastname || updateUser[0].lastname, email || updateUser[0].email, avatar, imageId, id])

      console.log(user)
      if (user.affectedRows <= 0) {
         return req.status(404).send({
            message: 'Usuario no actualizado',
            state: 404
         })
      }

      return res.status(200).send({
         message: 'Usuario actualizado',
         state: 200,
         data: { id, name, lastname, email, avatar, imageId }
      })

   } catch (error) {
      console.error(error)
      return res.status(500).send("Error al actualizar el usuario");
   }
}

const deleteUser = async (req, res) => {
   try {
      const [user] = await pool.query('DELETE FROM user WHERE id = ?', [req.params.id])

      if (user.affectedRows <= 0) return res.status(404).send({
         message: 'usuario no encontrado',
         state: 404
      })
      res.send({
         message: 'usuario elinado con exito'
      })

   } catch (error) {
      console.log(error)
      return res.status(500).send("Error al eliminar el usuario");
   }
}

const userController = {
   getUser,
   getUsers,
   updateUser,
   deleteUser
}

export default userController

//uso de put o patch
//patch actualiza parcialmente-. donde le podemos indicar que si alguna propiedad no tiene valor que mantenga el valor anterior o actual,

//put actualiza todo-. si la propiedad no tiene valor coloca null