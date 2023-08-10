import checkout from "../models/checkout.js";

export const allOrder = async (req, res) => {
  const email = req.user.email;
  try {
    const all = await checkout.findOne({ email: email });
    if (!all)
      return res
        .status(400)
        .json({ meassage: "You never ordered from this site" });
    res.status(201).json(all);
  } catch (err) {
    return res.status(400).json({ meassage: err.meassage });
  }
};

export const addCart = async (req, res) => {
  const email = req.user.email;
  try {
    const check = await checkout.findOneAndUpdate(
      { email: email },
      { $setOnInsert: { order: [] } },
      { upsert: true, new: true }
    );
    check.order.push(req.body);
    let checkItems = await check.save();
    res.status(201).json(checkItems);
  } catch (err) {
    return res.status(400).json({ meassage: err.meassage });
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const email = req.user.email;
  try {
    // Update the document that matches the email and remove the order element that matches the orderId
    const result = await checkout.updateOne(
      { email: email },
      { $pull: { order: { _id: orderId } } }
    );

    // Check if the update was successful
    if (result)return res.status(201).json({message : " deleted successfully"});
      // Return an error message if no document was updated
      return res.status(400).json({message : "id not found/ not deleted"});
    
  } catch (err) {
    // Return an error message if something goes wrong
    return `An error occurred: ${err.message}`;
  }
};

export const deleteCheckout = async(req, res) => {
  const email = req.user.email;
  try{
    const check = await checkout.findOneAndDelete({email : email});
    if(!check) return res.status(400).json({message : "id not found/ not deleted"});
    return res.status(201).json({message : " deleted successfully"});
  }catch(err){
    return res.status(400).json({ meassage: err.meassage });
  }
}
