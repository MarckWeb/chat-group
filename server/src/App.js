import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import pool from './db/connection.js';

import { configureGoogleStrategy } from './middleware/loginGoogle.js';

import user from './routes/user.js';
import authUser from './routes/authUser.js';

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

app.get('/success', (req, res) => {
   console.log('Usuario registrado con éxito');
   console.log(req.body);
   res.send('<h1>El usuario se ha logeado con éxito</h1>');
});

app.get('/error', (req, res) => res.send("Error logging in"));

passport.serializeUser((user, cb) => {
   console.log('En serializer', user);
   cb(null, user);
});

passport.deserializeUser((user, cb) => {
   console.log('En deserializer', user);
   pool.execute('SELECT * FROM user WHERE id = ?', [user.id], (err, results) => {
      console.log('En deserializer - Resultados:', results);
      return cb(null, results);
   });
});

configureGoogleStrategy();

// Rutas para la autenticación con Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
   passport.authenticate('google', { failureRedirect: '/error' }),
   (req, res) => {
      console.log('Callback de Google - Redirigiendo a /success');
      res.redirect('/success');
   }
);

// Manejo de Endpoint no encontrado
app.use((req, res, next) => {
   res.status(404).send('<h1>ENDPOINT NOT FOUND</h1>');
});

export default app;


