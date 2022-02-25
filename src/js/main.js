// import ProductData from "./productData.js";
// import ProductList from "./productList.js";
import { loadHeaderFooter, getCookie } from "./utils.js";

// document.cookie = "firstTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

if (getCookie("firstTime") == "") {
  document.cookie = "firstTime=False";
} else {
  let banner = document.querySelector(".banner");
  banner.style.display = "none";
}
// const dataSource = new ProductData("tents");
// const productList = new ProductList(
//   "tents",
//   dataSource,
//   document.querySelector(".product-list")
// );
// productList.init();

loadHeaderFooter();
