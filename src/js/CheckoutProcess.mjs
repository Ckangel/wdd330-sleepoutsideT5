import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();
updateCartCount();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  myCheckout.calculateOrderTotal();
});

// Optional: Form validation
document.querySelector("#checkout-form").addEventListener("submit", function (e) {
  if (!this.checkValidity()) {
    e.preventDefault();
    alert("Please fill out all fields.");
  } else {
    alert("Order placed successfully!");
    localStorage.removeItem("so-cart");
  }
});
