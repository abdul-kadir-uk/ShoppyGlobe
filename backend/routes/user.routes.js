import { Router } from "express";
import { updateUserDetails, UserDetails } from "./../controller/user.controller.js";

const router = Router();

// get the user details 
router.get('/', UserDetails);
// update the user details 
router.put('/', updateUserDetails);

export default router;