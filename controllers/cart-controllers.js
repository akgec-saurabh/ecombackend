const Cart = require("../models/Cart");
const User = require("../models/User");
const mongoose = require("mongoose");

const checkOutHandler = async (req, res, next) => {
  const { userId, email, products } = req.body;
  console.log(
    "--------------------------- BODY ---------------------------------------"
  );
  // console.log(req.body);

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    const error = new Error("Some Error occured");
    error.code = 500;
    return next(error);
  }

  if (!existingUser) {
    const error = new Error("User Not Exits");
    error.code = 404;
    return next(error);
  }

  let existingUserCart;
  try {
    existingUserCart = await Cart.findOne({ email });
  } catch (err) {
    console.log(err);
    const error = new Error("Some Error occured");
    error.code = 500;
    return next(error);
  }

  if (!existingUserCart) {
    const error = new Error("Not able to Find Cart");
    error.code = 404;
    return next(error);
  }

  //   try {
  //     await existingUserCart.save();
  //   } catch (err) {
  //     console.log(err);
  //     const error = new Error("Could not Add to Cart");
  //     error.code = 500;
  //     return next(error);
  //   }
  console.log(
    "===================================================================================="
  );
  // console.log(existingUser, existingUserCart);

  // const temp = [...products];

  // for (let i of temp) {
  //   i.producId = i.id;
  //   delete i.id;
  // }

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    existingUser.products = [...products];

    await existingUser.save();

    // existingUser.products = [...temp];
    // delete existingUser.__v;

    // await existingUser.save();

    // await User.findOneAndUpdate(products, temp);
  } catch (err) {
    console.log(err);
    const error = new Error("Could not Add to Cart");
    error.code = 500;
    return next(error);
  }

  try {
    existingUserCart.products = [...products];
    //   // delete existingUserCart.__v;
    await existingUserCart.save();
  } catch (err) {
    console.log(err);
    const error = new Error("Could not Add to Cart");
    error.code = 500;
    return next(error);
  }

  res.status(201).json({ user: existingUser, cart: existingUserCart });
};

exports.checkOutHandler = checkOutHandler;
