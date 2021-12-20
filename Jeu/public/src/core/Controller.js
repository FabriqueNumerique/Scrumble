import Context from "./Context.js";

class Controller {
  state = Context.getInstance().state;

  constructor() {
    this.refreshLinks()
  }

  replace(dataset, key, value) {
    const element = document.querySelector(`[data-${dataset}]`);
    element.innerHTML = element.innerHTML.replace(`{${key}}`, value);
  }

  route(e) {
    e.preventDefault();
    document.querySelectorAll("a[data-link]").forEach((link) => {
      link.removeEventListener("click", this.route);
    });
    document.dispatchEvent(
      new CustomEvent("route", {
        detail: e.target.dataset.link,
      })
    );
  }

  refreshLinks() {
    document.querySelectorAll("a[data-link]").forEach((link) => {
      link.addEventListener("click", this.route);
    });
  }

  go(route) {
    document.dispatchEvent(
      new CustomEvent("route", {
        detail: route,
      })
    );
  }
}

export default Controller;