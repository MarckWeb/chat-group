import pool from '../db/connection.js';
import UserModel from '../models/user.js';

import bcrypt from 'bcrypt'
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
      //el resultado de esto envia un [ ] de [] pro lo tanto hay que desestructurar para traer solo el dato deseado
      const [users] = await pool.query('SELECT * FROM user')
      res.send(users)
   } catch (e) {
      console.error(e);
      return res.status(500).send("Error al obtener a todos los usuarios");
   }
}


//cambiar al archivo auht
const createUser = async (req, res) => {
   try {
      console.log(req.body)
      if (req.body) {

         const { id, name, lastname, username, email, password } = req.body

         const user = new UserModel(req.body)
         const validationErrors = user.validate();
         if (validationErrors) {
            res.send({
               message: 'error de validacio',
               error: validationErrors
            })
         } else {
            const passwordHash = await bcrypt.hash(password, 8);
            const row = "INSERT INTO user (id, name, lastname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [id, name, lastname, username, email, passwordHash];

            const [result] = await pool.query(row, values);
            if (!result) {
               res.send({
                  message: 'error al guardar el dato del usuario',
                  state: 404,
               })
            }
            res.send({
               id: result.insertId,
               name,
               lastname,
               username,
               email,
               password: passwordHash
            })
         }

      }

   } catch (e) {
      console.error(e)
      return res.status(500).send("Error al crear el usuario");
   }
}

const updateUser = async (req, res) => {

   try {
      const { id } = req.params
      const { name, lastname, username, email } = req.body
      console.log(req.body)

      const [user] = await pool.query('UPDATE user SET name = ?, lastname = ?, username = ?, email = ? WHERE id = ?', [name, lastname, username, email, id])

      if (user.affectedRows === 0) return res.status(404).json({
         message: 'Usuario no encontrado con el id ' + id
      })

      const [updateUser] = await pool.query('SELECT * FROM user WHERE id = ?', [id])

      res.send({
         message: 'Usuario actualizado',
         state: 200,
         data: updateUser
      })
   } catch (error) {
      console.error(error)
      return res.status(500).send("Error al actualizar el usuario");
   }
}

const deleteUser = async (req, res) => {
   try {
      const [user] = await pool.query('DELETE FROM user WHERE id = ?', [req.params.id])
      console.log(user)
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
   createUser,
   updateUser,
   deleteUser
}

export default userController

//uso de put o patch
//patch actualiza parcialmente-. donde le podemos indicar que si alguna propiedad no tiene valor que mantenga el valor anterior o actual,

//put actualiza todo-. si la propiedad no tiene valor coloca null