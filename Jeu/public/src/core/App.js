import { Menu } from "../component/Menu.js";
import {routes} from "../config/routes.js";

class App {
  route;
  controller;

  constructor() {
    this.router();
    customElements.define('menu-component', Menu);
  }

  router() {
    document.addEventListener("route", (e) => {
      history.pushState(
        {
          route: e.detail,
        },
        "",
        e.detail
      );
      this.render();
    });

    window.onpopstate = (e) => {
      this.render();
    };

    this.render();
  }

  render() {
    this.route = routes[window.location.pathname || "/"];
    //console.log(window.location.pathname);
    fetch(`/public/views/${this.route.view}.html`)
      .then((raw) => raw.text())
      .then((txt) => {
        document.getElementById("app").innerHTML = txt;
        this.controller = new this.route.controller();
      })
      .catch((err) => console.error(err));
  }
}

export default App;