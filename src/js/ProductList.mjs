// Import utility functions
import {

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

  }

  // Initialize the list rendering process
  async init() {
    const list = await this.dataSource.getData(); // Get product list from JSON or API

  }

  // Renders the full product list using the template function
  renderList(list) {
    // Render all product items using the reusable utility function
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
