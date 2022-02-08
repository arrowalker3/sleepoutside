"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getColors(product) {
  const colorNames = product.Colors.map(item => item.ColorName);
  return colorNames.join(" + ");
}

function setLocalStorage(key, data) {
  // Get the current storage
  let storage = localStorage.getItem("so-cart"); // Make sure it's an array

  if (storage == null) {
    storage = [];
  } else {
    storage = JSON.parse(storage);
  } // Check if id already exists in cart


  let existingItemIndex = storage.findIndex(item => item.Id === data.Id); // if not, push to cart with qty: 0

  if (existingItemIndex === -1) {
    data.qty = 0;
    existingItemIndex = storage.length;
    storage.push(data);
  } // qty += 1


  storage[existingItemIndex].qty += 1; // put back

  localStorage.setItem(key, JSON.stringify(storage));
}

class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
  }

  addToCart(e) {
    setLocalStorage("so-cart", this.product);
    var targetElement = document.getElementById("cart-icon");
    targetElement.className = "cart animate";
  }

  renderProductDetails() {
    document.querySelector("#title").innerHTML += this.product.Brand.Name;
    document.querySelector("#brandName").innerHTML = this.product.Brand.Name;
    document.querySelector("#productName").innerHTML = this.product.NameWithoutBrand;
    document.querySelector("#productImage").src = this.product.Image;
    document.querySelector("#productImage").alt = this.product.Name;
    document.querySelector(".product-card__price").innerHTML += this.product.FinalPrice;
    document.querySelector(".product__color").innerHTML = getColors(this.product);
    document.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
  }

}

exports.default = ProductDetails;