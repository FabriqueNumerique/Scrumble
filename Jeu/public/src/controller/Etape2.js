
import Controller from "../core/Controller.js";
import { env } from "../config/ENV.js";

export default class Etape2 extends Controller {

  el; // Elément HTML dans lequel seront écrits les projets
  articles = [];

  constructor() {
    super();
    document.title = "Scrumble, choisir un projet";
    this.el = document.querySelector('.projets');
    // on récupère les données sur le serveur
    this.getProjets();
  }

  /** Récupérer la lsite des projets */
  getProjets() {
    fetch(env.API_URL + 'projets')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.state.projets = data;
        this.afficheProjets();
      })
      .catch(er => console.log(er))
  };

  /** Afficher les projets attendus */
  afficheProjets(){
    this.state.projets.forEach(p => {
      let ar = document.createElement('article');
      ar.setAttribute('data-projet', p._id);
      ar.addEventListener('click', (e)=>{
        // Récupérer l'ID du projet récupéré
        this.state.idProjet = e.currentTarget.dataset.projet;
        // Récupérer les stories du projet
        this.state.stories = this.state.projets.find(p => p._id = this.state.idProjet).stories;
        this.setSelection(e.currentTarget);
      });
      this.articles.push(ar);
      let titre = document.createElement('h3');
      titre.textContent = p.titre;

      let para = document.createElement('p');
      para.textContent = p.description;

      let div = document.createElement('div');
      
      ar.appendChild(titre);
      ar.appendChild(para);
      ar.appendChild(div);

      this.el.appendChild(ar);
      // Afficher des exemples de stories
      this.getStories(div, p.stories.slice(0,5));
    });
  }
  /** Afficher 5 stories */
  getStories(el, stories) {
    stories.forEach(
      s => {
        let conteneur = document.createElement('div');
        conteneur.innerHTML = `
        <div class='img' style="background-image:url(${s.src}) alt="${s.titre}"></div>
          <h4>${s.titre}</h4>
          <p>${s.contenu}</p>
        `;
        el.appendChild(conteneur);
      }
    )
  }
  /** Indiquer quel article est sélectionné */
  setSelection(selec){
    console.log(selec);
    this.articles.forEach(a => a.classList.remove('selection')); 
    selec.classList.toggle('selection');
  }
}
