import bcrypt from 'bcryptjs';

//funcion que encripta la contraseña
const encryptPassword = async (password) => {
   try {
      const passwordEncrypt = await bcrypt.hash(password, 8);
      return passwordEncrypt
   } catch (error) {
      console.error('Error al encriptar la contraseña:', error)
   }
}

//funcion que compra la contraseña plana y la encriptada
const comparePassword = async (password, passwordHash) => {
   try {
      return await bcrypt.compare(password, passwordHash);
   } catch (error) {
      console.error('Error al comparar contraseñas:', error)
      throw error
   }
}

export {
   encryptPassword,
   comparePassword
}

