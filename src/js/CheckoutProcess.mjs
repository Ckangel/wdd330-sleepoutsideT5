import { getLocalStorage } from "./utils.mjs";

// Import the CheckoutProcess class
const checkout = new CheckoutProcess();
export default class CheckoutProcess {
  constructor(cartKey = "so-cart") {
    this.cartKey = cartKey;
    this.cartItems = getLocalStorage(this.cartKey) || [];
    this.subtotalElem = document.getElementById("subtotal");
    this.taxElem = document.getElementById("taxAmount");
    this.shippingElem = document.getElementById("shippingEstimate");
    this.totalElem = document.getElementById("totalAmount");
    this.itemListElem = document.getElementById("itemList");
    this.zipInput = document.getElementById("zip");
    this.discountElem = document.getElementById("discountAmount");
    this.discount = 0; // If you want to add discounts, set here

    // Display subtotal and items on load
    this.displaySubtotal();
    // Listen for zip code changes to update totals
    if (this.zipInput) {
      this.zipInput.addEventListener("change", () => this.displayOrderTotals());
    }
  }

  displaySubtotal() {
    let subtotal = 0;
    this.itemListElem.innerHTML = "";
    this.cartItems.forEach(item => {
      subtotal += Number(item.FinalPrice) || 0;
      const li = document.createElement("li");
      li.textContent = `${item.Name} - $${item.FinalPrice}`;
      this.itemListElem.appendChild(li);
    });
    this.subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    this.displayOrderTotals(subtotal);
  }

  displayOrderTotals(subtotal = null) {
    if (subtotal === null) {
      subtotal = this.cartItems.reduce((sum, item) => sum + (Number(item.FinalPrice) || 0), 0);
    }
    // Tax: 6% of subtotal
    const tax = subtotal * 0.06;
    // Shipping: $10 for first item, $2 for each additional
    const shipping = this.cartItems.length > 0 ? 10 + (this.cartItems.length - 1) * 2 : 0;
    // Discount (if any)
    const discount = this.discount;
    // Total
    const total = subtotal + tax + shipping - discount;

    this.taxElem.textContent = `$${tax.toFixed(2)}`;
    this.shippingElem.textContent = `$${shipping.toFixed(2)}`;
    this.discountElem.textContent = `$${discount.toFixed(2)}`;
    this.totalElem.textContent = `$${total.toFixed(2)}`;
  }
}