const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: [],
  },
  { versionKey: false }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
