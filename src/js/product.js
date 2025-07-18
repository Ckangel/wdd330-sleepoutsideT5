import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) cartItems = [];

  // Check if the product already exists in the cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.Id === product.Id,
  );

  if (existingItemIndex >= 0) {
    // Increase quantity if found
    cartItems[existingItemIndex].Quantity += 1;
  } else {
    // Add new product with initial quauntity
    cartItems.push({ ...product, Quantity: 1 });
  }

  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
