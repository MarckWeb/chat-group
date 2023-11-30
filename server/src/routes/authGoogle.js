import { Router } from 'express';
import googleAuthController from '../controllers/googleAuthController.js';

const authGoogle = Router();

authGoogle.route('/')
   .get(googleAuthController.googleLogin)

authGoogle.route('/callback')
   .get(googleAuthController.googleCallback, googleAuthController.successRedirect)


export default authGoogle
