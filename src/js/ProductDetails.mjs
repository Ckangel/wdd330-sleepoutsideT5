import { getLocalStorage, setLocalStorage, loadHeaderFooter  } from "./utils.mjs";

loadHeaderFooter();
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

    // Ensure it's an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
  }

    // prevent duplicates
    const exists = cartItems.find(item => item.Id === this.product.Id);
    if (exists) {
      alert("Product is already in the cart.");
      return;
    } 

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert("Product added to cart.");
  }

    renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
