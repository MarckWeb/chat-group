import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import { configureGoogleStrategy } from './middleware/loginGoogle.js';
import user from './routes/user.js';
import authUser from './routes/authUser.js';
import authGoogle from './routes/authGoogle.js';
import channel from './routes/channel.js';
import members from './routes/members.js';
import comments from './routes/coments.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
//guardar imagen directo a cloudinary
app.use(fileUpload({
   useTempFiles: true,
   tempFileDir: '/tmp/'
}))

app.use(passport.initialize(), passport.session());


// Ruta para el cliente React con Vite
// Hacer que node sirva los archivos de nuestro app React
//app.use(express.static(join(__dirname, '..', '..', 'client/dist')));

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
// app.get('*', (req, res) => {
//    res.sendFile(join(__dirname, 'http://localhost:5173/', 'index.html'));
// });
// Rutas
app.use('/api/user', user);
app.use('/api/auth', authUser);
app.use('/auth/google', authGoogle)
//app.use('/auth/facebook', authFacebook);

app.use('/api/channel', channel);
app.use('/api/members', members);
app.use('/api/comments', comments)

// Configurar la estrategia de autenticación con Google
configureGoogleStrategy();
//configureFacebookStrategy(); //vendra de facebook strategy

// Manejo de Endpoint no encontrado
app.use((req, res) => {
   res.status(404).send('<h1>ENDPOINT NOT FOUND</h1>');
});

export default app;


