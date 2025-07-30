const baseURL = import.meta.env.VITE_SERVER_URL;

// Helper function to convert the response to JSON if the response is OK
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// This class handles loading product data from a local JSON file
export default class ExternalService {
  constructor() {}

  // Fetch and return the data as a promise
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }
  // Search products by name or brand based on a query
  async search(query) {
    const allProducts = await this.getData(); // Get all products
    return allProducts.filter(
      (product) =>
        product.Name.toLowerCase().includes(query.toLowerCase()) || // Match by product name
        product.Brand.toLowerCase().includes(query.toLowerCase()), // Match by brand
    );
  }
}
