import express from 'express';
import cors from 'cors';
import user from './routes/user.js'
import authuser from './routes/authUser.js';

const app = express()



//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static('public'));

//routes
app.use('/api/user', user);
app.use('/api/user', authuser)


//not found-. si no exite ninguna de las rutas

app.use((req, res, next) => {
   res.status(404).send('<h1>ENDPOINT NOT FOUND</h1>')
})

export default app;