import jwt from 'jsonwebtoken';


const tokenSing = async (user) => {
   return jwt.sign({
      id: user.id,
   },
      //process.env.JWT_SECRET,
      'secret_key',
      {
         //tiempo de expiracion del token
         expiresIn: '2h',
      }
   )
}

export default tokenSing