"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

class ProductData {
  constructor(categoryName) {
    this.category = categoryName;
    this.path = `../json/${this.category}.json`;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find(item => item.Id === id);
  }

  getData() {
    return fetch(this.path).then(convertToJson).then(data => data);
  }

}

exports.default = ProductData;