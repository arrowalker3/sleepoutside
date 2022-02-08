function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(categoryName) {
    this.category = categoryName;
    this.path = `json/${this.category}.json`;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
}
