import ProductData from "./productData.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam, capitalizeFirstLetters } from "./utils.js";

const category = getParam("category");

const dataSource = new ProductData();
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
