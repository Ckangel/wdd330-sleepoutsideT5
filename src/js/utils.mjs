import data from "./data.json"; // JSON import
import styles from "./style.css"; // CSS import
import icon from "./icon.svg"; // SVG import

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

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = false,
) {
  // If clear is true, clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "template";
  }
  // Insert the template (for a single data object, not a list)
  parentElement.insertAdjacentHTML(position, template(data));
  // If a callback is provided, call it
  if (callback) {
    callback();
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(
      `Failed to load template from ${path}: ${response.statusText}`,
    );
  }
  const html = await response.text();
  return html;
}

export async function loadHeaderFooter() {
  // Load header and footer templates
  const headerHTML = await loadTemplate("/partials/header.html");
  const footerHTML = await loadTemplate("/partials/footer.html");

  // Get header and footer placeholder elements
  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  // Render header and footer
  renderWithTemplate(() => headerHTML, headerElement, {});
  renderWithTemplate(() => footerHTML, footerElement, {});
}
