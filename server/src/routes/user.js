import { Router } from 'express';

import userController from '../controllers/user.controller.js';
const { getUser, getUsers, updateUser, deleteUser } = userController
const user = Router()

user.route('/')
   .get(getUsers)

user.route('/:id')
   .get(getUser)
   .put(updateUser)
   .delete(deleteUser)



export default user