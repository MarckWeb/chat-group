import passport from 'passport';
import pool from '../db/connection.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookTokenStrategy } from 'passport-facebook-token';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_CALLBACK } from '../config.js'

// Configuración de la estrategia de Google para Passport
const configureGoogleStrategy = () => {
   passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CLIENT_CALLBACK,
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
               const profileImage = profile.photos[0].value;

               // Insertar el nuevo usuario en la base de datos
               const [insertResults] = await pool.query('INSERT INTO user (id, name,lastname, email, image) VALUES (?, ?, ?, ?, ?)', [userId, name, lastname, email, profileImage]);

               // Crear un objeto con la información del nuevo usuario
               const newUser = {
                  id: insertResults.insertId,
                  name: name,
                  lastname: lastname,
                  email: email,
                  image: profileImage
               };

               return cb(null, newUser);
            }
         } catch (err) {
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

passport.serializeUser((user, cb) => {
   cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
   try {
      // Buscar al usuario en la base de datos por su ID
      const [result] = await pool.execute('SELECT * FROM user WHERE id = ?', [user.id])

      // Si el usuario se encuentra, retornar el usuario
      if (result.length > 0) {
         return cb(null, result[0]);
      }
   } catch (error) {
      console.log(error)
   }
});

export { configureGoogleStrategy };

