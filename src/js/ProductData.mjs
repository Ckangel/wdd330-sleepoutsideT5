const baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"; 
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
 async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
}

  async search(query) {
    const allProducts = await this.getData(); // getData should return all products if no category is passed
    return allProducts.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase()) ||
      product.Brand.toLowerCase().includes(query.toLowerCase())
    );
  }
}


