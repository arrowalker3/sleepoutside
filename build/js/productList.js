import { renderListWithTemplate, getDiscount } from "./utils.js";

export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = element;
  }

  async init() {
    const template = document.querySelector("#product-card-template");

    const dataList = await this.dataSource.getData(this.category);
    renderListWithTemplate(
      template,
      this.listElement,
      dataList,
      this.prepareTemplate
    );
  }

  prepareTemplate(clone, product) {
    clone.querySelector("#link").href += product.Id;
    clone.querySelector("#image").src = product.Images.PrimaryMedium;
    clone.querySelector("#image").alt += product.Name;
    clone.querySelector(".card__brand").innerText = product.Brand.Name;
    clone.querySelector(".card__name").innerText = product.NameWithoutBrand;
    clone.querySelector(".product-card__price").innerText += product.FinalPrice;

    // Discount editing
    const discount = getDiscount(
      product.SuggestedRetailPrice,
      product.FinalPrice
    );
    const discountElement = clone.querySelector(".discount");

    if (discount === 0) {
      discountElement.classList.add("hide");
    } else {
      discountElement.innerHTML = discount + "% OFF!!!";
    }
    // End discount editing

    return clone;
  }
}
