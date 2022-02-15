import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

const checkout = new CheckoutProcess();
checkout.subtotal();
checkout.taxAndTotal();
loadHeaderFooter();
