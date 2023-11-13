import passport from 'passport';
import pool from '../db/connection.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookTokenStrategy } from 'passport-facebook-token';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config.js'//importar facebbokk

// Configuración de la estrategia de Google para Passport
const configureGoogleStrategy = () => {
   passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      state: true
   },
      async (accessToken, refreshToken, profile, cb) => {
         try {
            // Buscar al usuario en la base de datos por su correo electrónico
            const [result] = await pool.execute('SELECT * FROM user WHERE email=?', [profile.emails[0].value]);

            // Si el usuario ya existe, retornar el usuario encontrado
            if (result.length > 0) {
               return cb(null, result[0]);
            } else {
               // Si el usuario no existe, crear un nuevo usuario con la información de Google
               const userId = profile.id;
               const name = profile.name.givenName;
               const email = profile.emails[0].value;
               const lastname = '';
               const username = '';

               // Insertar el nuevo usuario en la base de datos
               const [insertResults] = await pool.query('INSERT INTO user (id, name,lastname, username, email) VALUES (?, ?, ?,?,?)', [userId, name, lastname, username, email]);

               // Crear un objeto con la información del nuevo usuario
               const newUser = {
                  id: insertResults.insertId,
                  name: name,
                  lastname: lastname,
                  username: username,
                  email: email,
               };

               // Retornar el nuevo usuario creado
               return cb(null, newUser);
            }
         } catch (err) {
            // Manejar errores durante el proceso de autenticación con Google
            console.error('Error en la estrategia de Google:', err);
            return cb(err, null);
         }
      }));
};

// Estrategia genérica para la autenticación con Facebook
// const configureFacebookStrategy = () => {
//    passport.use(new FacebookTokenStrategy({
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//    },
//    // ... (mismo callback que tenías antes)
//    ));
// };

// Serializar al usuario para almacenar en la sesión
passport.serializeUser((user, cb) => {
   cb(null, user);
});

// Deserializar al usuario basado en la información de la sesión
passport.deserializeUser(async (user, cb) => {
   try {
      // Buscar al usuario en la base de datos por su ID
      const [result] = await pool.execute('SELECT * FROM user WHERE id = ?', [user.id])

      // Si el usuario se encuentra, retornar el usuario
      if (result.length > 0) {

         return cb(null, result[0]);
      }
   } catch (error) {
      // Manejar errores durante la deserialización del usuario
      console.log(error)
   }
});

// Exportar la función de configuración de la estrategia de Google
export { configureGoogleStrategy };

