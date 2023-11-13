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
      console.log(req.body)

      //verificamos que no exita un canal con el mismo nombre
      const [membersVeriry] = await pool.execute('SELECT * FROM members WHERE user_id=?', [userId])

      console.log(membersVeriry)

      if (membersVeriry[0]) {
         return res.send('el nombre del canal ya existe')
      }

      const [resultMembers] = await pool.execute('INSERT INTO members ( user_id, channel_id) VALUES ( ?, ?)', [userId, channelId]);
      console.log('canal resulatdo')
      console.log(resultMembers)

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

const membersController = {
   getMembers,
   createMember
}

export default membersController 