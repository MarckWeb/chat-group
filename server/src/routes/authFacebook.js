import { Router } from 'express';
import passport from '../middleware/passportConfig.js';

const authFacebook = Router();

authFacebook.route('/')
   .post(passport.authenticate('facebook-token'), (req, res) => {
      // Manejar la respuesta después de la autenticación con Facebook
      res.json(req.user);
   });

export default authFacebook;