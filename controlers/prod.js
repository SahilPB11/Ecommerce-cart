import product from "../models/product-model.js";

// getting all products
export const getAllProducts = async (req, res) => {
  let items;
  try {
    items = await product.find();
  } catch (e) {
    console.log(e);
  }
  if (!items)
    return res.status(400).json({ message: "list is empty properly" });
  res.status(200).json({ items });
};

// here we are making new product
export const additems = async (req, res) => {
  const { imagePath, title, description, price } = req.body;
  let item;
  try {
    item = product.create({ imagePath, title, description, price });
    (await item).save;
  } catch (e) {
    console.log(e);
  }
  if (!item) return res.status(400).json({ message: "list is empty properly" });
  res.status(200).json({ item });
};

// access the product with the help of id
export const getOne = async (req, res) => {
  let item;
  try {
    item = await product.findById(req.params.id);
  } catch (e) {
    console.log(e);
  }
  if (!item) return res.status(400).json({ message: "list is empty properly" });
  res.status(200).json({ item });
};

// updating the product
export const updateOne = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const item = await product.findByIdAndUpdate(id, update, { new: true });
    return res.status(200).json({ success: true, data: item });
  } catch (e) {
    res.status(500).json({ success: false, message: err.message });
  };
};

// here we are deleting the product
export const deleteOne = async (req, res) => {
  let item;
  try {
    item = await product.findByIdAndDelete(req.params.id);
  } catch (e) {
    console.log(e);
  }
  if (item) return res.status(400).json({ message: "Not deleted" });
  res.status(200).json({ message: "deleted Properly" });
};
