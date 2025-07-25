// Import modules for fetching product data, rendering the product list,
// and loading shared header/footer components and cart counter.
import ProductData from "./ProductData.mjs"; // Handles fetching product data from the API
import ProductList from "./ProductList.mjs"; // Manages rendering product cards into the DOM
import { loadHeaderFooter, updateCartCount } from "./utils.mjs"; // Reusable layout and utility functions

// Inject the header and footer templates into the page
loadHeaderFooter();

// Update the cart icon to show the current number of items (superscript count)
updateCartCount();

// Get the category from the URL query string (e.g., ?category=tents)
// If not specified, default to "tents"
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

// Select the <ul> element that will hold the product cards
const element = document.querySelector(".product-list");

// Create an instance of ProductData with the selected category
const dataSource = new ProductData(category);

// Create a new ProductList instance with category, data source, and container element
const productList = new ProductList(category, dataSource, element);

// Initialize the product list by fetching data and rendering products
productList.init();
