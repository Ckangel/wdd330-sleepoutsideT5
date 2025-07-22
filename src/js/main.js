import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    const allProducts = await dataSource.getData();
    
    if (!Array.isArray(allProducts)) {
      alert("Product data is not an array. Check your JSON file format.");
      return;
    }
    const found = allProducts.find(
      (product) =>
        (product.Name &&
          product.Name.toLowerCase().includes(query.toLowerCase())) ||
        (product.Brand &&
          product.Brand.toLowerCase().includes(query.toLowerCase())),
    );
   
    if (found) {
      window.location.href = `product_pages/?product=${found.Id}`;
    } else {
      alert("No product found matching your search.");
    }
  }
});
