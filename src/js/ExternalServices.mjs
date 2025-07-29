<<<<<<< HEAD
const baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
=======
>>>>>>> 131edab3e14d4655682ebe3e5b88c15c36c55df5

// Helper function to convert the response to JSON if the response is OK

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// This class handles loading product data from a local JSON file
<<<<<<< HEAD
export default class ExternalServices {
  constructor() {
    //this.category = category;
    //this.path = `../json/${this.category}.json`; // Path to the local JSON file for the category
  }

  // Fetch and return the data as a promise
  async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
}

  // Find a specific product by ID
  async findProductById(id) {
    const products = await this.getData(); // Load product list
    return products.find((item) => item.Id === id); // Return the product matching the ID
  }
=======
>>>>>>> 131edab3e14d4655682ebe3e5b88c15c36c55df5

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
