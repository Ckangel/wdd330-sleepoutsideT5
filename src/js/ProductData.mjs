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
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async search(query) {
    const allProducts = await this.getData(); // getData should return all products if no category is passed
    return allProducts.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase()) ||
      product.Brand.toLowerCase().includes(query.toLowerCase())
    );
  }
}


