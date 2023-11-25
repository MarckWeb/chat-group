import pool from '../db/connection.js';


//GET
const getMembers = async (req, res) => {
   try {
      const [members] = await pool.query('SELECT * FROM members')
      res.send(members)
   } catch (e) {
      console.error(e);
      return res.status(500).send("Error al obtener a todos los miembros del canal");
   }
}

const createMember = async (req, res) => {
   try {
      const { userId, channelId } = req.body

      const [membersVeriry] = await pool.execute('SELECT * FROM members WHERE user_id=?', [userId])

      console.log('canal que se registrara', membersVeriry)
      const existingUser = membersVeriry
         .filter(member => member.user_id === userId)
         .filter(member => member.channel_id === channelId)

      if (existingUser.length > 0) {
         existingUser.forEach(element => {
            console.log(element.channel_id, element.user_id)
         });
         return console.log(`ya existe el usuario`)
      }


      const [resultMembers] = await pool.execute('INSERT INTO members ( user_id, channel_id) VALUES ( ?, ?)', [userId, channelId]);

      if (resultMembers.affectedRows > 0) {
         return res.status(200).send({
            status: 200,
            ok: true,
            message: 'un mimebro se registro correctamente'
         });

      } else {
         res.send({
            message: 'error al crear un nuevo miembro',
            state: 404,
         })
      }
   } catch (e) {
      console.error(e)
      return res.status(500).send("Error al crear el un mimebro");
   }
}

const deleteMembers = async (req, res) => {
   try {
      const [members] = await pool.query('DELETE FROM members WHERE id = ?', [req.params.id])

      if (members.affectedRows <= 0) return res.status(404).send({
         message: 'miembro del canal no encontrado',
         state: 404
      })
      res.send({
         message: 'miembro del canal elinado con exito'
      })
   } catch (error) {
      console.log(error)
      return res.status(500).send("Error al eliminar el miembro del canal");
   }
}

const membersController = {
   getMembers,
   createMember,
   deleteMembers
}

export default membersController 