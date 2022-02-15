import ExternalServices from "./externalServices";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam, capitalizeFirstLetters } from "./utils.js";

const category = getParam("category");

const dataSource = new ExternalServices();
const productList = new ProductList(
  category,
  dataSource,
  document.querySelector(".product-list")
);
productList.init();

loadHeaderFooter();

const capitalCategory = category.replace("-", " ");
document.querySelector("#listing-header").innerHTML += capitalizeFirstLetters(
  capitalCategory
);
