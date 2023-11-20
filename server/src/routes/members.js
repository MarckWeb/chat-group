import { Router } from "express";
import membersController from "../controllers/members.controller.js";
const { getMembers, createMember, deleteMembers } = membersController

const members = Router();

members.route('/')
   .get(getMembers)
   .post(createMember)

members.route('/:id')
   .delete(deleteMembers)

export default members