import bcrypt from 'bcrypt';

//funcion que encripta la contraseña
const encryptPassword = async (password) => {
   const passwordHash = await bcrypt.hash(password, 8)
   return passwordHash
}


//funcion que compra la contraseña plana y la encriptada
const comparePassword = async (password, passwordHash) => {
   const passwordCompare = await bcrypt.compare(password, passwordHash)

   return passwordCompare
}


export default {
   encryptPassword,
   comparePassword
}