class UserModel {
   constructor({ name, lastname, username, email, password }) {
      this.name = name;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.password = password;
   }

   // Método para validar los datos antes de la inserción en la base de datos
   validate() {
      const errors = [];

      if (!this.name || !this.lastname || !this.username || !this.email || !this.password) {
         errors.push('Faltan campos obligatorios');
      }

      // Agrega otras validaciones según tus requerimientos, como la validación de direcciones de correo electrónico

      return errors.length === 0 ? null : errors;
   }
}

export default UserModel