import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details using the data source
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details on the page
    this.renderProductDetails();

    // Add event listener for Add to Cart button
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
  let cartItems = getLocalStorage("so-cart") || [];

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    const exists = cartItems.find(item => item.Id === this.product.Id);
    if (exists) {
      alert("Product is already in the cart.");
      return;
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert("Product quantity updated in cart.");
    return;
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Set product name and brand
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  // Set image
  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  // Pricing logic
  const finalPrice = parseFloat(product.FinalPrice);
  const retailPrice = parseFloat(product.SuggestedRetailPrice);

  document.getElementById("productPrice").textContent = `$${finalPrice.toFixed(2)}`;

  // Display discount if available
  if (retailPrice > finalPrice) {
    const discount = retailPrice - finalPrice;
    const discountPercent = Math.round((discount / retailPrice) * 100);

    document.getElementById("originalPrice").textContent = `$${retailPrice.toFixed(2)}`;
    document.getElementById("discountBadge").textContent = `${discountPercent}% Off`;
  }

  // Color and description
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  // Set Add to Cart button dataset
  document.getElementById("addToCart").dataset.id = product.Id;
}
