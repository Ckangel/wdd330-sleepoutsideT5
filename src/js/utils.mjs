// Shorthand for document.querySelector with optional parent element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// More concise alternative (commented out):
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// ---------------------
// Local Storage Helpers
// ---------------------

// Retrieve and parse data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Convert data to string and store in localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ----------------------------
// Event Handling Helper
// ----------------------------

// Sets up a click and touchend listener for a given selector
export function setClick(selector, callback) {
  const element = qs(selector);
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// ----------------------------
// URL Param Helper
// ----------------------------

// Extracts query string parameter (e.g., `?product=880RR`)
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// ----------------------------
// Template Rendering Helpers
// ----------------------------

// Renders a list using a template function and a parent DOM element
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Renders static template string and optionally performs a callback with data
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// ----------------------------
// Template Loader (async)
// ----------------------------

// Loads an HTML file from a given path and returns its content
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// ----------------------------
// Header/Footer Loader
// ----------------------------

// Dynamically loads and inserts header and footer HTML into page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// ----------------------------
// Cart Count Badge Updater
// ----------------------------

// Updates the cart count badge near the backpack/cart icon
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const count = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countElement = document.getElementById("cart-count");

  if (countElement) {
    countElement.textContent = count;
    countElement.style.display = count > 0 ? "inline-block" : "none";
  }
}
