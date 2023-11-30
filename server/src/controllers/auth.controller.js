import pool from '../db/connection.js';
import UserModel from '../models/user.js';
import { encryptPassword, comparePassword } from '../helpers/generateBcrypt.js';
import tokenSing from '../helpers/generateToken.js';


//funcion para login y verificar contraseña
const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body
      if (email === '') {
         return res.send({ mesaage: 'rellenar el campo de email valido' })
      }

      if (email && password) {
         //verificamos que exista un usuario con el email indicado
         const [userSelected] = await pool.query('SELECT * FROM user WHERE email=?', [email])

         if (userSelected.length === 0) {
            return res.status(401).send({
               status: 401,
               ok: false,
               message: 'El usuario con el email indicado no existe'
            })
         }

         //comparamos y contraseña y generamos token
         const passwordVerify = await comparePassword(password, userSelected[0].password)
         const tokenSession = await tokenSing(userSelected[0])

         if (passwordVerify) {
            res.status(200).send({
               status: 200,
               ok: true,
               message: 'Iniciar Sesion ',
               tokenSession
            })
            return
         }

         if (!passwordVerify) {
            res.status(409).send({
               status: 409,
               ok: false,
               message: 'Contraseña incorrecta'
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

//funcion que crea un usuario con contraseña encriptada
const createUser = async (req, res) => {
   try {
      const { id, name, lastname, email, password } = req.body

      if (email === '' && password === '' && name === '') {
         return res.status(500).send(
            {
               message: 'campos vacios',
               ok: false
            })
      }

      //verificamos que no exita un usuario con el mismo email
      const [userVerify] = await pool.execute('SELECT * FROM user WHERE email=?', [email])

      if (userVerify[0]) {

         return res.status(404).send({
            status: 404,
            ok: false,
            message: 'El correo ya se encuentra registrado con otro usuario'
         })
      }

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

         //insertamos el usuario a al base de datos
         const row = "INSERT INTO user (id, name, lastname, email, password) VALUES (?, ?, ?, ?, ?)";
         const values = [id, name, lastname, email, passwordHash];

         const result = await pool.execute(row, values);
         // console.log(result[0].affectedRows)
         if (result[0].affectedRows > 0) {
            return res.status(200).send({
               status: 200,
               ok: true,
               message: 'Usuario registrado correctamente'
            });

         } else {
            res.send({
               message: 'error al guardar el dato del usuario',
               state: 404,
            })
         }
      }

   } catch (e) {
      console.error(e)
      return res.status(500).send("Error al crear el usuario");
   }
}



export {
   createUser,
   loginUser
}