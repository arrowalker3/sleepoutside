import ExternalServices from "./externalServices";
import ProductDetails from "./productDetails.js";
import { getParam } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";

const productId = getParam("product");
const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();
