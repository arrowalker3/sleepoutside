"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils.js");

var _externalServices = _interopRequireDefault(require("./externalServices.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const services = new _externalServices.default();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
        convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map(item => ( // console.log(item);
  {
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1
  }));
  return simplifiedItems;
}

class CheckoutProcess {
  constructor() {
    this.tax = 0.06;
    this.shipping = 0;
    this.cartItems = (0, _utils.getLocalStorage)("so-cart");
    this.cartTotal = parseFloat((0, _utils.getCartTotal)(this.cartItems));
    this.numberOfItems = this.cartItems.length;
  }

  subtotal() {
    document.querySelector("#item-amount").innerHTML += this.numberOfItems;
    document.querySelector("#item-cost").innerHTML = this.cartTotal;
  }

  taxAndTotal() {
    let shippingCost = 10 + this.numberOfItems * 2;
    document.querySelector("#shipping-estimate").innerHTML += shippingCost;
    document.querySelector("#tax").innerHTML += (this.tax * this.cartTotal).toFixed(2);
  }

  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    // call the checkout method in our ExternalServices module and send it our data object.
    const formElement = document.forms["checkout"];
    const json = formDataToJSON(formElement); // add totals, and item details

    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.cartItems); // console.log(json);

    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

}

exports.default = CheckoutProcess;