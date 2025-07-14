import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}


function displayCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length > 0) {
    const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);

    const template = document.getElementById("cart-footer-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".cart-total-value").textContent = total.toFixed(2);

    document.getElementById("cart-footer-container").appendChild(clone);
  }
}

window.addEventListener("load", () => {
  // Load and display cart items here...
  displayCartTotal();
});

renderCartContents();
