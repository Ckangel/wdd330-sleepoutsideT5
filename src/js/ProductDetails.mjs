import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

updateCartCount();

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }




 addProductToCart() {
  // Get current cart from localStorage
  let cartItems = getLocalStorage("so-cart") || [];

  // Ensure it's an array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Check if the product already exists in the cart
  const isDuplicate = cartItems.some(item => item.Id === this.product.Id);

  if (isDuplicate) {
    alert("This product is already in your cart.");
    return; // Stop the function
  }

  // If not in cart, add with quantity 1
  const productToAdd = { ...this.product, quantity: 1 };
  cartItems.push(productToAdd);
   setLocalStorage("so-cart", cartItems);
   
     // Update cart icon count in header
    updateCartCount()
   alert("Product successfully added to cart.");
   return;
}


  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;



  // Show discount info if there's a discount
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const discountAmount = (
      product.SuggestedRetailPrice - product.FinalPrice
    ).toFixed(2);
    const discountPercent = Math.round(
      (discountAmount / product.SuggestedRetailPrice) * 100,
    );

    const discountFlag = document.createElement("div");
    discountFlag.classList.add("discount-flag"); 
    discountFlag.textContent = `Save $${discountAmount} (${discountPercent}%)`;

    // Insert discount flag above the image
    productImage.parentElement.insertBefore(discountFlag, productImage);
  }
}
