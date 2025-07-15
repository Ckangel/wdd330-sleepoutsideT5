import ProductList from './js/ProductList.mjs';
import ProductData from './js/ProductData.js'; // Adjust path if needed

const dataSource = new ProductData();
const productListElement = document.querySelector('#product-list'); // Make sure you have a <ul id="product-list"></ul> in your HTML
const productList = new ProductList('tents', dataSource, productListElement);

productList.init();

// Search form handling
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    // Assuming your ProductData has a search method, otherwise filter manually
    const results = await dataSource.search(query); // Implement this in ProductData
    productList.renderList(results);
  }
});