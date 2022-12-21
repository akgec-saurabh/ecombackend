const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

const signUp = async (req, res, next) => {
  const { email, name, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new Error("Some Error occured");
    error.code = 500;
    return next(error);
  }
  if (existingUser) {
    const error = new Error("User Exists Already");
    error.code = 500;
    return next(error);
  }

  //Encrypting Password
  const hashPassword = CryptoJS.AES.encrypt(
    password,
    "secret key 123"
  ).toString();

  const createdUser = new User({
    email,
    password: hashPassword,
    name,
  });

  const createCart = new Cart({
    userId: createdUser.id,
    products: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  try {
    await createCart.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  const token = jwt.sign({ userId: createdUser.id, email }, "secret", {
    expiresIn: "1h",
  });

  res.json({ userId: createdUser.id, email, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new Error("Some Error occured");
    error.code = 500;
    return next(error);
  }
  if (!existingUser) {
    const error = new Error("Invalid Credentials");
    error.code = 500;
    return next(error);
  }
  const bytes = CryptoJS.AES.decrypt(existingUser.password, "secret key 123");
  const orignalPassword = bytes.toString(CryptoJS.enc.Utf8);

  if (!existingUser || orignalPassword !== password) {
    const error = new Error("Invalid Credentials");
    error.code = 500;
    return next(error);
  }
  const token = jwt.sign({ userId: existingUser.id, email }, "secret", {
    expiresIn: "1h",
  });
  res.json({ userId: existingUser.id, email, token });
};

exports.signUp = signUp;
exports.login = login;
