import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { configureGoogleStrategy } from './middleware/loginGoogle.js';
import { passport as passportConfig } from './middleware/passportConfig.js';

import user from './routes/user.js';
import authUser from './routes/authUser.js';
import authGoogle from './routes/authGoogle.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Sesiones con Passport
app.use(session({
   secret: 'cadena',
   resave: true,
   saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/user', user);
app.use('/api/auth', authUser);
app.use('/auth/google', authGoogle)
app.get('/success', (req, res) => {
   console.log('Usuario registrado con éxito');
   console.log(req.user);
   res.send('<h1>El usuario se ha logeado con éxito</h1>');
});

configureGoogleStrategy();

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

// Manejo de Endpoint no encontrado
app.use((req, res, next) => {
   res.status(404).send('<h1>ENDPOINT NOT FOUND</h1>');
});

export default app;


