"use strict";

var _productData = _interopRequireDefault(require("./productData.js"));

var _productList = _interopRequireDefault(require("./productList.js"));

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const category = (0, _utils.getParam)("category");
const dataSource = new _productData.default();
const productList = new _productList.default(category, dataSource, document.querySelector(".product-list"));
productList.init();
(0, _utils.loadHeaderFooter)();
const capitalCategory = category.replace("-", " ");
document.querySelector("#listing-header").innerHTML += (0, _utils.capitalizeFirstLetters)(capitalCategory);