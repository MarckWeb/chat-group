import { Router } from 'express';

import channelController from '../controllers/channel.controller.js';
const { getChannels, createChannel, deleteChannel } = channelController
const channel = Router()

channel.route('/')
   .get(getChannels)
   .post(createChannel)

channel.route('/:id')
   .delete(deleteChannel)





export default channel