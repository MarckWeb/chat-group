import { Router } from 'express';

import channelController from '../controllers/channel.controller.js';
const { getChannels, createChannel } = channelController
const channel = Router()

channel.route('/')
   .get(getChannels)
   .post(createChannel)





export default channel