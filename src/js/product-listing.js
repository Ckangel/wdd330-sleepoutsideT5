// product-listing.js
import ProductData from "./ProductData.mjs"; // Adjust path as needed
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Get the category from the query string (e.g., ?category=tents)
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

// Create instances for rendering the product list
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
