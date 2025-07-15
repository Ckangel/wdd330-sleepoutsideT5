import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) cartItems = [];

  // Check if product already exists in the cart
  const existingItemIndex = cartItems.findIndex(item => item.Id === product.Id);

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

document.getElementById("addToCart").addEventListener("click", addToCartHandler);
