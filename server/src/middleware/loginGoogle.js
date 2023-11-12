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
         console.log(profile)
         try {
            const [result] = await pool.execute('SELECT * FROM user WHERE email=?', [profile.emails[0].value]);
            console.log(result)
            //VERIFICAR QUE NO ESTA MOSTRANDO DATOS COMO DEBERIA SER SINO NUMEROS COMO GUARAD LA BASE DE DATOS
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

