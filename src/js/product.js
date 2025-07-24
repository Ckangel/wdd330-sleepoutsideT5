import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();
