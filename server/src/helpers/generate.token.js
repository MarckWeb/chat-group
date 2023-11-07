import jwt from 'jsonwebtoken';



const tokenSing = async (user) => {
   return jwt.sign({
      _id: user._id,
   },

      //process.env.JWT_SECRET,
      'secret_key',
      {
         //tiempo de expiracion del token
         expideIn: '2h'
      }
   )
}