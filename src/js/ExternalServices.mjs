
// Helper function to convert the response to JSON if the response is OK
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// This class handles loading product data from a local JSON file

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
