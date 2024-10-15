import product from './../model/product.model.js'

// function for getting all products 
export async function getproducts(req, res) {
  try {
    // get all products from the database 
    const products = await product.find();
    res.status(200).json({
      products: products
    })
  } catch (error) {
    // internal server error if the products not load 
    res.status(500).json({
      message: error.message
    })
    console.log(error);
  }
}

// function to get the product by id
export async function getproductbyid(req, res) {
  try {
    // find the product from mongodb by its id 
    const productbyid = await product.findById(req.params.id);
    // if the product not found 
    if (!productbyid) {
      return res.status(404).json({
        message: "product not found"
      })
    }
    res.status(200).json({ product: productbyid })
  } catch (error) {
    // internal server error 
    res.status(500).json({
      message: error.message
    })
  }
}