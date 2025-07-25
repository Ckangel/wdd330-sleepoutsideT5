// Import reusable utility functions and modules
import { loadHeaderFooter, updateCartCount } from "./utils.mjs"; // Load common layout elements and update cart count
import ProductData from "./ProductData.mjs"; // Handles data fetching for product categories
import ProductList from "./ProductList.mjs"; // Handles rendering of product list to the DOM

// Load header and footer into the page
loadHeaderFooter();

// Update the cart item count (shown on the cart/backpack icon)
updateCartCount();

// Get the category name from the query parameter (e.g., ?category=tents)
const category =
  new URLSearchParams(window.location.search).get("category") || "tents";

// Select the DOM element where the product list will be displayed
const element = document.querySelector(".product-list");

// Create a data source instance with the selected category
const dataSource = new ProductData(); // Updated to not require category in constructor

// Create a ProductList instance
const productList = new ProductList(category, dataSource, element);

// Initialize the product list (fetches products and renders them)
productList.init();
