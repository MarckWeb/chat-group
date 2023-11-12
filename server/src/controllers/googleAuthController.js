import passport from 'passport';

const googleAuthController = {
   googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

   googleCallback: passport.authenticate('google', { failureRedirect: '/error' }),

   successRedirect: (req, res) => {
      console.log('Callback de Google - Redirigiendo a /success');
      res.redirect('/success');
   },
};

export default googleAuthController;