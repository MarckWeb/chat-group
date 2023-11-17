import passport from 'passport';
import tokenSing from '../helpers/generateToken.js';

const googleAuthController = {
   googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

   googleCallback: passport.authenticate('google', { failureRedirect: '/error' }),

   successRedirect: async (req, res) => {

      const user = req.user;

      // Crear un token JWT con la información del usuario y firma robusta
      const token = await tokenSing(user);
      console.log(token)

      // Enviar el token al frontend en una cookie segura y httpOnly
      res.cookie('token', token);

      // Redirigir al cliente a la ruta deseada
      res.redirect('http://localhost:5173/home');
   },
};

export default googleAuthController;