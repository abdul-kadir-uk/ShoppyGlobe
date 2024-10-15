import { Router } from "express";
import { createcartitem, updatecartitem, deletecartitem, getcartitem, clearCart } from "../controller/cart.controller.js";

const router = Router();
// get the cart items 
router.get('/', getcartitem);
// create cart item 
router.post('/', createcartitem);
// update cart item 
router.put('/:id', updatecartitem);
// delete cart item 
router.delete('/:id', deletecartitem);
// delete all cart item
router.delete('/', clearCart);

export default router;