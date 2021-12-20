import Controller from "../core/Controller.js";
import listcarte from "../component/listCarte.js";
export default class Regles extends Controller {

  cadreref; // Balise dont le contenu sera réécrit

  constructor() {
    super();
    document.title = "Scumble, les règles du Jeu";
    this.cadreref = document.querySelector(".cadreregles");
    this.loadCharacters();
  }
  /** Chargement des données */
  loadCharacters() {
    fetch(listcarte[3], { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.cadreref.innerHTML = this.displayCharacters(res);
        this.createModal();
      }
      )
      .catch(er => console.error(er));
  };
  /** Ecrire le contenu dans le HTML */
  displayCharacters(characters) {
    return characters
      .map((character) => {
        return `
                  <article data-regles="${character._id}">
                    <div class="img-regles" style="background-image:url(../../assets/image/${character.img})" alt="${character.titre}"></div>
                    <h2 class="titre">${character.titre}</h2>
                    <p> ${character.contenu}</p>
                    <button class="btn4" id="${character._id}" data-clicked="false"> Voir </button> 

                    <!-- The Modal -->
                    <div id="modal-${character._id}" class="modal">
                      <!-- Modal content -->
                      <div class="modal-content">
                          <span class="close" id="close-${character._id}">&times;</span>
                          <h2 class="titremodal">${character.titre}</h2>
                          <div style="display:flex;flex-direction:row;">
                          <p style="color:black;"> ${character.texte}</p>
                          <video controls="controls">
                            <source src="../../assets/video/${character.video}"></source>
                            Merci de vérifier que votre navigateur est bien à jour
                           </video>
                      </div> 
                    </div>
                  </article>
              `;
      })
      .join('');
  }
  /** Création d'une modale au clic sur les boutons d'info */
  createModal() {
    //console.log(document.querySelectorAll('.btn4'))
    let btnmodal = document.querySelectorAll('.cadreregles button');
    btnmodal.forEach(el => {
      console.log('boutons');
      el.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('bouton cliqué', this, e.currentTarget.parent);
        el.dataset.clicked = "true";
        //console.log(el);
        let modal = document.getElementById('modal-' + el.id)
        //console.log(modal);
        let btnref = document.getElementById(el.id);
        //console.log(btnref);
        modal.style.display = "flex";
        //console.log('HIII');
        let span = document.getElementById('close-' + el.id);
        span.onclick = () => {
          modal.style.display = "none";
        }

      })
    });
  }
}