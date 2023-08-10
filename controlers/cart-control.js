import { json } from "express";
import cart from "../models/cart.js";
import product from "../models/product-model.js";

export const getAllCartItems = async (req, res, next) => {
  id = req.user.email;
  try {
    item = await cart.find({ email: id });
  } catch (err) {
    console.log(err);
  }
  if (!item) return res.status(400).json({ message: "cart not found" });

  res.status(200).json({ item });
};

// define a route to get the cart for a given email
export const getCart = async (req, res) => {
  const email = req.user.email;
  try {
    const Cart = await cart.findOne({ email: email });
    if (!cart) return res.status(404).json({ message: "cart ot found" });

    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// adda a product yo the cart
export const addProduct = async (req, res) => {
  const email = req.user.email;
  const productId = req.body.product_id;
  // find or create a cart by email
  try {
    const Cart = await cart.findOneAndUpdate(
      { email: email },
      { $setOnInsert: { list: [] } },
      { upsert: true, new: true }
    );

    // find the product by id from database
    const Product = await product.findById(productId);
    if (!Product) return res.status(404).json({ message: "Product not found" });

    let cartItem;
    if (!Cart.list.some((item) => item.product_id === productId)) {
      Cart.list.push(req.body);
      cartItem = await Cart.save();
    }
    res.json(cartItem);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

// here we are updating the the quantity
export const updateQuantity = async (req, res) => {
  const email = req.user.email;
  const productId = req.params.productId;
  const { quantity } = req.body;
  let cartItemsId;
  // first we fill fetch prodicIds from list
  try {
    const Cart = await cart
      .findOne({ email: email })
      .populate("list.product_id");

    if (!Cart) return res.status(404).json({ message: "Cart not found" });

    Cart.list.forEach((ele) => {
      if (ele.product_id === productId) {
        cartItemsId = ele._id;
      }
    });
    const cartQuantity = await cart.updateOne(
      { email: email },
      { $set: { "list.$[elem].quantity": quantity } },
      { arrayFilters: [{ "elem.product_id": productId }] },
      function (err, result) {
        if (err) return res.status(500).json({ message: err.message });
        console.log("Updated successfully");
        client.close();
      }
    );

    if (!cartQuantity)
      return res.status(404).json({ message: "Cart item not found" });

    res.status(202).json(cartQuantity);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

export const deleteproduct = async (req, res) => {
  const email = req.user.email;
  const productId = req.params.productId;
  // find or create a cart by email
  try {
    const Cart = await cart
      .findOne({ email: email })
      .populate("list.product_id");
    // If the cart does not exist, send an error response
    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the cart item from the cart list
    Cart.list = Cart.list.filter((item) => item.product_id !== productId);
    await Cart.save();
    // Send a success message as JSON response
    res.json({ message: "Cart item removed" });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

export const deletemanyProducts = async (req, res) => {
  const email = req.user.email;
  const productIds = req.body.productIds; // an array of product ids
  try {
    const Cart = await cart
      .findOne({ email: email })
      .populate("list.product_id");

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    Cart.list = Cart.list.filter((item) => !productIds.includes(item.product_id));
    const removed = await Cart.save();
    // Send a success message as JSON response
    res.status(200).json(removed);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};
