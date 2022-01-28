"use strict";

var _productData = _interopRequireDefault(require("./productData.js"));

var _productDetails = _interopRequireDefault(require("./productDetails.js"));

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productId = (0, _utils.getParam)("product");
const dataSource = new _productData.default("tents");
const product = new _productDetails.default(productId, dataSource);
product.init(); // dataSource.findProductById(getParam('product')).then(data => console.log(data));
// let products = [];
// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }
// function setLocalStorage(key, data) {
//   if (localStorage.getItem("so-cart") == null) {
//     let storage = [];
//     storage.push(data);
//     localStorage.setItem(key, JSON.stringify(storage));
//   } else {
//     let storage = localStorage.getItem("so-cart");
//     storage = JSON.parse(storage);
//     storage.push(data);
//     localStorage.setItem(key, JSON.stringify(storage));
//   }
// }
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }
// add to cart button event handler
// function addToCart(e) {
//   const product = products.find((item) => item.Id === e.target.dataset.id);
//   setLocalStorage("so-cart", product);
// }
// get tents data
// function getProductsData() {
//   fetch("../json/tents.json")
//       .then(convertToJson)
//       .then((data) => {
//       products = data;
//       });
// }
// getProductsData();
// add listener to Add to Cart button
// document.getElementById("addToCart").addEventListener("click", product.addToCart);