import Router from 'express'
import { getproducts, getproductbyid } from '../controller/product.controller.js'

const router = Router();

// get all the products 
router.get('/', getproducts);
// get product by id 
router.get('/:id', getproductbyid);

export default router;