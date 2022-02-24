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
document.querySelector("#checkoutSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let myForm = document.forms[0];
    let chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
      checkout.checkout();
    }
});
