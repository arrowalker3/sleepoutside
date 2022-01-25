import { renderListWithTemplate } from "./utils";

export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = element;
  }

  async init() {
    const template = document.querySelector("#product-card-template");

    const dataList = await this.dataSource.getData();
    renderListWithTemplate(
      template,
      this.listElement,
      dataList,
      this.prepareTemplate
    );
  }

  //   renderList(list) {

  //     list.forEach((product) => {
  //       const clone = template.content.cloneNode(true);
  //       const hydratedTemplate = this.prepareTemplate(clone, product);
  //       this.listElement.appendChild(hydratedTemplate);
  //     });
  //   }

  prepareTemplate(clone, product) {
    clone.querySelector("#link").href += product.Id;
    clone.querySelector("#image").src = product.Image;
    clone.querySelector("#image").alt += product.Name;
    clone.querySelector(".card__brand").innerText = product.Brand.Name;
    clone.querySelector(".card__name").innerText = product.NameWithoutBrand;
    clone.querySelector(".product-card__price").innerText += product.FinalPrice;

    return clone;
  }
}
