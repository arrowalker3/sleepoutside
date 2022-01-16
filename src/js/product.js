let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function setLocalStorage(key, data) {
  // Get what's saved in local storage
  let storage = localStorage.getItem("so-cart");

  // If null, create an array
  if (storage == null) {
    storage = [];
  } else {
    // otherwise, parse what's there
    storage = JSON.parse(storage);

  }
  // Check if id already exists
  // If yes, add to quantity

  // Else, Add data
  storage.push(data);

  // Save
  localStorage.setItem(key, JSON.stringify(storage));}

// get tents data
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  setLocalStorage("so-cart", product);
}

getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
