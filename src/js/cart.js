function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    renderCartTotal(cartItems);
  }
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function getCartTotal(cartList) {
  // foreach item,
  // add to total
  // return cart total
  let total = 0;

  cartList.forEach(product => {
    total += product.FinalPrice;
  });

  return total.toFixed(2).toString();
}

function renderCartTotal(cartList) {
  // get element and set to total
  const element = document.querySelector('.cart-total');
  element.innerHTML += getCartTotal(cartList);
  element.parentElement.classList.remove("hide");
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
