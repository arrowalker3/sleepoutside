import ProductData from "./productData.js";
import ProductList from "./productList.js";

const dataSource = new ProductData("tents");
const productList = new ProductList(
  "tents",
  dataSource,
  document.querySelector(".product-list")
);
productList.init();
