import { Router } from "express";
import membersController from "../controllers/members.controller.js";
const { getMembers, createMember } = membersController

const members = Router();

members.route('/')
   .get(getMembers)
   .post(createMember)

export default members