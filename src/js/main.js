import ProductData from "./ProductDetails.mjs";
import ProductList from "./ProductList.mjs";

const tentsData = new ProductData("tents");
const listElement = document.querySelector('.product-list');

const tentsList = new ProductList('tents', tentsData, listElement);
