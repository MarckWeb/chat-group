import bcrypt from 'bcrypt';

//funcion que encripta la contraseña
const encryptPassword = async (password) => {
   console.log(password)
   const passwordHash = await bcrypt.hash(password, 10)
   return passwordHash
}

//funcion que compra la contraseña plana y la encriptada
const comparePassword = async (password, passwordHash) => {
   return await bcrypt.compare(password, passwordHash)
}


export {
   encryptPassword,
   comparePassword
}