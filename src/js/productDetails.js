import { getDiscount, renderListWithTemplate } from "./utils";

const baseURL = "//157.201.228.93:2992/";

function getColors(product) {
  const colorNames = product.Colors.map((item) => item.ColorName);

  return colorNames.join(" + ");
}

function setLocalStorage(key, data) {
  // Get the current storage
  let storage = localStorage.getItem("so-cart");

  // Make sure it's an array
  if (storage == null) {
    storage = [];
  } else {
    storage = JSON.parse(storage);
  }

  // Check if id already exists in cart

  let existingItemIndex = storage.findIndex((item) => item.Id === data.Id);

  // if not, push to cart with qty: 0
  if (existingItemIndex === -1) {
    data.qty = 0;
    existingItemIndex = storage.length;
    storage.push(data);
  }

  // qty += 1
  storage[existingItemIndex].qty += 1;

  // put back
  localStorage.setItem(key, JSON.stringify(storage));
}

function resetAnimation(target) {
  target.classList.remove("animate");
}

function counter() {
  let count = 0;
  let storedItems = getLocalStorage("so-cart");
  storedItems.forEach((item) => {
    count += parseInt(item.qty);
  });
  return count;
}

function imageCarouselCallback(clone, imageData) {
  // Set the src to url and alt to name of product
  const imageElement = clone.querySelector(".image-actual");
  imageElement.src = imageData.Src;
  imageElement.alt = imageData.Title;

  return clone;
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

window.plusSlides = function (n) {
  console.log(n);
}

/**
 * PRODUCT DETAILS CLASS
 * 
 * Manages and fills out details on the page for an individual product
 */
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart(e) {
    setLocalStorage("so-cart", this.product);
    let targetElement = document.getElementById("cart-icon");
    targetElement.classList.add("animate");
    setTimeout(function () {
      resetAnimation(targetElement);
    }, 1000);

    document.querySelector("#count").innerHTML = counter();
  }

  renderProductDetails() {
    document.querySelector("#title").innerHTML += this.product.Brand.Name;
    document.querySelector("#brandName").innerHTML = this.product.Brand.Name;
    document.querySelector(
      "#productName"
    ).innerHTML = this.product.NameWithoutBrand;
    
    // Fill image carousel
    this.fillImages();
    // End image carousel

    document.querySelector(
      ".product-card__price"
    ).innerHTML += this.product.FinalPrice;
    document.querySelector(".product__color").innerHTML = getColors(
      this.product
    );
    document.querySelector(
      ".product__description"
    ).innerHTML = this.product.DescriptionHtmlSimple;

    // Discount editing
    const discount = getDiscount(
      this.product.SuggestedRetailPrice,
      this.product.FinalPrice
    );
    const discountElement = document.querySelector(".product-card__og-price");

    if (discount === 0) {
      discountElement.classList.add("hide");
    } else {
      discountElement.innerHTML += this.product.SuggestedRetailPrice.toFixed(2);
    }
    // End discount editing
  }

  fillImages() {
    // Create list of images to add to the carousel
    const imageList = [{ Title: this.product.Name, Src: this.product.Images.PrimaryLarge }];
    if (this.product.Images.ExtraImages) {
      Array.prototype.push.apply(imageList, this.product.Images.ExtraImages);
    }

    // Render images using carousel template
    renderListWithTemplate(
      document.querySelector("#image-template"),
      document.querySelector("#image-carousel"),
      imageList,
      imageCarouselCallback.bind(this)
      );
  }
}
