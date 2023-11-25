import passport from 'passport';
import tokenSing from '../helpers/generateToken.js';

const googleAuthController = {
   googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),
   googleCallback: passport.authenticate('google', { failureRedirect: '/error' }),

   successRedirect: async (req, res) => {
      const user = req.user;

      const token = await tokenSing(user);
      res.cookie('token', token);
      res.redirect('http://localhost:5173/home');
   },
};

export default googleAuthController;