import Controller from "../core/Controller.js";


export default class Etape4 extends Controller {
    constructor() {
        super();
        document.title = "Etape4:Tableau Kanban";
        this.fetch();
        
        console.log(this.state.paquet);
    }
   
    fetch(){
    

      let config = this.state.paquet[0];
       //console.log(config);
       let carteid1 = config.carte1;
       const valuecarteid1 = parseInt(carteid1);
       //console.log(valuecarteid1);
       let carteid2 = config.carte2;
       const valuecarteid2 = parseInt(carteid2);
       //console.log(valuecarteid2);
       let carteid3 = config.carte3;
       const valuecarteid3 = parseInt(carteid3);
       //console.log(valuecarteid3);
       let carteid4 = config.carte4;
       const valuecarteid4 = parseInt(carteid4);
       //console.log(valuecarteid4);
       const configurationcarte = config.configuration;
    
 
       // rien a voir avec le fetch ceci est pour 
       // l'interieur du fetch, sert a identifier les sous-elements a partir du titre
 
       let urlch = configurationcarte + '/';
       //console.log(urlch);
 
       let carte1 = urlch + config.carte1;
       let carte2 = urlch + config.carte2;
       let carte3 = urlch + config.carte3;
       let carte4 = urlch + config.carte4;
       //console.log(carte4);
 
       const urlcarte = [carte1, carte2, carte3, carte4];
     
 
       const statut1="afaire";
       const statut2="encours";
      const statut3="termine";
     
       let eltbase = document.querySelector('#depart');
       eltbase.innerHTML = ` <div class="case adjustementcase">A FAIRE</div>`;
       //console.log(eltbase);
 
 
       let urlchoisi = urlcarte[0];
      function fetchDATA() {
          fetch(config.url).then(response => {
              return response.json();

          }).then(
              data => {
                  //console.log(data);
                  const html = data.map(carte => {
                      //    //console.log(carte);
                      if (carte.id === valuecarteid1 || carte.id === valuecarteid2 || carte.id === valuecarteid3 || carte.id === valuecarteid4) {
                          return `
               <div class="list-item" draggable="true" id="${carte.id}">
              
                           <div class="box adjbox">
                                  <div class="" style="display:flex; flex-direction:row; margin-left:25%;">
                                  <p class="titreCard"> Userstorie:${carte.id}</p>
                                  <p class="titreCard">Dependance:${carte.Dependance}</p></div>
                                   <img src="../../assets/image/${carte.img}" alt="logo de l'image" class="image">
                                    <h3 class="titreCard"> ${carte.titre}</h3>
                                    <p class="texteCard"> ${carte.contenu}</p>
                                    <div>
                                      <p class="texteCard"> Value:${carte.value}, Size:${carte.taille}</p>
                                      <p data-statut="afaire"id="${carte.id}" class="satutCard">afaire<p>
                                    </div>
                            </div>
             </div>
             `;
                      }

                  }).join('');

                  //console.log(html);
                  // //console.log(data, eltbase); 
                 
                  eltbase.insertAdjacentHTML('beforeend', html);

                  // partie drag and drop:
                  // this.drag()
                  const list_items = document.querySelectorAll('.list-item');

                  const lists = document.querySelectorAll('.list');
                  let draggedItem = null;
                  //console.log(list_items, lists, draggedItem);
                  list_items.forEach((element) => {
                      // const item = element[i];
                      // //console.log(element[i])

                      element.addEventListener("dragstart", function (e) {
                          const element = e.target;
                          //console.log(element.id);

                          function display(e) {
                              const zone = e.target;
                              zone.append(element);
                              //console.log(e, element);
                               let firstelement=zone.firstElementChild;
                              //console.log(firstelement,firstelement.innerHTML);

                              if (firstelement.innerHTML==="A FAIRE") {
                                  //console.log(firstelement,firstelement.innerHTML);
                                  let statutcarte=document.querySelectorAll('p[data-statut]');
                                  //console.log(statutcarte);
                                  statutcarte.forEach((souselement)=>{
                                    if (souselement.id===element.id) {
                                        //console.log(souselement);
                                        element.addEventListener('mouseover',function stautchange1(){
    //console.log( souselement.dataset.statut);
                                                souselement.dataset.statut="afaire";
                                                souselement.innerHTML=souselement.dataset.statut;
                                                if (element.id===carteid1 ) {
                                              
                                                  Object.defineProperty(config, "carte1statut", {
                                                      enumerable: false,
                                                      configurable: true,
                                                      writable: false,
                                                      value: "afaire"
                                                    });
                                                    //console.log(config);
                                                  } 
                                               
                                              if (element.id===carteid2) {
                                                //console.log(element.id)
                                              Object.defineProperty(config, "carte2statut", {
                                                  enumerable: false,
                                                  configurable: true,
                                                  writable: false,
                                                  value: "afaire"
                                                });
                                              }
                                            if (element.id===carteid3) {
                                              //console.log(element.id)
                                            Object.defineProperty(config, "carte3statut", {
                                                enumerable: false,
                                                configurable: true,
                                                writable: false,
                                                value: "afaire"
                                              });
                                              }
                                          
                                            if (element.id===carteid4) {
                                                //console.log(element.id)
                                              Object.defineProperty(config, "carte4statut", {
                                                  enumerable: false,
                                                  configurable: true,
                                                  writable: false,
                                                  value: "afaire"
                                                });
                                            }
                                        })
                                            
                                        
                                        }
                                    
                                      //console.log(souselement.id);
                                  })
                              }
                              if (firstelement.innerHTML==="EN COURS") {
                                  //console.log(firstelement,firstelement.innerHTML);
                                  let statutcarte=document.querySelectorAll('p[data-statut]');
                                  //console.log(statutcarte);
                                  statutcarte.forEach((souselement)=>{
                                    if (souselement.id===element.id) {
                                        //console.log(souselement);
                                        element.addEventListener('mouseover',function stautchange2(){
                                                //console.log( souselement.dataset.statut);
                                                souselement.dataset.statut="encours";
                                                souselement.innerHTML=souselement.dataset.statut;
                                                //console.log(config,element.id,carteid1);
                                                if (element.id===carteid1 ) {
                                              
                                                  Object.defineProperty(config, "carte1statut", {
                                                      enumerable: false,
                                                      configurable: true,
                                                      writable: false,
                                                      value: "encours"
                                                    });
                                                    //console.log(config);
                                                  } 
                                               
                                              if (element.id===carteid2) {
                                                //console.log(element.id)
                                              Object.defineProperty(config, "carte2statut", {
                                                  enumerable: false,
                                                  configurable: true,
                                                  writable: false,
                                                  value: "encours"
                                                });
                                              }
                                            if (element.id===carteid3) {
                                              //console.log(element.id)
                                            Object.defineProperty(config, "carte3statut", {
                                                enumerable: false,
                                                configurable: true,
                                                writable: false,
                                                value: "encours"
                                              });
                                              }
                                          
                                            if (element.id===carteid4) {
                                                //console.log(element.id)
                                              Object.defineProperty(config, "carte4statut", {
                                                  enumerable: false,
                                                  configurable: true,
                                                  writable: false,
                                                  value: "encours"
                                                });
                                            }
                                        
                                               
                                        })
                                    } 
                                      //console.log(souselement.id);
                                  })
                              }
                              if (firstelement.innerHTML==="TERMINE") {
                                  //console.log(firstelement,firstelement.innerHTML);
                                  let statutcarte=document.querySelectorAll('p[data-statut]');
                                  //console.log(statutcarte);
                                  statutcarte.forEach((souselement)=>{
                                    if (souselement.id===element.id) {
                                        //console.log(souselement);
                                        element.addEventListener('mouseover',function stautchange3(){
                                                //console.log( souselement.dataset.statut);
                                                souselement.dataset.statut="termine";
                                                souselement.innerHTML=souselement.dataset.statut;
                                                //console.log(config,element.id,carteid1);
                                                if (element.id===carteid1 ) {
                                              
                                                  Object.defineProperty(config, "carte1statut", {
                                                      enumerable: false,
                                                      configurable: true,
                                                      writable: false,
                                                      value: "termine"
                                                    });
                                                    //console.log(config);
                                                  } 
                                               
                                              if (element.id===carteid2) {
                                                //console.log(element.id)
                                              Object.defineProperty(config, "carte2statut", {
                                                  enumerable: false,
                                                  configurable: true,
                                                  writable: false,
                                                  value: "termine"
                                                });
                                              }
                                            if (element.id===carteid3) {
                                              //console.log(element.id)
                                            Object.defineProperty(config, "carte3statut", {
                                                enumerable: false,
                                                configurable: true,
                                                writable: false,
                                                value: "termine"
                                              });
                                              }
                                          
                                            if (element.id===carteid4) {
                                                //console.log(element.id)
                                              Object.defineProperty(config, "carte4statut", {
                                                  enumerable: false,
                                                  configurable: true,
                                                  writable: false,
                                                  value: "termine"
                                                });
                                            }
                                        })
                                    } 
                                      //console.log(souselement.id);
                                  })
                              }

                              //console.log(zone);
                              //console.log("element:", element);

                              lists.forEach((zone) => {
                                  zone.removeEventListener("drop", display);
                                  //console.log(zone);
                              });
                          }

                          //sur chaque carte on effectue un evement d'activation du déplacement
                          //console.log("dragstart", e);
                          // draggedItem = element; // 1 elt deplacé = un item
                          setTimeout(function () {
                              element.style.display = "none"; // chaque item n'a pas de style display particulier
                          }, 0);

                          lists.forEach((zone) => {
                              zone.addEventListener("dragover", function (e) {
                                  e.preventDefault();
                              });
                              zone.addEventListener("dragenter", function (e) {
                                  e.preventDefault();
                              });
                              zone.addEventListener("drop", display);
                              //console.log(zone);
                          });
                      });

                      element.addEventListener("dragend", function () {
                          // sur chaque carte on effectue un evement de fin du déplacement
                          //console.log("dragend",element);

                          
                          setTimeout(function (e) {
                              element.style.display = "block"; // chaque item déplacé a style display particulier block
                              //  draggedItem = null;
                          }, 0);
                      });
                  })


              }
          ).catch(er => {
             console.log(er);
          });
      }
      fetchDATA();


    }
  


  
  }