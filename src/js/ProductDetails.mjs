// Import utility functions
import { getLocalStorage, setLocalStorage, loadHeaderFooter, updateCartCount } from "./utils.mjs";

// Load the site's header and footer, and update the cart icon
loadHeaderFooter();
updateCartCount();

// Export the ProductDetails class as default
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;     // Unique product ID from URL
    this.product = {};              // Placeholder for product data
    this.dataSource = dataSource;   // Data source to fetch product details
  }

  async init() {
    // Fetch product details using the provided data source
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details to the page
    this.renderProductDetails();

    // Attach event listener to Add to Cart button
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    // Load current cart items
    let cartItems = getLocalStorage("so-cart") || [];

    // Ensure we are working with an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    // Prevent duplicates — check if item already exists
    const exists = cartItems.find(item => item.Id === this.product.Id);
    if (exists) {
      alert("Product is already in the cart.");
      return;
    }

    // Add the product to the cart
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    // Update cart icon count in header
    updateCartCount();

    alert("Product quantity updated in cart.");
    return;
  }

  renderProductDetails() {
    // Render HTML with product info
    productDetailsTemplate(this.product);
  }
}

// Renders the UI for a product detail page
function productDetailsTemplate(product) {
  // Basic product info rendering
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  // Set button dataset for reference later
  document.getElementById("addToCart").dataset.id = product.Id;

  // Show discount info if there's a discount
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);

    const discountFlag = document.createElement("div");
    discountFlag.classList.add("discount-flag"); 
    discountFlag.textContent = `Save $${discountAmount} (${discountPercent}%)`;

    // Insert discount flag above the image
    productImage.parentElement.insertBefore(discountFlag, productImage);
  }
}
