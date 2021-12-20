import Controller from "../core/Controller.js";
import  url from "../component/listAdresse.js";
import listurl from "../component/listurl.js";
import listurl2 from "../component/listurl1.js";
import listurl3 from "../component/listurl2.js";
export default class Etape3 extends Controller {
  constructor() {
    super();

    document.title = "Etape3:Backlog";


     this.afficher();
     this.tirage();
     this.premiertirage();

  }

  afficher(id, titre, contenu, img,dposition, Dependance, taille, value) {

    let paqueturl = this.state.paquet;
    let paqueturlbase = paqueturl[0].url;
    let paquetref = this.state.paquet[0];
    let confref = this.state.paquet[0].configuration;

    let obj1 = {};
    let obj2 = {};
    let obj3 = {};
    let obj4 = {};

    const cadrillage = document.getElementById("ref");
    //console.log(cadrillage);

    if (titre != "...") {
      //transformation en this.cas 1 pb cela ne fonctionne pas
      let carte = document.createElement("div");
      carte.classList.add('forme');
      carte.style.border = " 5px solid  #475158";
      carte.id = "sousref" + id;
      carte.setAttribute('data-position', dposition);
      carte.setAttribute('data-id', id);
      carte.setAttribute('data-cartechoisi', "false");
      let sousdiv = document.createElement("div");
      sousdiv.classList.add('repartition');
      let para1 = document.createElement('p');
      para1.innerHTML = "Userstorie:" + id;
      let para2 = document.createElement('p');
      // console.log(Dependance);
      if (Dependance===null) {
        para2.innerHTML = "";
      }
      else{  para2.innerHTML = "Depend: titre" + Dependance;} 
      let titreElmt = document.createElement("h3");
      titreElmt.innerHTML = titre;
      let para3 = document.createElement("p");
      para3.innerHTML = contenu;
      let tailleElmt = document.createElement("p");
      let valueElmt = document.createElement("p");
      valueElmt.innerHTML = 'value:'+value;
     
      tailleElmt.innerHTML = 'size :'+taille;
    
      let eletclick = document.createElement("div");
      eletclick.id=id ;
      eletclick.classList.add("croix");
      eletclick.innerHTML = "+";

      cadrillage.appendChild(carte);
      carte.appendChild(sousdiv);
      sousdiv.appendChild(para1);
      sousdiv.appendChild(para2);
      carte.appendChild(titreElmt);
      carte.appendChild(para3);
      carte.appendChild(tailleElmt);
      carte.appendChild(valueElmt);
      carte.appendChild(eletclick);
    } 
    else {
      let carte = document.createElement("div");
      carte.classList.add('transp');
      carte.id = "";
      //console.log(carte);
      let sousdiv = document.createElement("div");
      sousdiv.classList.add('repartition');
      let para1 = document.createElement('p');
      para1.innerHTML = "";
      let para2 = document.createElement('p');
      para2.innerHTML = "";
      let titre = document.createElement("h3");
      titre.innerHTML = "";
      let para3 = document.createElement("p");
      para3.innerHTML = "";
      let size = document.createElement("p");
      let value = document.createElement("p");
      value.innerHTML = ""
      size.innerHTML = "";
      let eletclick = document.createElement("div");
      eletclick.id = "";
      eletclick.classList.add("croix");
      eletclick.innerHTML = "....";

      cadrillage.appendChild(carte);
      carte.appendChild(sousdiv);
      sousdiv.appendChild(para1);
      sousdiv.appendChild(para2);
      carte.appendChild(titre)
      carte.append(para3);
      let eltselected = document.querySelectorAll("div.forme");
      
      eltselected.forEach(e => {
        e.addEventListener('click', choix);
        // console.log(e);
     
      });


      function choix() {
        this.dataset.cartechoisi = true;
        let prioritecarte = document.querySelectorAll("div[data-cartechoisi='true']");
        //console.log(prioritecarte);
        prioritecarte.forEach(elt => {
          elt.style.border = '2px solid green';
          //console.log(elt);
        })

      }

      let card = document.querySelectorAll("div.croix");
      //console.log(card);
      card.forEach(elements => {
        elements.addEventListener("click", selection);
      });

      function selection() {
        this.dataset.choisi = true;
        prioriser();
      //  this.prioriser();
      //  prioriser devient une méthode mais cela ne fonctionne pas
        
      }
     function prioriser() {
        let priorite = document.querySelectorAll("div[data-choisi='true']");
        let text = document.querySelector("#nombrecarteSelected");
        let tableauassociatif = new Array();
        let listeltselectionne = Array.from(priorite);
    
    
        if(listeltselectionne[0]!=""){
          let ident=listeltselectionne[0].id; //correspond a l'id de la userstorie donc a un id sur 25 pas au titre 
         
          listeltselectionne[0].innerHTML = "A";
          listeltselectionne[0].classList.add("marque");
         
        Object.defineProperty(obj1, "carteid1", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: ident
        });
        }
        if(listeltselectionne[1]!=""){
          listeltselectionne[0].innerHTML = "A";
          listeltselectionne[0].classList.add("marque");
          listeltselectionne[1].innerHTML = "A";
          listeltselectionne[1].classList.add("marque");
          let ident1=listeltselectionne[1].id;
          //console.log(ident1);
          //console.log(obj2);
          Object.defineProperty(obj2, "carteid2", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: ident1
          });
        }
        if(listeltselectionne[2]!=""){
          listeltselectionne[0].innerHTML = "A";
          listeltselectionne[0].classList.add("marque");
          listeltselectionne[1].innerHTML = "A";
          listeltselectionne[1].classList.add("marque");
          listeltselectionne[2].innerHTML = "A";
          listeltselectionne[2].classList.add("marque");
          let ident2=listeltselectionne[2].id;
          //console.log(ident2);
          //console.log(obj3);
          Object.defineProperty(obj3, "carteid3", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: ident2
          });
        }
        if(listeltselectionne[3]!=""){
          listeltselectionne[0].innerHTML = "A";
          listeltselectionne[0].classList.add("marque");
          listeltselectionne[1].innerHTML = "A";
          listeltselectionne[1].classList.add("marque");
          listeltselectionne[2].innerHTML = "A";
          listeltselectionne[2].classList.add("marque");
          listeltselectionne[3].innerHTML = "A";
          listeltselectionne[3].classList.add("marque");
          let ident3=listeltselectionne[3].id;
          //console.log(ident3);
          //console.log(obj4);
        Object.defineProperty(obj4, "carteid4", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: ident3
          });
        }
        //console.log(listeltselectionne);
        document.querySelector("#nombrecarteSelected").textContent = "vous avez selectionné " + priorite.length + " " + "cartes";
        //console.log(priorite.length);
        if (priorite.length >= 4) {
          document.querySelector("#nombrecarteSelected").style.fontSize = "3em";
          document.querySelector("#nombrecarteSelected").textContent = "VOUS AVEZ SELECTIONNE 4 CARTES!!! c'EST SUFFISANT";
    
        }
      
        
        //console.log(obj2);
       Object.defineProperty(paquetref, "carte1", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: obj1.carteid1
        });
       
       
         Object.defineProperty(paquetref, "carte2", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: obj2.carteid2
        });
        
        Object.defineProperty(paquetref, "carte3", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: obj3.carteid3
        });
        Object.defineProperty(paquetref, "carte4", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: obj4.carteid4
        });
        //console.log(paquetref);
        for (let i = 0; i < 5; i++) {
          if (listeltselectionne[i] != "") {
            listeltselectionne[i].innerHTML = "A";
            listeltselectionne[i].classList.add("marque");
    
    
          }
         
        }
    
      }

    
    }
  }
  // prioriser() {
  //   let priorite = document.querySelectorAll("div[data-choisi='true']");
  //   let text = document.querySelector("#nombrecarteSelected");
  //   let tableauassociatif = new Array();
  //   let listeltselectionne = Array.from(priorite);


  //   if(listeltselectionne[0]!=""){
  //     let ident=listeltselectionne[0].id; //correspond a l'id de la userstorie donc a un id sur 25 pas au titre 
     
  //     listeltselectionne[0].innerHTML = "A";
  //     listeltselectionne[0].classList.add("marque");
     
  //   Object.defineProperty(obj1, "carteid1", {
  //     enumerable: false,
  //     configurable: true,
  //     writable: false,
  //     value: ident
  //   });
  //   }
  //   if(listeltselectionne[1]!=""){
  //     listeltselectionne[0].innerHTML = "A";
  //     listeltselectionne[0].classList.add("marque");
  //     listeltselectionne[1].innerHTML = "A";
  //     listeltselectionne[1].classList.add("marque");
  //     let ident1=listeltselectionne[1].id;
  //     //console.log(ident1);
  //     //console.log(obj2);
  //     Object.defineProperty(obj2, "carteid2", {
  //       enumerable: false,
  //       configurable: true,
  //       writable: false,
  //       value: ident1
  //     });
  //   }
  //   if(listeltselectionne[2]!=""){
  //     listeltselectionne[0].innerHTML = "A";
  //     listeltselectionne[0].classList.add("marque");
  //     listeltselectionne[1].innerHTML = "A";
  //     listeltselectionne[1].classList.add("marque");
  //     listeltselectionne[2].innerHTML = "A";
  //     listeltselectionne[2].classList.add("marque");
  //     let ident2=listeltselectionne[2].id;
  //     //console.log(ident2);
  //     //console.log(obj3);
  //     Object.defineProperty(obj3, "carteid3", {
  //       enumerable: false,
  //       configurable: true,
  //       writable: false,
  //       value: ident2
  //     });
  //   }
  //   if(listeltselectionne[3]!=""){
  //     listeltselectionne[0].innerHTML = "A";
  //     listeltselectionne[0].classList.add("marque");
  //     listeltselectionne[1].innerHTML = "A";
  //     listeltselectionne[1].classList.add("marque");
  //     listeltselectionne[2].innerHTML = "A";
  //     listeltselectionne[2].classList.add("marque");
  //     listeltselectionne[3].innerHTML = "A";
  //     listeltselectionne[3].classList.add("marque");
  //     let ident3=listeltselectionne[3].id;
  //     //console.log(ident3);
  //     //console.log(obj4);
  //   Object.defineProperty(obj4, "carteid4", {
  //       enumerable: false,
  //       configurable: true,
  //       writable: false,
  //       value: ident3
  //     });
  //   }
  //   //console.log(listeltselectionne);
  //   document.querySelector("#nombrecarteSelected").textContent = "vous avez selectionné " + priorite.length + " " + "cartes";
  //   //console.log(priorite.length);
  //   if (priorite.length >= 4) {
  //     document.querySelector("#nombrecarteSelected").style.fontSize = "3em";
  //     document.querySelector("#nombrecarteSelected").textContent = "VOUS AVEZ SELECTIONNE 4 CARTES!!! c'EST SUFFISANT";

  //   }
  
    
  //   //console.log(obj2);
  //  Object.defineProperty(paquetref, "carte1", {
  //     enumerable: false,
  //     configurable: true,
  //     writable: false,
  //     value: obj1.carteid1
  //   });
   
   
  //    Object.defineProperty(paquetref, "carte2", {
  //     enumerable: false,
  //     configurable: true,
  //     writable: false,
  //     value: obj2.carteid2
  //   });
    
  //   Object.defineProperty(paquetref, "carte3", {
  //     enumerable: false,
  //     configurable: true,
  //     writable: false,
  //     value: obj3.carteid3
  //   });
  //   Object.defineProperty(paquetref, "carte4", {
  //     enumerable: false,
  //     configurable: true,
  //     writable: false,
  //     value: obj4.carteid4
  //   });
  //   //console.log(paquetref);
  //   for (let i = 0; i < 5; i++) {
  //     if (listeltselectionne[i] != "") {
  //       listeltselectionne[i].innerHTML = "A";
  //       listeltselectionne[i].classList.add("marque");


  //     }
     
  //   }

  // }
  // }
  tirage(){
  
    let paqueturl = this.state.paquet;
    //console.log(typeof (paqueturl));
    let paqueturlbase = paqueturl[0].url;
    //console.log(paqueturlbase);
    let paquetref = this.state.paquet[0];
    let confref = this.state.paquet[0].configuration;
    //console.log(confref,paquetref); 

    let obj1 = {};
    let obj2 = {};

     // cas du paquet userstories:
     let premiertirage = document.getElementById("devoiler");
     //console.log(premiertirage);
    //  let listurl = [];
     //console.log(listurl);
     let I = 0;
     let nbreclick = I;
     //console.log(nbreclick);
     let nbreurl = listurl.length;
     let urlselect = listurl[I];
     //console.log(urlselect, I);
 
     if (paqueturlbase === url[0]||paqueturlbase===url[1]||paqueturlbase===url[2]) {
      
      I = 0;
 
       console.log(listurl);
       nbreurl = listurl.length;
       console.log(nbreurl);
       console.log(listurl);
       urlselect = listurl[I];
       console.log(urlselect, I);

       if (nbreclick === 0) {
         //console.log(nbreclick);
         console.log(listurl);
         let urlcas = paqueturlbase;
         //console.log(urlcas);
 
         //console.log(obj1);
 
        premiertirage.addEventListener('click', function () {
          
        
        // () => {
          // this.premiertirage();
           //console.log(obj1);
           Object.defineProperty(obj1, "configuration", {
             enumerable: false,
             configurable: true,
             writable: false,
             value: urlcas
           });
           //console.log(paquetref);
           Object.defineProperty(paquetref, 'configuration', {
             value: obj1.configuration,
             configurable: true,
             writable: false
           });
           //console.log(urlcas, obj1.configuration);
           derouler(urlcas)
           //console.log(derouler(urlcas));
 
        })
       }
       let realance = document.getElementById('plus');
       //console.log(realance);
       realance.addEventListener('click', function modifyclick() {
           I++;
           //console.log(I);
           nbreclick = I;
           //console.log(nbreclick);
           if (nbreclick > 0 && nbreclick < nbreurl) {
             if (paqueturlbase === listurl[0]) {
               let newurl = listurl[nbreclick];
               //console.log(newurl);
               //console.log(obj2);
               Object.defineProperty(obj2, "configuration", {
                 enumerable: false,
                 configurable: true,
                 writable: false,
                 value: newurl
               });
   
               Object.defineProperty(paquetref, "configuration", {
                 enumerable: false,
                 configurable: true,
                 writable: false,
                 value: obj2.configuration
               });
               //console.log(obj2, obj2.configuration);
   
   
               //console.log(paquetref);
               newderouler(newurl)
             }
             if (paqueturlbase === listurl2[0]) {
               let newurl2 = listurl2[nbreclick];
               //console.log(newurl2);
               //console.log(obj2);
               Object.defineProperty(obj2, "configuration", {
                 enumerable: false,
                 configurable: true,
                 writable: false,
                 value: newurl2
               });
               Object.defineProperty(paquetref, "configuration", {
                 enumerable: false,
                 configurable: true,
                 writable: false,
                 value: obj2.configuration
               });
               //console.log(obj2, obj2.configuration);
               //console.log(paquetref);
               newderouler(newurl2)
               
             }
             if (paqueturlbase === listurl3[0]) {
               let newurl3 = listurl2[nbreclick];
               //console.log(newurl3);
               //console.log(obj2);
               Object.defineProperty(obj2, "configuration", {
                 enumerable: false,
                 configurable: true,
                 writable: false,
                 value: newurl3
               });
   
               Object.defineProperty(paquetref, "configuration", {
                 enumerable: false,
                 configurable: true,
                 writable: false,
                 value: obj2.configuration
               });
               //console.log(obj2, obj2.configuration);
   
   
               //console.log(paquetref);
               newderouler(newurl3)
             }
     
           } //else{ //console.log(paqueturlbase)}
         }
       )
     }

     const ref = this
     function derouler(urlcas) {
       let xhr = new XMLHttpRequest();
       xhr.open("GET", urlcas, true);
       xhr.onreadystatechange = function () {
         //console.log(xhr.readyState);
         if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
 
           let datas = JSON.parse(xhr.response);
           const cadrillage = document.getElementById("ref");
           
           cadrillage.innerHTML = "";
          //console.log(datas);
           datas.forEach(element => {
             //console.log(element);
            //  let Deatail = new Etape3(element.id, element.type, element.titre, element.contenu, element.img, element.dposition, element.Dependance,element.taille,element.value);
            //  Deatail.afficher();
            ref.afficher(element.id, element.titre, element.contenu, element.img, element.dposition, element.Dependance, element.taille, element.value)
           })
         } else  {
           if (xhr.readyState < 4) {
           //console.log(xhr.readyState);
         } //else(
           //console.log("vous avez un pb"));
         //)
        }
       }
       xhr.send(null);
     }
     const point = this;
     function newderouler(newurl) {
 
       let xhr = new XMLHttpRequest();
       xhr.open("GET", newurl, true);
       //console.log(newurl);
 
       xhr.onreadystatechange = function () {
         //console.log(xhr.readyState);
         if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
 
           let datas = JSON.parse(xhr.response);
           const cadrillage = document.getElementById("ref");
           //console.log(cadrillage);
           cadrillage.innerHTML = "";
         
           datas.forEach(element => {
            point.afficher(element.id, element.titre, element.contenu, element.img, element.dposition, element.Dependance, element.taille, element.value)
          
            //  let Deatail = new Etape3(element.id, element.type, element.titre, element.contenu, element.img, element.dposition, element.Dependance);
            //  Deatail.afficher();
           })
         } else if (xhr.readyState < 4) {
           //console.log(xhr.readyState);
         } //else(//console.log("vous avez un pb"));
       }
       xhr.send(null);
     }
 
   }


  }

 