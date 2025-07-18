import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = `<p class="empty-cart">🛒 Your cart is empty.</p>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}"/>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>

  <!-- Remove button -->
  <button class="remove-item" data-id="${item.Id}" style="color:red; background:none; border:none; font-weight:bold; cursor:pointer;">
     X
  </button>
</li>`;

  return newItem;
}

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      const itemName = this.closest("li").querySelector(".card__name").textContent;

      // Confirmation dialog before deleting
      const confirmDelete = confirm(`Are you sure you want to remove ${itemName} from the cart?`);
      
      if (confirmDelete) {
        removeFromCart(id);
      }
    });
  });
}
function removeFromCart(id) {
  let cart = getLocalStorage("so-cart");

  // Remove the item with the matching ID
  cart = cart.filter(item => item.Id != id);

  // Update localStorage
  localStorage.setItem("so-cart", JSON.stringify(cart));

  // Re-render cart items
  renderCartContents();
}