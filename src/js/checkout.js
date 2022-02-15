import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

const checkout = new CheckoutProcess();
checkout.subtotal();
checkout.taxAndTotal();
loadHeaderFooter();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.taxAndTotal.bind(checkout));
// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  checkout.checkout();
});
