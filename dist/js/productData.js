"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
const baseURL = "http://157.201.228.93:2992/";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

class ExternalServices {
  constructor() {}

  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
    return fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
}

exports.default = ExternalServices;
