const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSinsgleProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/product/new").post(newProduct);
router.route("/product/:id").get(getSinsgleProduct);

module.exports = router;
