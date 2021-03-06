"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qs = qs;
exports.getLocalStorage = getLocalStorage;
exports.setLocalStorage = setLocalStorage;
exports.setClick = setClick;
exports.getParam = getParam;
exports.renderListWithTemplate = renderListWithTemplate;
exports.renderWithTemplate = renderWithTemplate;
exports.loadTemplate = loadTemplate;
exports.loadHeaderFooter = loadHeaderFooter;
exports.capitalizeFirstLetters = capitalizeFirstLetters;
exports.getCartTotal = getCartTotal;
exports.getDiscount = getDiscount;

// wrapper for querySelector...returns matching element
function qs(selector, parent = document) {
  return parent.querySelector(selector);
} // or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);
// retrieve data from localstorage


function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
} // save data to local storage


function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
} // set a listener for both touchend and click


function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", event => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

function getParam(param) {
  const querystring = window.location.search;
  const urlParams = new URLSearchParams(querystring);
  const product = urlParams.get(param);
  return product;
}

function renderListWithTemplate(template, parentElement, list, callback) {
  list.forEach(product => {
    const clone = template.content.cloneNode(true);
    const hydratedTemplate = callback(clone, product);
    parentElement.appendChild(hydratedTemplate);
  });
}

function renderWithTemplate(template, parentElement, data, callback) {
  let clone = template.content.cloneNode(true);

  if (callback != null) {
    clone = callback(clone, data);
  }

  parentElement.appendChild(clone);
}

async function loadTemplate(path) {
  const html = await fetch(path).then(response => response.text());
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

async function loadHeaderFooter() {
  // console.log(window.location.pathname);
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const domHeader = document.querySelector("#main-header");
  const domFooter = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplate, domHeader);
  renderWithTemplate(footerTemplate, domFooter);

  function counter() {
    let count = 0;
    let storedItems = getLocalStorage("so-cart");
    storedItems.forEach(item => {
      count += parseInt(item.qty);
    });
    return count;
  } // function getLocalStorage(key) {
  //   return JSON.parse(localStorage.getItem(key));
  // }


  document.querySelector("#count").innerHTML = counter();
} // Separates words in string, then capitalizes first letter of each word
// Returns a recombined string of the sentence


function capitalizeFirstLetters(str) {
  const words = str.split(" ");
  const final = [];
  words.forEach(word => {
    final.push(word.charAt(0).toUpperCase() + word.slice([1]));
  });
  return final.join(" ");
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
} // Given 2 prices, returns % difference between the two,
// rounded down to nearest multiple of 5


function getDiscount(listPrice, finalPrice) {
  const diff = listPrice - finalPrice;
  const percent = diff / listPrice * 100;
  const roundDown = Math.floor(percent / 5) * 5;
  return roundDown;
}