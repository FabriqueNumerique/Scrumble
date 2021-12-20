
import Controller from "../core/Controller.js";
import url from "../component/listAdresse.js";
export default class Etape2 extends Controller {
  constructor() {
    super();
    document.title = "Etape du jeu 2"
   
    // this.createloadCharacters();
    this.createloadCharacters1()
    this.createloadCharacters2();
    this.createloadCharacters3();
    this.traitement();
    this.createDette();
  }

traitement(){
  document.title = "Etape du jeu 2"
  //console.log("jeu:etape2");
  //console.log(this.state);
  let urlchoisi=this.state.paquet;
  //console.log(urlchoisi); 
  const entries= new Map([
    [ 'url','url'],
    ['dettetechnique','...'],
    ['configuration','....']
  
  ]); 
  const obj=Object.fromEntries(entries);
  //console.log(obj);
  urlchoisi.push(obj);
  //console.log(urlchoisi);
  console.log(url) 
  // let url1 = "http://localhost:3051/api/paquet2";
  // let url2 = "http://localhost:3051/api/paquet3";
  //console.log(url0,url1,url2);

    // selection de l'ensemble des div avec l'attribut data-selected
    const listeUserStories = document.querySelectorAll("div[data-selected]");
    //console.log(typeof (listeUserStories) + listeUserStories);

    listeUserStories.forEach(listeUserStorie => { //boucle sur chaque div auquel on applique un evenement click qui lance la fonction selectionner
      listeUserStorie.addEventListener('click', selectionner);
    
     
    });
    let urlselecionne;

    function selectionner() {
      //console.log(this);
      this.dataset.selected = this.dataset.selected == "true" ? "false" : "true"; //si  le dataset.selected de notre div selectionner est true elle passe a false sinon reste a true

      // this.dataset.selected = this.dataset.selected == "true" ? this.dataset.cadreselected=="false" : this.dataset.cadreselected=="true";

      alert('votre selection est réussie!!Validez-la en cliquant sur le bouton Finalisez la préparation'); //message utilisateur de validation de la manoeuvre

      let elementSelected = document.querySelectorAll('div[data-selected="true"]'); //verification que l'ensemble des element avec le data-selected =trues soit bien = une div
      //console.log(elementSelected);
      const selection = elementSelected.length; //verification que l'ensemble des div avec le data-selected est bien = a 1
    elementSelected.forEach(e => {
          //console.log(e.id);
          let valeurpaquet = e.id;
          //console.log(valeurpaquet);

          let urlselecionne;
          if (valeurpaquet === "paquet0") {
            //console.log(valeurpaquet);
            urlselecionne = url[0];
            //console.log(urlselecionne)

          } else if (valeurpaquet === "paquet1") {
            //console.log(valeurpaquet);
            urlselecionne = url[1];
            //console.log(urlselecionne);
          } else {
            //console.log(valeurpaquet);
            urlselecionne = url[2];
            //console.log(urlselecionne);
          }
          //console.log(urlselecionne);
          //console.log(urlchoisi);

          Object.defineProperty(urlchoisi[0], 'url', {
            value: urlselecionne,
            writable: false
          });

        }

      )
      // selection de tout les data-cadreref 

      const listecadrerefs = document.querySelectorAll("section[data-cadreselected]"); // selection de l'ensemble des article avec l'attribut data-cadreselected
      listecadrerefs.forEach(listecadreref => {
        listecadreref.addEventListener('click', selectionnercadre); //boucle sur chaque article auquel on applique un evenement click qui lance la fonction selectionnercadre

      });

      function selectionnercadre() {
        this.dataset.cadreselected = this.dataset.cadreselected == "true" ? "false" : "true"; //voir cas prcdent meme logique
        const cadreselected = document.querySelectorAll('section[data-cadreselected="true"]'); //verification que l'ensemble des elements avec le data-selected =trues soit bien = un article
        //console.log(cadreselected);

        if (selection == 1 && selection < 2 && elementSelected[0] != "" && cadreselected[0] != "" && elementSelected.length == 1) { //si presence d'un seul element selectionner non vide en relation avec un article [data-cadreselected="true"] non vide
          let titre = document.querySelector("h2"); //selection du titre 
          let cadrevert = document.querySelector('section[data-cadreselected="true"]'); // verdissement de ces contours
          //console.log(cadrevert);
          cadrevert.style.border = "0.2em green solid";

          let docResultat = document.createElement("p"); // ajout message de felicitation
          docResultat.style.textAlign = "center";
          docResultat.style.fontSize = "0.75em";


          docResultat.innerHTML = " Bravo !!!!  vous avez selectionné votre projet!! "
          titre.appendChild(docResultat); // mise en tant qu'enfant du titre du message de felicitation
          ;
          elementSelected.forEach(e => {
            //console.log(e.id);
            let valeurpaquet = e.id;
            //console.log(valeurpaquet);
          });

        } else {
          alert("probleme: vous avez selectionné un paquet en trop, en conséquence pour la bonne marche du jeu nous choissions un seul des paquets selectionnés seulement ")
          //console.log(cadreselected);
          elementSelected.forEach(e => {
            //console.log(e.id);
            let valeurpaquet = e.id;
            //console.log(valeurpaquet);

            let urldiffpaquet = [];
            let url = urldiffpaquet.push(valeurpaquet);
            //console.log(urldiffpaquet);

          });
          let urldiffpaquet = [];
          let url = urldiffpaquet.push(cadreselected);
          //console.log(urldiffpaquet, url);
          // let urlselecionne;
          urlselecionne = urldiffpaquet[0];
          //console.log(urlselecionne);
          // alert( "nous avons donc selectionné le paquet de user storie n°"+urlselecionne);


        }
      }


    }


  }
createloadCharacters1() {
  console.log(url[0]) 
    const paquet = document.getElementById("paquet0");


    let hpCharacters = [];
  
    
  
    const loadCharacters = async () => {
      try {
        const res = await fetch(url[0]);
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
                    
                        <div class="box">
                            <img src="../../assets/image/${character.img}" alt="logo de la regle"class="img">
                                <h3> ${character.titre}</h3>
                                <p> ${character.contenu}</p>
                        </div>
                    
                `;
        })
        .join('');
      paquet.innerHTML = htmlString;
    };
  
  
    loadCharacters();
  }
createloadCharacters2() {
  // let url1 = "http://localhost:3051/api/paquet2";
  const paquet1 = document.getElementById("paquet1");

  let hpCharacters1 = [];


  const loadCharacters1 = async () => {
    try {
      const res = await fetch(url[1]);
      hpCharacters1 = await res.json();
      //console.log(res + "  " + hpCharacters1);
      displayCharacters1(hpCharacters1);
    } catch (err) {
      //console.error(err);
    }
  };
  const displayCharacters1 = (characters) => {
    const htmlString = characters
      .map((character) => {
        return `
                        
                            <div class="box">
                            <img src="../../assets/image/${character.img}" alt="logo de la regle"class="img">
                                    <h3> ${character.titre}</h3>
                                    <p> ${character.contenu}</p>
                            </div>
                        
                    `;
      })
      .join('');
    paquet1.innerHTML = htmlString;
  };



  loadCharacters1();

  }
createloadCharacters3(){
  // let url2 = "http://localhost:3051/api/paquet3";

  //paquet2///////////////////////////////////////////////////////////////////////////////////////////////////

  const paquet2 = document.getElementById("paquet2");

  let hpCharacters2 = [];


  const loadCharacters2 = async () => {
    try {
      const res = await fetch(url[2]);
      hpCharacters2 = await res.json();
      //console.log(res + "  " + hpCharacters2);
      displayCharacters2(hpCharacters2);
    } catch (err) {
      //console.error(err);
    }
  };
  const displayCharacters2 = (characters) => {
    const htmlString = characters
      .map((character) => {
        return `
                        
                            <div class="box">
                            <img src="../../assets/image/${character.img}" alt="logo de la regle"class="img">
                                    <h3> ${character.titre}</h3>
                                    <p> ${character.contenu}</p>
                            </div>
                        
                    `;
      })
      .join('');
    paquet2.innerHTML = htmlString;
  };



  loadCharacters2();

  


}
createDette(){
//console.log("jeu:etape2");
  //console.log(this.state);
  let urlchoisi=this.state.paquet;
  //console.log(urlchoisi); 
  const entries= new Map([
    [ 'url','url'],
    ['dettetechnique','...'],
    ['configuration','....']
  
  ]); 
  const obj=Object.fromEntries(entries);
  //console.log(obj);
  urlchoisi.push(obj);
  //console.log(urlchoisi);

  //console.log(url0,url1,url2);
let paquetcarte=this.state.paquet[0];
//console.log(paquetcarte);
const dettetechpos=["DETTE INEXISTANTE x3","DETTE FAIBLE x4","DETTE MOYENNE x5"];
let nombreposdette=Math.trunc(Math.random()*3);
//console.log(nombreposdette);
let dette=dettetechpos[nombreposdette];
//console.log(dette);
Object.defineProperty(urlchoisi[0], "dettetechnique", {
enumerable: false,
configurable: true,
writable: false,
value: dette
});
console.log(urlchoisi[0]);
}


}
