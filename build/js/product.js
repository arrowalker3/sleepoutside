let products = [];
function convertToJson(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
function setLocalStorage(t, o) {
  if (localStorage.getItem("so-cart") == null) {
    let e = [];
    e.push(o), localStorage.setItem(t, JSON.stringify(e));
  } else {
    let e = localStorage.getItem("so-cart");
    (e = JSON.parse(e)), e.push(o), localStorage.setItem(t, JSON.stringify(e));
  }
}
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((t) => {
      products = t;
    });
}
function addToCart(t) {
  const o = products.find((e) => e.Id === t.target.dataset.id);
  setLocalStorage("so-cart", o);
}
getProductsData(),
  document.getElementById("addToCart").addEventListener("click", addToCart);
