<<<<<<< HEAD
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
=======

import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

>>>>>>> origin/DAA--individual-3
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-footer-container").innerHTML = "";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveEventListeners(); // Add remove button listeners
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button" data-id="${item.Id}">Remove</button>
  </li>`;
}

function addRemoveEventListeners() {
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      removeItemFromCart(productId);
    });
  });
}

function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  displayCartTotal();
}

function displayCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const container = document.getElementById("cart-footer-container");
  container.innerHTML = ""; // clear previous

  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0
    );

    const template = document.getElementById("cart-footer-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".cart-total-value").textContent = total.toFixed(2);
    container.appendChild(clone);
  }
}

window.addEventListener("load", () => {
  renderCartContents();
  displayCartTotal();
});
