import { getCartTotal, getLocalStorage } from "./utils.js";

export default class CheckoutProcess {
  constructor() {
    this.tax = 0.06;
    this.shipping = 0;
    this.cartItems = getLocalStorage("so-cart");
    this.cartTotal = parseFloat(getCartTotal(this.cartItems));
    this.numberOfItems = this.cartItems.length;
  }

  subtotal() {
    document.querySelector("#item-amount").innerHTML += this.numberOfItems;
    document.querySelector("#item-cost").innerHTML = this.cartTotal;
  }

  taxAndTotal() {
    let shippingCost = 10 + this.numberOfItems * 2;
    document.querySelector("#shipping-estimate").innerHTML += shippingCost;
    document.querySelector("#tax").innerHTML += (
      this.tax * this.cartTotal
    ).toFixed(2);
  }
}
