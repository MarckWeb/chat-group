import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
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
import commentsImages from './routes/imageComment.js'

const app = express();

// Obtener la ruta del directorio actual del archivo
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Configurar middleware para servir archivos estáticos desde la carpeta "client"
// const clientPath = join(__dirname, '..', '..', 'client');
// console.log(clientPath)
// const indexPath = join(clientPath, 'index.html');
// console.log(indexPath)
// app.use(express.static(indexPath));

// // Enviar todas las demás solicitudes a tu aplicación de React
// app.get('*', (req, res) => {
//    res.setHeader('Content-Type', 'text/html');
//    res.sendFile(indexPath);
// });

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



// Rutas
app.use('/api/user', user);
app.use('/api/auth', authUser);
app.use('/auth/google', authGoogle)
//app.use('/auth/facebook', authFacebook);
app.use('/api/channel', channel);
app.use('/api/members', members);
app.use('/api/comments', comments)
app.use('/api/comments/image', commentsImages)

// Configurar la estrategia de autenticación con Google
configureGoogleStrategy();
//configureFacebookStrategy(); //vendra de facebook strategy

// Manejo de Endpoint no encontrado
app.use((req, res) => {
   res.status(404).send('<h1>ENDPOINT NOT FOUND</h1>');
});

export default app;


