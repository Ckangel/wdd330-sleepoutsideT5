<<<<<<< HEAD
import { getParam, loadHeaderFooter  } from './utils.mjs';
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

=======

import { getParam, loadHeaderFooter  } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
>>>>>>> origin/DAA--individual-3
const dataSource = new ProductData("tents");
const productId = getParam("product");

<<<<<<< HEAD
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) cartItems = [];

  // Check if product already exists in the cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.Id === product.Id,
  );

  if (existingItemIndex >= 0) {
    // Increase quantity if found
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new product with initial quantity
    cartItems.push({ ...product, quantity: 1 });
  }

  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

console.log(dataSource.findProductById(productId));

import products from "./tents.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = products.find((item) => item.Id === productId);

  if (product) {
    document.getElementById("product-title").innerText =
      `Sleep Outside | ${product.Name}`;
    document.getElementById("product-brand").innerText = product.Brand.Name;
    document.getElementById("product-name").innerText = product.Name;
    document.getElementById("product-image").src = product.Image;

    // Display price and discount information
    const originalPrice = parseFloat(product.ListPrice).toFixed(2);
    const discountedPrice = product.discountedPrice
      ? parseFloat(product.discountedPrice).toFixed(2)
      : originalPrice;
    const discountAmount = (originalPrice - discountedPrice).toFixed(2);

    document.getElementById("product-price").innerText = `$${originalPrice}`;
    document.getElementById("product-discounted-price").innerText =
      `$${discountedPrice}`;
    document.getElementById("product-discount-amount").innerText =
      `You save: $${discountAmount}`;

    document.getElementById("product-color").innerText =
      product.Colors[0].ColorName; // Assuming the first color is displayed
    document.getElementById("product-description").innerHTML =
      product.DescriptionHtmlSimple; // Use innerHTML for HTML content
    document.getElementById("addToCart").setAttribute("data-id", product.Id);
  } else {
    console.error("Product not found");
  }
});
=======
const product = new ProductDetails(productId, dataSource);
product.init();
>>>>>>> origin/DAA--individual-3
