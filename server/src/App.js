import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { configureGoogleStrategy } from './middleware/loginGoogle.js';
import user from './routes/user.js';
import authUser from './routes/authUser.js';
import authGoogle from './routes/authGoogle.js';
import channel from './routes/channel.js';

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

app.use(passport.initialize(), passport.session());

// Rutas
app.use('/api/user', user);
app.use('/api/auth', authUser);
app.use('/auth/google', authGoogle)
//app.use('/auth/facebook', authFacebook);
app.get('/success', (req, res) => {
   res.send('<h1>El usuario se ha logeado con éxito</h1>');
});
app.use('/api/channel', channel);

// Configurar la estrategia de autenticación con Google
configureGoogleStrategy();
//configureFacebookStrategy(); //vendra de facebook strategy

// Manejo de Endpoint no encontrado
app.use((req, res) => {
   res.status(404).send('<h1>ENDPOINT NOT FOUND</h1>');
});

export default app;


