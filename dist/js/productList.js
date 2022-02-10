"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = element;
  }

  async init() {
    const template = document.querySelector("#product-card-template");
    const dataList = await this.dataSource.getData(this.category);
    (0, _utils.renderListWithTemplate)(template, this.listElement, dataList, this.prepareTemplate);
  }

  prepareTemplate(clone, product) {
    clone.querySelector("#link").href += product.Id;
    clone.querySelector("#image").src = product.Images.PrimaryMedium;
    clone.querySelector("#image").alt += product.Name;
    clone.querySelector(".card__brand").innerText = product.Brand.Name;
    clone.querySelector(".card__name").innerText = product.NameWithoutBrand;
    clone.querySelector(".product-card__price").innerText += product.FinalPrice;
    return clone;
  }

}

exports.default = ProductList;