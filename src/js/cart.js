import { getLocalStorage, setLocalStorage, loadHeaderFooter, updateCartCount} from "./utils.mjs";

loadHeaderFooter();
updateCartCount(); 

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-footer-container").innerHTML = "";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveEventListeners();
  addQuantityChangeListeners();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    
    <div class="cart-card__quantity-group">
      <label for="qty-${item.Id}">Qty:</label>
      <input type="number" id="qty-${item.Id}" class="cart-qty-input" data-id="${item.Id}" min="1" value="${item.quantity || 1}" />
    </div>

    <p class="cart-card__price">$${item.FinalPrice}</p>
    <div class="remove-button-container">
      <button class="remove-button" data-id="${item.Id}">Remove</button>
    </div>
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

function addQuantityChangeListeners() {
  document.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = e.target.dataset.id;
      let newQty = parseInt(e.target.value);

      if (isNaN(newQty) || newQty < 1) {
        newQty = 1;
        e.target.value = 1;
      }

      updateItemQuantity(productId, newQty);
    });
  });
}

function updateItemQuantity(productId, newQty) {
  const cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex((item) => item.Id === productId);

  if (index !== -1) {
    cartItems[index].quantity = newQty;
    setLocalStorage("so-cart", cartItems);
    renderCartContents(); // rerender to reflect quantity
    displayCartTotal();   // update total
  }
}

function displayCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const container = document.getElementById("cart-footer-container");
  container.innerHTML = "";

  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice) * (item.quantity || 1),
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
