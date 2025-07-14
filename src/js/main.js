// Import the necessary modules
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create an instance of ProductData for the "tents" category
const dataSource = new ProductData("tents");

// Select the element in the DOM where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList with category, data source, and target element
const productList = new ProductList("tents", dataSource, listElement);

// Initialize the product list rendering
productList.init();
