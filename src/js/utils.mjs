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

export const renderListWithTemplate = (
  templateFunction,
  parentElement,
  list,
  clear = false,
  position = 'afterBegin',
) => {
  const htmlStrins = list.map(templateFunction);
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrins.join(''));
};

export const renderWithTemplate = (template, container, data, callback) => {
  container.innerHTML = template;
  if (callback) {
    callback(data);
  }
};

export const loadTemplate = async (path) => {
  const response = await fetch(path);
  return response.text();
};

export const loadHeaderFooter = async () => {
  const header = await loadTemplate('../partials/header.html');
  const headerElement = qs('#header');
  const footer = await loadTemplate('../partials/footer.html');
  const footerElement = qs('#footer');

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
  showUpdateCartBadge();
};
