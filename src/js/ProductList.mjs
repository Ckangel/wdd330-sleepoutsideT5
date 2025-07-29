// Import utility functions
import {
  renderListWithTemplate, // Helper to render a list using a template function
  loadHeaderFooter, // Loads reusable header and footer HTML
  updateCartCount, // Updates the cart item count icon in the header
} from "./utils.mjs";

// Load header/footer and update cart icon count on page load
loadHeaderFooter();
updateCartCount();

/**
 * Returns an HTML string for one product card.
 * Displays image, brand, name, prices, and discount if applicable.
 */
function productCardTemplate(product) {
  // Calculate the discount percentage
  const discount = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      
      <p class="product-card__price">
        <span class="original-price">$${product.SuggestedRetailPrice}</span>
        <span class="final-price">$${product.FinalPrice}</span>
      </p>

      <p class="product-card__discount">${discount}% OFF</p>
    </a>
  </li>`;
}

/**
 * Class responsible for loading and rendering a list of products
 * for a given category using the provided data source.
 */
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; // e.g., "tents", "backpacks", etc.
    this.dataSource = dataSource; // Instance of ProductData or ExternalServices
    this.listElement = listElement; // DOM element where the products should render
  }

  // Initialize the list rendering process
  async init() {
    const list = await this.dataSource.getData(this.category); // Get product list from  API
    this.renderList(list); // Render list using template
  }

  // Renders the full product list using the template function
  renderList(list) {
    // Render all product items using the reusable utility function
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
