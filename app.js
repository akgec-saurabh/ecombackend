const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth-routes");
const cartRoutes = require("./routes/cart-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users/auth", authRoutes);

app.use("/api/users", cartRoutes);

app.use((req, res, next) => {
  const error = new Error("This route could not be found");
  error.code = 404;
  throw error;
});

app.use((error, req, res, next) => {
  res
    .status(500)
    .json({ message: error.message || "some unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://iamsk:iamsk@cluster0.miuzlyq.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connected ");
    app.listen("5000");
  })
  .catch(() => {
    console.log("DB Connection failed");
  });
