import passport from 'passport';
import tokenSing from '../helpers/generateToken.js';

const googleAuthController = {
   googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),
   googleCallback: passport.authenticate('google', { failureRedirect: '/error' }),

   successRedirect: async (req, res) => {
      const user = req.user;
      console.log('devolvera al redirect', user)
      const token = await tokenSing(user);
      res.cookie('token', token);
      res.redirect('https://front-gcdr.onrender.com');
   },
};

export default googleAuthController;