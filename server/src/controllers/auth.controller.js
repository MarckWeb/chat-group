import pool from '../db/connection.js';
import UserModel from '../models/user.js';
import { v4 as uuid } from 'uuid';
import { encryptPassword, comparePassword } from '../helpers/generateBcrypt.js';
import tokenSing from '../helpers/generateToken.js';

//funcion que crea un usuario con contraseña encriptada
const createUser = async (req, res) => {
   try {
      const { name, lastname, username, email, password } = req.body

      //comparamos que los datos cumplan con los requisitos del modelo
      const user = new UserModel(req.body)
      const validationErrors = user.validate();
      if (validationErrors) {
         res.send({
            message: 'error de validacio',
            error: validationErrors
         })
      } else {
         //generamos la contraseña encriptada
         const passwordHash = await encryptPassword(password);

         const row = "INSERT INTO user (id, name, lastname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)";
         const userId = uuid(); // Genera un nuevo UUID
         const values = [userId, name, lastname, username, email, passwordHash];

         const [result] = await pool.query(row, values);
         if (!result) {
            res.send({
               message: 'error al guardar el dato del usuario',
               state: 404,
            })
         }
         return res.status(200).send({
            status: 200,
            ok: true,
            message: 'Usuario registrado correctamente'
         });
      }

   } catch (e) {
      console.error(e)
      return res.status(500).send("Error al crear el usuario");
   }
}

const loginUser = async (req, res) => {
   try {
      console.log(req.body)
      const { email, password } = req.body
      if (email && password) {

         const [userSelected] = await pool.query('SELECT * FROM user WHERE email=?', [email])
         console.log(userSelected)

         if (userSelected.length === 0) {
            return res.status(401).send({
               status: 401,
               ok: false,
               message: 'El usuario con el email indicado no existe'
            })
         }

         console.log(userSelected[0].password)
         console.log(password)
         const passwordVerify = await comparePassword(password, userSelected[0].password)
         const tokenSession = await tokenSing(userSelected[0])
         console.log('el resultado de las contrseñas')
         console.log(passwordVerify)
         if (!passwordVerify) {
            res.status(409).send({
               status: 409,
               ok: false,
               message: 'contraseña incorrecta'
            })
         } else {
            res.status(200).send({
               status: 200,
               ok: true,
               message: 'contraseña correcta',
               tokenSession
            })
         }

      } else {
         return res.status(404).send({
            message: 'error hay campos vacios existentes'
         })
      }

   } catch (error) {
      console.error(error)
   }
}

export {
   createUser,
   loginUser
}