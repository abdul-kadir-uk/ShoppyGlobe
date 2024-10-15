import { Router } from "express";
import { getregister } from "../controller/auth.controller.js";

const router = Router();
//  register the user 
router.post('/', getregister);

export default router;