"use strict";

var _productData = _interopRequireDefault(require("./productData.js"));

var _productList = _interopRequireDefault(require("./productList.js"));

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataSource = new _productData.default("tents");
const productList = new _productList.default("tents", dataSource, document.querySelector(".product-list"));
productList.init();
(0, _utils.loadHeaderFooter)();