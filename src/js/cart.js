function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");


    renderCartTotal(cartItems);

    // Add event listeners to .cart-card__remove
    const removeElements = [...document.getElementsByClassName("cart-card__remove")];
    removeElements.map(element => element.addEventListener('click', removeFromCart));
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
  
function removeFromCart(e) {
  e.preventDefault();
  const productId = e.target.getAttribute("data-id");
  
  const cartItems = getLocalStorage("so-cart");
  const filteredList = cartItems.filter(item => item.Id !== productId);

  setLocalStorage("so-cart", filteredList);
  getCartContents();

}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <span class="cart-card__remove" data-id="${item.Id}">X</span>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#" class="cart-card__name">
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
