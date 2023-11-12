import passport from 'passport';
import pool from '../db/connection.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config.js'

const configureGoogleStrategy = () => {
   passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      state: true
   },
      async (accessToken, refreshToken, profile, cb) => {
         try {
            const [result] = await pool.execute('SELECT * FROM user WHERE email=?', [profile.emails[0].value]);

            if (result.length > 0) {
               console.log('Usuario encontrado en la base de datos:', result);
               return cb(null, result[0]);
            } else {
               // Usuario no encontrado, realizar la inserción
               const row = "INSERT INTO user (id, name, lastname, username, email) VALUES (?, ?, ?, ?, ?)";
               const userId = profile.id;
               const name = profile.name.givenName;
               const email = profile.emails[0].value;
               const lastname = '';
               const username = '';

               const values = [userId, name, lastname, username, email];

               const [insertResults] = await pool.execute(row, values);
               console.log('Usuario insertado en la base de datos:', insertResults);

               return cb(null, insertResults);
            }
         } catch (err) {
            console.error('Error en la estrategia de Google:', err);
            return cb(err, null);
         }
      }));
};

export { configureGoogleStrategy };




//informacion que nesecitamos, pasar del objeto a un dato pequeño id
// passport.serializeUser((user, done) => {
//    console.log('estoy en e serial', user.id)
//    done(null, user.id);
// });

//Passport utiliza el ID del usuario guardado en la sesión para llamar a deserializeUser. Si todo está configurado correctamente, deserializeUser recibirá el ID del usuario,
// passport.deserializeUser((id, done) => {
//    console.log(id)
//    // Busca en la base de datos usando el ID del usuario
//    pool.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
//       if (err) {
//          console.error('Error al buscar usuario en la base de datos:', err);
//          return done(err, null);
//       }

//       // Si el usuario existe, carga el usuario en req.user
//       if (results.length > 0) {
//          const user = results[0];
//          console.log('Usuario encontrado en la base de datos:', user);
//          return done(null, user);
//       } else {
//          // Si el usuario no existe, puedes manejarlo según tus necesidades
//          return done(null, null);
//       }
//    });
// });

//El término done es una convención utilizada en las funciones de Passport para indicar que la operación ha sido completada, y se utiliza como una función de devolución de llamada. La palabra "done" en inglés significa "hecho" o "completado", y en este contexto se refiere al final de la operación.

//PROBLAMAS SOLO SALE ID NO GUARDA DATO


