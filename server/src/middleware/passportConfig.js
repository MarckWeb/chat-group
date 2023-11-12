import passport from "passport";
import pool from "../db/connection.js";

passport.serializeUser((user, cb) => {
   console.log('En serializer', user);
   cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
   console.log('En deserializer', user);
   try {
      const [result] = await pool.execute('SELECT * FROM user WHERE id = ?', [user.id])
      if (result.length > 0) {
         console.log('el usuario se encuentra por enviar y logearse', result[0])
         return cb(null, result[0]);
      }
   } catch (error) {
      console.log(error)
   }
});

export { passport }