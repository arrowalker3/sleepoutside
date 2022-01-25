function getColors(product) {
  const colorNames = product.Colors.map((item) => item.ColorName);

  return colorNames.join(" + ");
}

function setLocalStorage(key, data) {
  if (localStorage.getItem("so-cart") == null) {
    let storage = [];
    storage.push(data);
    localStorage.setItem(key, JSON.stringify(storage));
  } else {
    let storage = localStorage.getItem("so-cart");
    storage = JSON.parse(storage);
    storage.push(data);
    localStorage.setItem(key, JSON.stringify(storage));
  }
}

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
  }

  renderProductDetails() {
    document.querySelector("#title").innerHTML += this.product.Brand.Name;
    document.querySelector("#brandName").innerHTML = this.product.Brand.Name;
    document.querySelector(
      "#productName"
    ).innerHTML = this.product.NameWithoutBrand;
    document.querySelector("#productImage").src = this.product.Image;
    document.querySelector("#productImage").alt = this.product.Name;
    document.querySelector(
      ".product-card__price"
    ).innerHTML = `$${this.product.FinalPrice}`;
    document.querySelector(".product__color").innerHTML = getColors(
      this.product
    );
    document.querySelector(
      ".product__description"
    ).innerHTML = this.product.DescriptionHtmlSimple;
  }
}
