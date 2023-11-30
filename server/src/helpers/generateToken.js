import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


const tokenSing = async (user) => {
   return jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '2h', }
   )
}

export default tokenSing