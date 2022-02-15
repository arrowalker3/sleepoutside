import{loadHeaderFooter as l}from"./utils.js";import"./shoppingCart.js";function n(t){return JSON.parse(localStorage.getItem(t))}function u(t,a){localStorage.setItem(t,JSON.stringify(a))}function d(){let t="";const a=n("so-cart");if(a!=null){const e=a.map(r=>_(r));document.querySelector(".product-list").innerHTML=e.join(""),g(a),o("cart-card__remove",i),o("add-quantity",m),o("subtract-quantity",p)}}function o(t,a){const e=[...document.getElementsByClassName(t)];e.map(r=>r.addEventListener("click",a))}function m(t){const a=t.target.getAttribute("data-id"),e=n("so-cart"),r=e.find(c=>c.Id===a);r.qty+=1,s(e)}function p(t){const a=t.target.getAttribute("data-id"),e=n("so-cart"),r=e.find(c=>c.Id===a);r.qty-=1,r.qty<1?i(t):s(e)}function f(t){let a=0;return t.forEach(e=>{a+=e.FinalPrice*e.qty}),a.toFixed(2).toString()}function g(t){const a=document.querySelector(".cart-total");a.innerHTML=`$${f(t)}`,t.length>0?a.parentElement.classList.remove("hide"):a.parentElement.classList.add("hide")}function i(t){t.preventDefault();const a=t.target.getAttribute("data-id"),e=n("so-cart"),r=e.filter(c=>c.Id!==a);s(r)}function s(t){u("so-cart",t),d()}function _(t){const a=`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <span class="cart-card__remove" data-id="${t.Id}">X</span>
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#" class="cart-card__name">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="subtract-quantity" data-id="${t.Id}">-</button>
    <p class="cart-card__quantity__display">qty: ${t.qty}</p>
    <button class="add-quantity" data-id="${t.Id}">+</button>
  </div>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`;return console.log(a),a}d(),l();
