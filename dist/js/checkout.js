"use strict";

var _utils = require("./utils.js");

var _checkoutProcess = _interopRequireDefault(require("./checkoutProcess.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkout = new _checkoutProcess.default();
checkout.subtotal();
checkout.taxAndTotal();
(0, _utils.loadHeaderFooter)();
document.querySelector("#zip").addEventListener("blur", checkout.taxAndTotal.bind(checkout)); // listening for click on the button

document.querySelector("#checkoutSubmit").addEventListener("click", e => {
  e.preventDefault();
  checkout.checkout();
});