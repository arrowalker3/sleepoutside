"use strict";

var _utils = require("./utils");

var _shoppingCart = _interopRequireDefault(require("./shoppingCart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");

  if (cartItems != null) {
    const htmlItems = cartItems.map(item => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    renderCartTotal(cartItems); // Add event listeners to .cart-card__remove

    addClickEvents("cart-card__remove", removeFromCart);
    addClickEvents("add-quantity", addToQuantity);
    addClickEvents("subtract-quantity", subtractFromQuantity);
  }
}

function addClickEvents(className, callback) {
  // Get list of elements by class
  const elementList = [...document.getElementsByClassName(className)]; // Add click event to each

  elementList.map(element => element.addEventListener("click", callback));
}

function addToQuantity(e) {
  // Add 1
  const productId = e.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");
  const product = cartItems.find(item => item.Id === productId);
  product.qty += 1;
  saveAndReload(cartItems);
}

function subtractFromQuantity(e) {
  // Subtract 1
  const productId = e.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");
  const product = cartItems.find(item => item.Id === productId);
  product.qty -= 1; // If qty <== 0, delete

  if (product.qty < 1) {
    removeFromCart(e);
  } else {
    saveAndReload(cartItems);
  }
}

function getCartTotal(cartList) {
  // foreach item,
  // add to total
  // return cart total
  let total = 0;
  cartList.forEach(product => {
    total += product.FinalPrice * product.qty;
  });
  return total.toFixed(2).toString();
}

function renderCartTotal(cartList) {
  // get element and set to total
  const element = document.querySelector(".cart-total");
  element.innerHTML = `$${getCartTotal(cartList)}`;

  if (cartList.length > 0) {
    element.parentElement.classList.remove("hide");
  } else {
    element.parentElement.classList.add("hide");
  }
}

function removeFromCart(e) {
  e.preventDefault();
  const productId = e.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");
  const filteredList = cartItems.filter(item => item.Id !== productId); // setLocalStorage("so-cart", filteredList);
  // getCartContents();

  saveAndReload(filteredList);
}

function saveAndReload(updatedCart) {
  setLocalStorage("so-cart", updatedCart);
  getCartContents();
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <span class="cart-card__remove" data-id="${item.Id}">X</span>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#" class="cart-card__name">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="subtract-quantity" data-id="${item.Id}">-</button>
    <p class="cart-card__quantity__display">qty: ${item.qty}</p>
    <button class="add-quantity" data-id="${item.Id}">+</button>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
(0, _utils.loadHeaderFooter)();