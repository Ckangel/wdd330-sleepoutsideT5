<<<<<<< HEAD
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // Fetch product details use the datasource to get the details of the current product
       // findProductById will return a promise that resolves to the product details
       // use await or .then() to process it
       this.product = await this.dataSource.findProductById(this.productId);
        // Render the product details on the page before rendering the HTML
        this.renderProductDetails();
        // Add event listener to the "Add to Cart" button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
=======
import { getLocalStorage, setLocalStorage,  } from "./utils.mjs";


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
>>>>>>> origin/DAA--individual-3
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
<<<<<<< HEAD
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}




        import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// const productId = getParam('product');
// const dataSource = new ProductData('tents');

// const product = new ProductDetails(productId, dataSource);
// product.init();
//
=======
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
>>>>>>> origin/DAA--individual-3
