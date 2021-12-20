import Context from "./Context.js";

class Controller {
  /** Singleton pour stocker et partager des données */
  state = Context.getInstance().state;

  constructor() {
    this.refreshLinks()
  }
  /** Remplacer des datasets dans un élément HTML */
  replace(dataset, key, value) {
    const element = document.querySelector(`[data-${dataset}]`);
    element.innerHTML = element.innerHTML.replace(`{${key}}`, value);
  }
  /** Lancer un événement au changement de route */
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
  /** Laner une route */
  go(route) {
    document.dispatchEvent(
      new CustomEvent("route", {
        detail: route,
      })
    );
  }
}

export default Controller;