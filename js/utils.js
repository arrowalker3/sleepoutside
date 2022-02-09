// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const querystring = window.location.search;
  const urlParams = new URLSearchParams(querystring);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  list.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const hydratedTemplate = callback(clone, product);
    parentElement.appendChild(hydratedTemplate);
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
  const clone = template.content.cloneNode(true);

  if (callback != null) {
    clone = callback(clone, data);
  }
  parentElement.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then((response) => response.text());
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/sleepoutside/partials/header.html");
  const footerTemplate = await loadTemplate("/sleepoutside/partials/footer.html");

  const domHeader = document.querySelector("#main-header");
  const domFooter = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, domHeader);
  renderWithTemplate(footerTemplate, domFooter);
}
