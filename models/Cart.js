const mongoose = require("mongoose");

const schema = mongoose.Schema;

const CartSchema = new schema(
  {
    userId: {
      type: String,
      // type: mongoose.Types.ObjectId,
      // ref: "User",
    },

    products: [
      {
        producId: String,
        image: String,
        size: String,
        brand: String,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
  },
  { versionKey: false }
  // { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
