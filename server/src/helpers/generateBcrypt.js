import bcrypt from 'bcryptjs';

//funcion que encripta la contraseña
const encryptPassword = async (password) => {
   return await bcrypt.hash(password, 8);

}

//funcion que compra la contraseña plana y la encriptada
const comparePassword = async (password, passwordHash) => {
   return await bcrypt.compare(password, passwordHash);
}

export {
   encryptPassword,
   comparePassword
}

