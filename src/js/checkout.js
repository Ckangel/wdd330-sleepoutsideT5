import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();

async function submitOrder(orderData) {
  try {
    const response = await fetch('http://wdd330-backend.onrender.com/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Order submission failed');
    const result = await response.json();
    // Handle success (show confirmation, etc.)
    console.log('Order submitted:', result);
    alert('Order submitted successfully!');
  } catch (error) {
    console.error(error);
    alert('There was a problem submitting your order.');
  }
}

// Example usage: call this on form submit
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  // Gather order data from form and cart
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const zip = document.getElementById('zip').value;
  // Add other fields as needed

  const orderData = {
    name,
    address,
    zip,
    items: cartItems
    // Add other fields as needed
  };

  await submitOrder(orderData);
});
