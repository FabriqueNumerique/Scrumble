import Controller from "../core/Controller.js";
import listcarte from "../component/listCarte.js";
export default class Regles extends Controller {
  constructor() {
    super();
    document.title = "Regles du Jeu";
    this.createRegles();
    this.createModal();

  }
  createRegles(){
    const cadreref = document.getElementById("cadreregles");
    let hpCharacters = [];

    var myHeaders = new Headers({ 'Access-Control-Allow-Headers': "*", "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"});
    var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };
    let url = listcarte[3];

    const loadCharacters = async () => {
      try {
        const res = await fetch(url,{method:'GET'});
        hpCharacters = await res.json();
        //console.log(res + "  " + hpCharacters);
        displayCharacters(hpCharacters);
      } catch (err) {
        //console.error(err);
      }
    };

    const displayCharacters = (characters) => {
      const htmlString = characters
        .map((character) => {
          return `
                    <div data-regles="${character._id}">
                        <div class="rep">
                            <img src= '../../assets/image/${character.img}' alt="logo de la regle"class="img">
                            <div>
                                <h2 class="titre"> ${character.titre}</h2>
                                <p class="description"> ${character.contenu}</p>
                                <button class="btn4" id="${character._id}" data-clicked="false"> Voir </button> 

                                <!-- The Modal -->
                                <div  id="modal${character._id}" class="modal">
                                    <!-- Modal content -->
                                    <div class="modal-content">
                                    <h2 class="titremodal">${character.titre}</h2>
                                    <div style="display:flex;flex-direction:row;">
                                        <p style="color:black;"> ${character.texte}</p>
                                        <video controls="controls">
                                        <source src="../../assets/video/${character.video}"></source>
                                        votre navigateur n'est pas a jour! mettez-le a jour!!!
                                        </video>
                                    </div>
                                        <span class="close" id="close${character._id}">&times;</span>
                                        
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                `;
        })
        .join('');
        //console.log(htmlString);
      cadreref.innerHTML = htmlString;
      this.createModal()
      
    
    };



    loadCharacters();
  }
   createModal(){
  //console.log(document.querySelectorAll('.btn4'))
  let btnmodal=document.querySelectorAll('.btn4');
  btnmodal.forEach(element => {
    element.addEventListener("click",(e) => {
      e.preventDefault();
      element.dataset.clicked="true";
    let parent =element.closest('div[data-regles]');
   if(parent.dataregles === element._id){
     //console.log(element);
    let modal = document.getElementById('modal'+element.id)
    //console.log(modal);
    let btnref=document.getElementById(element.id);
    //console.log(btnref);
    modal.style.display = "block";
        //console.log('HIII');
        let span = document.getElementById('close'+element.id);
      span.onclick = function() {
          modal.style.display = "none";
        }
      
   }

    })
    

  });

  }
}