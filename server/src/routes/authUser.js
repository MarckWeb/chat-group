import { Router } from 'express';
import { createUser, loginUser } from '../controllers/auth.controller.js';

const authuser = Router();

authuser.route('/register')
   .post(createUser);

authuser.route('/login')
   .post(loginUser);



export default authuser