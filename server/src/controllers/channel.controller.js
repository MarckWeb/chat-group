import pool from '../db/connection.js';


//GET
const getChannels = async (req, res) => {
   try {
      const [channels] = await pool.query('SELECT * FROM channel')
      res.send(channels)
   } catch (e) {
      console.error(e);
      return res.status(500).send("Error al obtener a todos los usuarios");
   }
}

const createChannel = async (req, res) => {
   try {
      const { name, description, creator_id } = req.body
      console.log(req.body)

      //verificamos que no exita un canal con el mismo nombre
      const [channelVeriry] = await pool.execute('SELECT * FROM channel WHERE name=?', [name])

      console.log(channelVeriry)

      if (channelVeriry[0]) {
         return res.send('el nombre del canal ya existe')
      }

      const [resultChannel] = await pool.execute('INSERT INTO channel ( name, description, creator_id) VALUES (?, ?, ?)', [name, description, creator_id]);
      console.log('canal resulatdo')
      console.log(resultChannel)

      if (resultChannel.affectedRows > 0) {
         return res.status(200).send({
            status: 200,
            ok: true,
            message: 'Canal registrado correctamente'
         });

      } else {
         res.send({
            message: 'error al crear un nuevo canal',
            state: 404,
         })
      }


   } catch (e) {
      console.error(e)
      return res.status(500).send("Error al crear el canal en catch");
   }
}

const channelController = {
   getChannels,
   createChannel
}

export default channelController 