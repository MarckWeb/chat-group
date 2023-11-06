import { Router } from 'express';

import userController from '../controllers/user.controller.js';
const { getUser, getUsers, createUser, updateUser, deleteUser } = userController
const user = Router()

user.route('/')
   .get(getUsers)
   .post(createUser)

user.route('/:id')
   .get(getUser)
   .put(updateUser)
   .delete(deleteUser)



export default user