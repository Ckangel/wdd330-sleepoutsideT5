// Import utility functions and modules
import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
// getParam: extracts query parameters from the URL
// loadHeaderFooter: injects the site header and footer
// updateCartCount: updates the cart icon with number of items

import ProductData from "./ProductData.mjs";
// ProductData handles fetching product data from the API

import ProductDetails from "./ProductDetails.mjs";
// ProductDetails is the class responsible for rendering a single product’s details

// Load header and footer on the page
loadHeaderFooter();

// Update the cart icon with the current item count
updateCartCount();

// Extract the product ID from the URL query string (?product=880RR)
const productId = getParam("product");

// Create a new instance of the data source (category passed is 'tents' by default)
const dataSource = new ProductData("tents");

// Create an instance of the ProductDetails class with the productId and data source
const product = new ProductDetails(productId, dataSource);

// Initialize the product detail page (fetch data and render to page)
product.init();
