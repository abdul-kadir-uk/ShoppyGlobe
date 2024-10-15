import { Router } from "express";
import { getlogin } from "../controller/auth.controller.js";

const router = Router();

// login the user 
router.post('/', getlogin);

export default router;