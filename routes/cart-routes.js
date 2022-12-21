const express = require("express");

const { checkOutHandler } = require("../controllers/cart-controllers");
const router = express.Router();

router.post("/checkout", checkOutHandler);

module.exports = router;
