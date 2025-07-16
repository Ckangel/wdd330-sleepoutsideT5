import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.js";
const productData = new ProductData("products");
const productList = new ProductList(
  "products",
  productData,
  document.getElementById("product-list"),
);
