import passport from 'passport';

const googleAuthController = {
   googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

   googleCallback: passport.authenticate('google', { failureRedirect: '/error' }),

   successRedirect: (req, res) => {
      res.redirect('http://localhost:5173/home');
   },
};

export default googleAuthController;