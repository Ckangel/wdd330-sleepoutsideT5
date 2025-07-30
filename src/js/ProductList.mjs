import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Calculate the discount percentage
  const discount = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
      </a>
    
     
      <p class="product-card__price">
        <span class="original-price">$${product.SuggestedRetailPrice}</span>
        <span class="final-price">$${product.FinalPrice}</span>
      </p>

      <p class="product-card__discount">${discount}% OFF</p>
      
    </li>
    `;
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
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  // Renders the full product list using the template function
  renderList(list) {
    // Render all product items using the reusable utility function
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
