"use strict";

var _productData = _interopRequireDefault(require("./productData.js"));

var _productDetails = _interopRequireDefault(require("./productDetails.js"));

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productId = (0, _utils.getParam)("product");
const dataSource = new _productData.default("tents");
const product = new _productDetails.default(productId, dataSource);
product.init();
(0, _utils.loadHeaderFooter)();