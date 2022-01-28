"use strict";

var _productData = _interopRequireDefault(require("./productData.js"));

var _productList = _interopRequireDefault(require("./productList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataSource = new _productData.default("tents");
const productList = new _productList.default("tents", dataSource, document.querySelector(".product-list"));
productList.init();