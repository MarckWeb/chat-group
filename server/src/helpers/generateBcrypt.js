import bcrypt from 'bcryptjs';

//funcion que encripta la contraseña
const encryptPassword = async (password) => {
   const passwordEncrypt = await bcrypt.hash(password, 8);
   return passwordEncrypt

}

//funcion que compra la contraseña plana y la encriptada
const comparePassword = async (password, passwordHash) => {
   const statusPassword = await bcrypt.compare(password, passwordHash);
   return statusPassword
}

export {
   encryptPassword,
   comparePassword
}

