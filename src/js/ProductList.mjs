import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/product_detail.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card__brand">${product.Brand}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}


class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData();

    }

    renderList(list, position = "afterbegin", clear = false) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
    }
}
export default ProductList;