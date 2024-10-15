import cart from '../model/cart.model.js'

// get the cart item from the user
export async function getcartitem(req, res) {
  try {
    // find the cart items by user id 
    const cartitems = await cart.find({ userId: req.user });
    res.status(200).json(cartitems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// function for add item to the cart
export async function createcartitem(req, res) {
  const { productId, quantity } = req.body;

  // if product id or quantity is missing 
  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    // Check if the product is already in the cart 
    const existingCartItem = await cart.findOne({ productId, userId: req.user });

    if (existingCartItem) {
      // If the product already exists, increase the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    } else {
      // If the product doesn't exist, create a new cart item
      const newCartItem = new cart({ productId, quantity, userId: req.user });
      await newCartItem.save();
      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
}



// Update an existing cart item 
export async function updatecartitem(req, res) {
  try {
    // find the cart item by cart item id and user id and update it 
    const cartitem = await cart.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    // if cart item not exist 
    if (!cartitem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(cartitem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


// Delete a cart item 
export async function deletecartitem(req, res) {
  try {
    // find the cart item by cart item id and user id and delete it 
    const cartitem = await cart.findOneAndDelete({ _id: req.params.id, userId: req.user });
    // if cart item not exist 
    if (!cartitem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete all items in the cart
export async function clearCart(req, res) {
  try {
    // Remove all cart items belonging to the authenticated user
    const result = await cart.deleteMany({ userId: req.user });

    // Check if any items were deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No items found in the cart" });
    }

    res.status(200).json({ message: "All items removed from the cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
