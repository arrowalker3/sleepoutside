import ExternalServices from "../js/externalServices";
import { loadHeaderFooter } from "./utils.js";
loadHeaderFooter();

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.getElementById(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    try {
      this.token = await this.services.loginRequest(creds);
      console.log(this.token);
      next();
    } catch (err) {
      console.log(err);
    }
  }
  loginPrep() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    this.login(
      { email: email, password: password },
      this.showOrders.bind(this)
    );
  }

  async showOrders() {
    try {
      const orders = await this.services.getOrders(this.token);
      console.log(orders);
      // this.mainElement.innerHTML = orderHtml();
      // const parent = document.querySelector("#orders tbody");
      // // why not a template like we have done before?  The markup here was simple enough that I didn't think it worth the overhead...but a template would certainly work!
      // parent.innerHTML = orders
      //   .map(
      //     (order) =>
      //       `<tr><td>${order.id}</td><td>${new Date(
      //         order.orderDate
      //       ).toLocaleDateString("en-US")}</td><td>${
      //         order.items.length
      //       }</td><td>${order.orderTotal}</td></tr>`
      //   )
      //   .join("");
    } catch (err) {
      console.log(err);
    }
  }

  showlogin() {
    const form = `<fieldset class="login-form">
    <legend>Login</legend>
    <p>
      <label for="email">Email</label>
      <input type="text" placeholder="email" id="email" value="user1@email.com"/>
    </p>
    <p>
      <label for="password">Password</label>
      <input value="user1" type="password" placeholder="password" id="password" />
    </p>
    <button type="submit" id="loginButton">Login</button>
  </fieldset>`;

    const divArea = document.getElementById("login-space");
    divArea.innerHTML = form;
    const submit = document.getElementById("loginButton");
    submit.addEventListener("click", this.loginPrep.bind(this));
  }
}
