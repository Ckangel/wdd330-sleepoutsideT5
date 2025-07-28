// Helper function to convert the response to JSON if the response is OK
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// This class handles loading product data from a local JSON file
export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`; // Path to the local JSON file for the category
  }

  // Fetch and return the data as a promise
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  // Find a specific product by ID
  async findProductById(id) {
    const products = await this.getData(); // Load product list
    return products.find((item) => item.Id === id); // Return the product matching the ID
  }

  // Search products by name or brand based on a query
  async search(query) {
    const allProducts = await this.getData(); // Get all products

    );
  }
}
