const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSinsgleProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSinsgleProduct);

router.route("/admin/product/new").post(newProduct);

router.route("/admin/product/:id").put(updateProduct);

module.exports = router;
