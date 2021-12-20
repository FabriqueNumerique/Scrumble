import Controller from "../core/Controller.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {
  io
} from "socket.io-client";
import listcarte from "../component/listCarte.js"

export default class Jeu extends Controller {
  constructor() {
    super();

    this.jeu();
    this.createModal();
// this.createDice();
    //  this.traitementUserstorie();   
    // this.getRandomNumber()
    //  this.traitementformulaire();
    // this.createCarte();
    // this.validate();
   
    this.Makeplateau();

  
  }
  jeu(){
    const player = {

      host: false,
      roomId: null,
      username: "",
      socketId: "",
      role: "",
      statut: ""
    };

    console.log(player);

    let joueurs = this.state.joueurs; //recupération de la liste  des joueurs
    let config = this.state.paquet[0]; //recuperation des userstories

    console.log(config);

    console.log(joueurs.length);
    const nbretotjoeuer = {
      nbre: joueurs.length
    }
    console.log(nbretotjoeuer);

    let listcolor = ["cyan", "purple", "white", "red", "blue", "yellow", "green", "orange", "pink", "lime"];

    let color = [];
    console.log(color);

    for (let i = 0; i < joueurs.length; i++) {
      if (joueurs[i].statut === "Developpeur") {
        Object.defineProperty(joueurs[i], 'color', {
          value: listcolor[i],
          writable: false
        });
        color.push(joueurs[i].color);
        console.log(color);
      }

      console.log(joueurs);
    }


    // ///////modal://///////////////////////////////////////////////
 
// this.traitementformulaire()
    let formsessions = document.getElementById("salon");
    const inputvalue = document.getElementById("username");
    const carduser = document.querySelector("#usercard");

    let toddolist = document.getElementById('roomcard');
    let listsalon = document.getElementById('myUL');
    const linkToShare = document.getElementById('link-to-share');
    const room = document.getElementById('room');
    console.log(room);
    // const username=document.getElementById('joueurduroom');
    console.log(username);
    console.log(listsalon, "etat i");
    console.log(formsessions, inputvalue, toddolist);


    let afficheresult = document.getElementById("#resultatTirage");
    let textDe = "";
    let numberDe;
    let textResult = "";
    let tableauDesRes = [];


    // creation des joueurs et des dés.
    console.log(joueurs.statut);
    console.log(joueurs);
    // let nomJoueur = this.state.joueurs.name;
    console.log("Hic");
    //console.log(typeof joueurs); //verification du type de donnée récupérer
    //console.log(this.state.joueurs.length); //récupération de la longueur de la liste de joueurs
    let nbrejoeur = joueurs.length - 2; //récupération de la longueur de la liste de joueurs de type developpeurs

    //    création du dé:
    let eltref = document.getElementById("ref");
    eltref.style.display = "flex";
    eltref.style.flexDirection = "row";
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Debut  de la partie socket //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    let cadrechoix = document.getElementById('cadrechoix');

    formsessions.onsubmit = function (e) {
      e.preventDefault();

      ////////////////////////partie pur socket.io://///////////////////////

      // let socket;

      const socket = io('http://localhost:3051').connect()
      console.log(socket);
     


      socket.on('statejoueurscommun', (sysstateencommun) => {
        joueurs = JSON.parse(sysstateencommun);
        console.log('sys', sysstateencommun, joueurs);
      })


      const sysJson = JSON.stringify(joueurs);
      console.log(sysJson);
      socket.emit('joeuers', sysJson);
      console.log(joueurs);

      player.username = inputvalue.value;
      player.host = true;
      player.socketId = socket.id;
      console.log(socket.id);
      console.log(player);
      carduser.innerHTML = " ";
      let parauser = document.createElement('p');
      parauser.innerHTML = 'Partagez ce lien afin d inviter les autres joueurs à te rejoindre :';
      carduser.appendChild(parauser);

      // let firstlistgameur=Object.values( player);
      // console.log(firstlistgameur);
      // socket.emit('joueur', JSON.parse(this.state.joueurs));
      socket.emit('playerData', player);

      socket.emit('playernbre', nbretotjoeuer);
      console.log('playernbre', nbretotjoeuer);
      //  socket.on('statejoueurscommun',(sysstateencommun)=>{ 
      //     joueurs=JSON.parse(sysstateencommun);
      //     console.log(sysstateencommun,joueurs);
      //   });
      let listsocket = [];
      socket.on('socketnecessaireaconnection', (idsocket) => {
        console.log(idsocket);
        player.socketId = idsocket;
        listsocket.push(idsocket);
        console.log(listsocket, player, joueurs);

      });
      socket.on('join room', (roomId) => {
        player.roomId = roomId;
        console.log(roomId);

        socket.on('listplayername', (listplayer) => {
          console.log("ff:", listplayer, joueurs, player)
        });
        console.log(joueurs, player.role);
        // for (let id = 0; id < joueurs.length; id++) {
        //   console.log(joueurs[id].name);
        //   if (player.role === joueurs[id].name) {
        //     console.log("toto:", linkToShare.innerHTML, joueurs[id].name);
        //   }
        // }
        linkToShare.innerHTML = " ";

        console.log(linkToShare);
        console.log(joueurs);
        console.log(socket.id);
        console.log(socket);

        if (linkToShare.innerHTML == " ") {

          cadrechoix.innerHTML = `<p>vous choississez d'incarner:</p>`
          let formchoix = document.createElement('form');
          formchoix.id = 'formchoix';
          formchoix.classList.add('formchoix');
          cadrechoix.appendChild(formchoix);
          let select = document.createElement('select');
          let buttonvalidationchoix = document.createElement('button');
          buttonvalidationchoix.innerHTML = "Go to Play";
          buttonvalidationchoix.classList.add("reussite");
          buttonvalidationchoix.style.marginRight = "10%";
          buttonvalidationchoix.style.width = "25%";
          buttonvalidationchoix.style.marginLeft = "25%";
          select.getAttribute('name', 'role');
          select.id = "role-select";
          console.log(player);
          let gameur = Object.values(player);
          console.log(gameur, player);
          let val = Object.values(joueurs);
          console.log(val, val[0]);

          let optionsHTML = "";

          for (let player = 0; player < joueurs.length; player++) {
            optionsHTML += `<option value="${val[player].statut}"> ${val[player].name}</option>`;
          };

          select.innerHTML = optionsHTML;
          console.log(select.innerHTML);

          formchoix.appendChild(select);
          formchoix.appendChild(buttonvalidationchoix);

          console.log(cadrechoix);
          // formechoix traitement: methode
          document.getElementById('formchoix').addEventListener('submit', () => {
            const validateChoice = confirm('Confirmez-vous votre choix?');
            if (validateChoice) {
              var option = select.options[select.selectedIndex];
              console.log(option, option.value, option.text);
              cadrechoix.innerHTML = "<p> vous etes:" + "  " + option.text + "   " + option.value + "</p>";
              player.role = option.text;
              player.statut = option.value;
              console.log(player.statut, player);
              console.log(gameur.statut);
              console.log(gameur, player);
              console.log(joueurs, joueurs[0]);

              for (let h = 0; h < joueurs.length; h++) {
                if (player.role === joueurs[h].name) {

                  linkToShare.innerHTML = `<a class="lienroom" href="${window.location.href}?room=${player.roomId}" target="_blank" id="lien"> ${window.location.href}?room=${player.roomId}</a>`;
                  console.log(player);
                  console.log("toto:", linkToShare.innerHTML);
                }
              };

            } else {
              alert("vous avez un probleme!! relancer le jeu depuis le départ (étape1)");
            }
            for (let id = 0; id < joueurs.length; id++) {
              if (player.role === joueurs[id].name) {
                Object.defineProperty(joueurs[id], 'idsocket', {
                  value: player.socketId,
                  writable: false
                });
                console.log(joueurs, player.role)
              }
            }


          });
          // fin formchoix traitement


          // socket.emit('playerData', player);

        }
        console.log(joueurs);

        console.log(nbrejoeur);
        console.log(joueurs);
        //  envoyer le state en socket idée send() ou io.emit() recherche set ?
        // io.to(roomId).emit('statejoueur',joueurs);

        //console.log(nbrejoeur);
        let nmbredejoeur = document.getElementById("nmbredejoeur");
        let list = document.getElementById("listJoueur");
        console.log(list);
        nmbredejoeur.style.fontSize = "1.1em";
        //selection balise ou id = nmbredejoeur
        let nameJoueur = document.getElementById("nameJoeur"); //selection balise ou id = namedejoeur
        let myarray = {};
        let listimage = ["url('../../assets/img/pagoda.png')", "url('../../assets/img/monument-de-la-democratie.png')", "url('../../assets/img/atomium.png')", "url('../../assets/img/chichen-itza.png')", "url('../../assets/img/egyptian.png')", "url('../../assets/img/eiffel-tower.png')", "url('../../assets/img/giza.png')", "url('../../assets/img/statue-of-liberty.png')", "url('../../assets/img/torii-gate.png')", "url('../../assets/img/pisa.png')"];
        let image = [];
        
        for (let index = 0; index < joueurs.length; index++) {
          if (joueurs[index].statut === "Developpeur") {
            Object.defineProperty(joueurs[index], 'image', {
              value: listimage[index],
              writable: false
            });
            image.push(joueurs[index].image);
            console.log(image);
          }
          console.log(joueurs);
        }
        console.log(joueurs);
        console.log(listimage.length);
        let text = ""; //definition d'une varaible qui posséde le texte (nom des joueurs) comme valeur donc initialement est vide
        //let nameDev = "";definition d'une variable avec le role identique que la variable text mais servant dans le cas du Dé;

        // ajout des cartes 
        // création des cartes 
        // methode traitement des cartes:
        // création des cartes ////////////////////////////////////////////////////
        // creation de cartes methodes pb creation de cartes 
        ///////////////////////////////////////////////////////////////////////////////
          // this.createCard()
                  // création des cartes 
    let tabident1 = [];
    let carteDayli = listcarte[0];
    fetch(carteDayli)
      .then(res => res.json()).then(data => {
          data.forEach(listedata => {
            tabident1.push(listedata._id);
            console.log(listedata._id,tabident1);
          })
        }

      );
      console.log(tabident1);


    let carteRevue = listcarte[1];
    let tabident2 = [];

    fetch(carteRevue)
      .then(res => res.json()).then(data => {
          data.forEach(listedata => {
            tabident2.push(listedata._id);
            console.log(listedata._id,tabident2);
          })
        }

      );
      console.log(tabident2);

    let cartePb = listcarte[2];
    let tabident3 = [];
    fetch(cartePb)
      .then(res => res.json()).then(data => {
          data.forEach(listedata => {
            tabident3.push(listedata._id);
            console.log(listedata._id,tabident3, data);
          })
        }

      );
      console.log(tabident3);

    let colorcard = ["blue", "green", "red"];
    let idList = ["carteday", "carterev", "cartepb"];
    let backid = ["backid1", "backid2", "backid3"];
    let minicarte0 = document.getElementById(idList[0]);
    let minicarte1 = document.getElementById(idList[1]);
    let minicarte2 = document.getElementById(idList[2]);
    let minicarte = [minicarte0, minicarte1, minicarte2];

    console.log(idList);

    let longtab = idList.length;
    
    let controlCard = [carteDayli, carteRevue, cartePb];
    // });
    // creation des cartes:
    for (let h = 0; h < longtab; h++) {
      minicarte[h].addEventListener("click", createbigcard);
      //devient ()=>this.createbigCard()
      

      let nbreclick1 = 0;
      let nbreclick2 = 0;
      let nbreclick3 = 0;
      let nbrclick = [nbreclick1, nbreclick2, nbreclick3];
       console.log(nbrclick[h]);
       
       nbrclick[h]; 

      function createbigcard() {

        nbrclick[h]++;
        console.log(nbrclick);
        console.log("nbrclick0:", nbrclick[0], "nbrclick1:", nbrclick[1], "nbrclick2:", nbrclick[2]);
        console.log(minicarte[h], nbrclick[h]);

        let carte = document.getElementById("carte");
        // carte.style.border="10px solid red";
        carte.addEventListener("click", flipcard);
         //devient ()=>this.create
        console.log(carte);
        let front = document.createElement("div");
        front.classList.add("front");
        front.style.backgroundColor = colorcard[h];
        console.log(colorcard[h], front);
        let back = document.createElement("div");
        console.log(back);
        if (front.style.backgroundColor == colorcard[h]) {

          back.classList.add("back");
          back.id = backid[h];
          back.style.border = "5px solid " + colorcard[h];
          back.style.color = "black";
          let titre = document.createElement('h3');
          let paragraphe = document.createElement('p');
          let croix = document.createElement('p');
          croix.innerText = "+";
          croix.id = "interet1";
          croix.classList.add("croix1");

          if (back.id == "backid1") {
            let urlfetch = controlCard[0];
         
            console.log(urlfetch, nbrclick[0],tabident1[nbrclick[0]-1]);
            fetch(urlfetch +'/'+ tabident1[nbrclick[0]-1])
              .then(res => res.json())
              .then(data => {
                  titre.innerText = `${data.titre}`;
                  paragraphe.innerText = `${data.contenu}`;
                }

              );
            paragraphe.style.fontSize = "0.9em";
            back.appendChild(titre);
            back.appendChild(paragraphe);
            back.appendChild(croix);

          } else if (back.id == "backid2") {
            let urlfetch = controlCard[1];
            console.log(urlfetch, nbrclick[1],tabident2[nbrclick[1]-1] );
            //  for (let i = 1; i < 11; i++) { 
            fetch(urlfetch +'/'+ tabident2[nbrclick[1]-1])
              .then(res => res.json())
              .then(data => {
                  titre.innerText = `${data.titre}`;
                  paragraphe.innerText = `${data.contenu}`;
                }

              );
            paragraphe.style.fontSize = "0.9em";
            back.appendChild(titre);
            back.appendChild(paragraphe);
            back.appendChild(croix);

          } else if (back.id == "backid3") {
            
            let urlfetch = controlCard[2];
            console.log(urlfetch, nbrclick[2],controlCard[2],tabident3); 

            fetch(urlfetch +'/'+ tabident3[nbrclick[2]-1])
              .then(res => res.json())
              .then(data => {
               
                  titre.innerText = `${data.titre}`;
                  paragraphe.innerText = `${data.contenu}`;
                }

              );
            paragraphe.style.fontSize = "0.9em";
            back.appendChild(titre);
            back.appendChild(paragraphe);
            back.appendChild(croix);

          }

        };
        carte.appendChild(front);
        carte.appendChild(back);


        let croixclick = document.getElementById("interet1");
        console.log(croixclick);
        croixclick.addEventListener("click", validate);
        // devient ()=>this.validate();

        function validate() {

          croixclick.innerHTML = `<span class=cercle> \ud83d\udc4d </span>`;
          setTimeout(function () {
            let carte = document.getElementById("carte");
            console.log(carte);

            // carte validée
            let carteaurebus = document.getElementById("carterebu");
            console.log("xx:", carteaurebus);
            let frontrejet = document.createElement("div");
            frontrejet.classList.add("front");

            if (front.style.backgroundColor == "blue") {
              frontrejet.style.backgroundColor = colorcard[h];
            } else if (front.style.backgroundColor == "green") {
              frontrejet.style.backgroundColor = colorcard[h];
            } else if (front.style.backgroundColor == "red") {
              frontrejet.style.backgroundColor = colorcard[h];
            }
            carteaurebus.appendChild(frontrejet);
            carte.innerHTML = "";
            carte.classList.remove("active");
          }, 3000)
        }
      }

      function flipcard() {
        carte.classList.add("active");
      }
    }
    

        //////////////////////////////////////////////////////////////////////////////////
        //Fin de carte//
        /////////////////////////////////////////////////////////////////////////

        ////////////////////////////
        //create dice
        ////////////////////////////////////////
       // this.createDice(); 
        if (joueurs.length >= 3) { //possibilité de jouer si le il y  a au minimun 3 membres choisis
          if (joueurs != "") { //si la liste des joeurs  existe
            let developpeurs = joueurs.filter((e) => e.statut === 'Developpeur')
            console.log('deve', developpeurs, typeof (developpeurs));
            console.log(joueurs);
            let Die = ["die-0", "die-1", "die-2", "die-3", "die-4", "die-5", "die-6", "die-7", "die-8", "die-9", "die-10"];
            for (let i = 0; i < nbrejoeur; i++) {

              let overlay = document.createElement("a");
              overlay.setAttribute("href", "#");
              overlay.style.marginRight = "5%";
              overlay.classList.add("die-overlay");
              let list = document.createElement("ol");
              list.classList.add("die-list");
              list.classList.add("even-roll");
              list.setAttribute("data-roll", "");
              list.setAttribute("data-level", i + 1);
              list.innerHTML = `
                 <li class="die-item" data-side="1">
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="2">
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="3">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="4">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="5">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="6">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>;
              `


              list.id = "die-" + i;
              console.log(list.id);
              overlay.appendChild(list);
              eltref.append(overlay);
              console.log(joueurs);

              let cube1 = document.getElementById("die-0");
              let cube2 = document.getElementById("die-1");
              let cube3 = document.getElementById("die-2");
              let cube4 = document.getElementById("die-3");
              let cube5 = document.getElementById("die-4");
              let cube6 = document.getElementById("die-5");
              let cube7 = document.getElementById("die-6");
              let cube8 = document.getElementById("die-7");
              let cube9 = document.getElementById("die-8");
              let cube10 = document.getElementById("die-9");

              let cube = [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10];
              console.log(cube[0]);

              if (cube[i] != " ") {
                console.log(cube[i]);
                let face = cube[i].querySelectorAll("li.die-item");
                console.log(face);
                for (var j = 0; j < face.length; j++) {

                  console.log(face[1]);
                  face[j].style.background = color[i];
                  console.log(face[j].style.background, color[i]);
                }
              }


              for (let i = 0; i < joueurs.length; i++) {
                if (joueurs[i].statut === "Developpeur") {
                  console.log(joueurs);
                  Object.defineProperty(joueurs[i], 'cube', {
                    value: Die[i],
                    writable: false
                  });

                }

                console.log("list:", joueurs);
              }

              console.log("toto:", joueurs[i].statut);

            }

            console.log(listsocket);
            console.log("xxx:", joueurs[2], player);
            console.log(typeof (joueurs), joueurs);

            let dice = [...document.querySelectorAll(".die-overlay")];

            //console.log(dice);
            dice.forEach(De => { //boucle sur chaque div auquel on applique un evenement click qui lance la fonction selectionner

              console.log(player.statut);
              De.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(player.statut);
                if (player.statut === "Developpeur") {

                  rollDice(e, De);

                } else {
                  alert('vous n avez pas le droit de jouer car vous etes soit scrum master soit product owner');
                }

              });
            });
           // creation de pion 
          //  creation methode create pion ajout de let color =[] et player
            let backapion = document.getElementById("backapion");
            if (player.statut != "Scrum Master" && player.statut != "Product Owner") {
              for (let i = 0; i < developpeurs.length; ++i) {

                const syscolor = document.createElement("div");
                syscolor.classList.add("cercles");
                syscolor.style.background = color[i];
                console.log(color[i]);
                syscolor.setAttribute("draggable", "true");
                syscolor.classList.add("itemGame");

                //// ////////////////////////////////////////////////////////////////

                backapion.style.display = "flex";
                backapion.style.flexDirection = "row";
                console.log(backapion);
                let pion = document.createElement('div');
                pion.classList.add("pion");
                console.log(pion);
                // socket.emit('custom-evenet', pion);
                const label = document.createElement("span");
                console.log(label);
                label.style.marginTop = "2%";
                label.style.marginRight = "1%";
                label.innerHTML = developpeurs[i].name;
                label.style.color = color[i];
                console.log(developpeurs[0]);
                // pion
                pion.style.backgroundColor = label.style.color;

                console.log(pion);

                console.log(joueurs, joueurs[i].image);
                pion.style.backgroundImage = image[i];

                console.log(pion.style.backgroundImage, image[i]);
                //  modification du pion essaie depot par drag and drop sur cerle
                console.log(backapion, pion, pion.length)
                let pions = document.querySelectorAll('.pion');
                console.log(pions, pions.length);
                // fin pion

                // la variable text est rempli par l'iteration de noms des joueurs
                console.log(developpeurs[i].name, "....", text);
                // nameJoueur.innerHTML =  text ;
                backapion.append(pion);
                nameJoueur.append(label);

                list.append(syscolor);
                console.log(syscolor);

                nameJoueur.classList.add("repartition");
                nameJoueur.style.width = "100%";


                // this.traitementUserstorie();
                // traitement de la partie usersstories en cours creation methode TraitementUserstories
                let dettetechnique = document.getElementById("dettetech");
                console.log(dettetechnique);
                dettetechnique.innerHTML = config.dettetechnique;
                // traitement arrive des userstories:

                let listUserstories = document.getElementById('listUserstories');

                console.log(listUserstories, config);
                // listUserstories.innerHTML = "";


                let carteid1 = config.carte1;
                let valuecarteid1 = parseInt(carteid1);
                console.log(valuecarteid1);
                let carteid2 = config.carte2;
                let valuecarteid2 = parseInt(carteid2);
                console.log(valuecarteid2);
                let carteid3 = config.carte3;
                let valuecarteid3 = parseInt(carteid3);
                console.log(valuecarteid3);
                let carteid4 = config.carte4;
                let valuecarteid4 = parseInt(carteid4);
                console.log(valuecarteid4);
                let configuration = config.url;
                console.log(configuration, carteid1, carteid2, carteid3, carteid4);

                // const listUserstories = document.getElementById("listUserstories");

                // loadCharacters function => method

                let hpCharacters = [];


                const loadCharacters = async () => {
                  try {
                    const res = await fetch(config.url);
                    hpCharacters = await res.json();
                    console.log(res + "  " + hpCharacters);
                    displayCharacters(hpCharacters);
                  } catch (err) {
                    console.error(err);
                  }
                };
                const displayCharacters = (characters) => {
                  const htmlString = characters
                    .map((character) => {
                      console.log(character);
                      if ((config.carte1statut === 'encours' && character.id === valuecarteid1) || (config.carte2statut === 'encours' && character.id === valuecarteid2) || (config.carte3statut === 'encours' && character.id === valuecarteid3) || (config.carte4statut === 'encours' && character.id === valuecarteid4)) {
                        console.log(config.carte1statut, config.carte2statut, config.carte3statut, config.carte4statut);

                        return `
                            <div class="insideboxcadre">
                                <p class="insideboxtext">Userstorie N°${character.id} </p>
                                <p style="margin-left: 2% ;margin-right: 2%;">|</p>
                                <p class="insideboxtext"> ${character.taille} </span></p>
                                <p style="margin-left: 2% ;margin-right: 2%;">|</p>
                                <p class="cadrebox"> </p> 
                            </div>`;


                      }

                    })
                    .join('');
                  listUserstories.innerHTML = htmlString;
                  // /////////////////////dette technique://////////////
                  dettetechnique.innerHTML = config.dettetechnique;
                  /////// creation du drage and drop sur accordeon
                  const zonejoueur = document.querySelectorAll('.cadrebox');
                  const itemGame = document.querySelectorAll('.itemGame');
                  console.log(zonejoueur, itemGame);
                  let draggedItem = null;
                  itemGame.forEach((element) => {
                    // const item = element[i];
                    // console.log(element[i])

                    element.addEventListener("dragstart", function (e) {
                      const element = e.target;

                      function display(e) {
                        const zone = e.target;
                        zone.append(element);
                        console.log("elment", element);

                        zonejoueur.forEach((zone) => {
                          zone.removeEventListener("drop", display);
                        });
                      }

                      //sur chaque carte on effectue un evement d'activation du déplacement
                      console.log("dragstart", e);
                      // draggedItem = element; // 1 elt deplacé = un item
                      setTimeout(function () {
                        element.style.display = "none"; // chaque item n'a pas de style display particulier
                      }, 0);

                      zonejoueur.forEach((zone) => {
                        zone.addEventListener("dragover", function (e) {
                          e.preventDefault();
                        });
                        zone.addEventListener("dragenter", function (e) {
                          e.preventDefault();
                        });
                        zone.addEventListener("drop", display);
                      });
                    });

                    element.addEventListener("dragend", function () {
                      // sur chaque carte on effectue un evement de fin du déplacement
                      console.log("dragend");
                      setTimeout(function (e) {
                        element.style.display = "block"; // chaque item déplacé a style display particulier block
                        //  draggedItem = null;
                      }, 0);
                    });
                  });
                  ///////////////////////////////fin dragenddrop////////
                };


                loadCharacters();

              // fin de la methode userstories//

            

                console.log(listUserstories, config.carte1statut);
                if (config.carte1statut === 'encours' || config.carte2statut === 'encours' || config.carte3statut === 'encours' || config.carte4statut === 'encours') {
                  console.log('resultat', config.carte1statut, config.carte2statut, config.carte3statut, config.carte4statut);

                }
                  
              }
              nmbredejoeur.innerHTML = nbrejoeur;
            } //le nombre de developpeur est affiché comme contenu de la balise nmbrejoeur;
          } else {
            //console.log(nbrejoeur);
            alert("le nombre de developpeur n'est pas au minimun égal à 1! retournez à l'étape 1 pour continuer à joeur")
          }
        } else {
          //console.log(nbrejoeur);
          alert("le nombre de developpeur n'est pas au minimun égal à 1! retournez à l'étape 1 pour continuer à joeur")
        }
        // transformation en méthode 
        function rollDice(e, elmt) {

          console.log(elmt);
          // console.log(e);
          let afficheresult = document.getElementById("resultatTirage");
          afficheresult.style.marginTop = "-10%";
          console.log("resultat:", afficheresult, console.log(e.target));
          let result = " ";
          console.log(result);
          // console.log('deve', developpeurs)
          // console.log(elmt);
          const die = elmt.firstElementChild;

          toggleClasses(die);
          console.log(die);
          die.dataset.roll = getRandomNumber(1, 6);

          result = die.dataset.roll;

          console.log(socket);

          setTimeout(function () {
            let listeDe = document.querySelectorAll("ol[data-level]");
            console.log(listeDe);
            let developpeurs = joueurs.filter((e) => e.statut === 'Developpeur')
            console.log('deve', developpeurs);
            for (let i = 0; i < developpeurs.length; ++i) {


              console.log(numberDe);
              let listDice = listeDe.forEach(Res => {
                tableauDesRes = [Res.dataset.roll];
                console.log("resultat dans tableau sont" + developpeurs[i].name + tableauDesRes);
              });
              console.log(listeDe);
              console.log("le array du resultat" + tableauDesRes);
              myarray[developpeurs[i].name] = tableauDesRes;
              console.log("le array du resultat" + myarray[developpeurs[i].name]);

            }
            afficheresult.innerHTML = "Votre dé a pour resultat:" + result;

          }, 1000);

        }
        // transformation en méthode
        function toggleClasses(die) {
          die.classList.toggle("odd-roll");
          die.classList.toggle("even-roll");
        }
         // transformation en méthode
        function getRandomNumber(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        ///////////////////////////
        //fin createDice
        ///////////////////////////////////////////////
      });

    }


    // socket.emit('statejeu',joueurs);

    // creation objet avec resultat

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
  createModal(){
    function modal() {
      var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("myBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks on the button, open the modal
 btn.onclick = function () {
   modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

 }
modal()

  }
  // traitementUserstorie(){
  //   let config = this.state.paquet[0]; //recuperation des userstories
  //   let dettetechnique = document.getElementById("dettetech");
  //   console.log(dettetechnique);
  //   dettetechnique.innerHTML = config.dettetechnique;
  //   // traitement arrive des userstories:

  //   let listUserstories = document.getElementById('listUserstories');

  //   console.log(listUserstories, config);
  //   // listUserstories.innerHTML = "";


  //   let carteid1 = config.carte1;
  //   let valuecarteid1 = parseInt(carteid1);
  //   console.log(valuecarteid1);
  //   let carteid2 = config.carte2;
  //   let valuecarteid2 = parseInt(carteid2);
  //   console.log(valuecarteid2);
  //   let carteid3 = config.carte3;
  //   let valuecarteid3 = parseInt(carteid3);
  //   console.log(valuecarteid3);
  //   let carteid4 = config.carte4;
  //   let valuecarteid4 = parseInt(carteid4);
  //   console.log(valuecarteid4);
  //   let configuration = config.url;
  //   console.log(configuration, carteid1, carteid2, carteid3, carteid4);

  //   // const listUserstories = document.getElementById("listUserstories");

  //   // loadCharacters function => method

  //   let hpCharacters = [];


  //   const loadCharacters = async () => {
  //     try {
  //       const res = await fetch(config.url);
  //       hpCharacters = await res.json();
  //       console.log(res + "  " + hpCharacters);
  //       displayCharacters(hpCharacters);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   const displayCharacters = (characters) => {
  //     const htmlString = characters
  //       .map((character) => {
  //         console.log(character);
  //         if ((config.carte1statut === 'encours' && character.id === valuecarteid1) || (config.carte2statut === 'encours' && character.id === valuecarteid2) || (config.carte3statut === 'encours' && character.id === valuecarteid3) || (config.carte4statut === 'encours' && character.id === valuecarteid4)) {
  //           console.log(config.carte1statut, config.carte2statut, config.carte3statut, config.carte4statut);

  //           return `
  //               <div class="insideboxcadre">
  //                   <p class="insideboxtext">Userstorie N°${character.id} </p>
  //                   <p style="margin-left: 2% ;margin-right: 2%;">|</p>
  //                   <p class="insideboxtext"> ${character.taille} </span></p>
  //                   <p style="margin-left: 2% ;margin-right: 2%;">|</p>
  //                   <p class="cadrebox"> </p> 
  //               </div>`;


  //         }

  //       })
  //       .join('');
  //     listUserstories.innerHTML = htmlString;
  //     // /////////////////////dette technique://////////////
  //     dettetechnique.innerHTML = config.dettetechnique;
  //     /////// creation du drage and drop sur accordeon
  //     const zonejoueur = document.querySelectorAll('.cadrebox');
  //     const itemGame = document.querySelectorAll('.itemGame');
  //     console.log(zonejoueur, itemGame);
  //     let draggedItem = null;
  //     itemGame.forEach((element) => {
  //       // const item = element[i];
  //       // console.log(element[i])

  //       element.addEventListener("dragstart", function (e) {
  //         const element = e.target;

  //         function display(e) {
  //           const zone = e.target;
  //           zone.append(element);
  //           console.log("elment", element);

  //           zonejoueur.forEach((zone) => {
  //             zone.removeEventListener("drop", display);
  //           });
  //         }

  //         //sur chaque carte on effectue un evement d'activation du déplacement
  //         console.log("dragstart", e);
  //         // draggedItem = element; // 1 elt deplacé = un item
  //         setTimeout(function () {
  //           element.style.display = "none"; // chaque item n'a pas de style display particulier
  //         }, 0);

  //         zonejoueur.forEach((zone) => {
  //           zone.addEventListener("dragover", function (e) {
  //             e.preventDefault();
  //           });
  //           zone.addEventListener("dragenter", function (e) {
  //             e.preventDefault();
  //           });
  //           zone.addEventListener("drop", display);
  //         });
  //       });

  //       element.addEventListener("dragend", function () {
  //         // sur chaque carte on effectue un evement de fin du déplacement
  //         console.log("dragend");
  //         setTimeout(function (e) {
  //           element.style.display = "block"; // chaque item déplacé a style display particulier block
  //           //  draggedItem = null;
  //         }, 0);
  //       });
  //     });
  //     ///////////////////////////////fin dragenddrop////////
  //   };


  //   loadCharacters();

  // }
// createCard(){
//   socket.on('join room', (roomId) => {
//     player.roomId = roomId;

//     let tabident1 = [];
//     let carteDayli = "http://localhost:3051/api/dayli";
//     fetch(carteDayli)
//       .then(res => res.json()).then(data => {
//           data.forEach(listedata => {
//             tabident1.push(listedata._id);
//             console.log(listedata._id,tabident1);
//           })
//         }

//       );
//       console.log(tabident1);


//     let carteRevue = "http://localhost:3051/api/revuecarte";
//     let tabident2 = [];

//     fetch(carteRevue)
//       .then(res => res.json()).then(data => {
//           data.forEach(listedata => {
//             tabident2.push(listedata._id);
//             console.log(listedata._id,tabident2);
//           })
//         }

//       );
//       console.log(tabident2);

//     let cartePb = "http://localhost:3051/api/Pbcarte";
//     let tabident3 = [];
//     fetch(cartePb)
//       .then(res => res.json()).then(data => {
//           data.forEach(listedata => {
//             tabident3.push(listedata._id);
//             console.log(listedata._id,tabident3, data);
//           })
//         }

//       );
//       console.log(tabident3);

//     let colorcard = ["blue", "green", "red"];
//     let idList = ["carteday", "carterev", "cartepb"];
//     let backid = ["backid1", "backid2", "backid3"];
//     let minicarte0 = document.getElementById(idList[0]);
//     let minicarte1 = document.getElementById(idList[1]);
//     let minicarte2 = document.getElementById(idList[2]);
//     let minicarte = [minicarte0, minicarte1, minicarte2];

//     console.log(idList);

//     let longtab = idList.length;
    
//     let controlCard = [carteDayli, carteRevue, cartePb];
//     // });
//     // creation des cartes:
//     for (let h = 0; h < longtab; h++) {
//       minicarte[h].addEventListener("click", createbigcard);

//       let nbreclick1 = 0;
//       let nbreclick2 = 0;
//       let nbreclick3 = 0;
//       let nbrclick = [nbreclick1, nbreclick2, nbreclick3];
//        console.log(nbrclick[h]);
       
//        nbrclick[h]; 

//       function createbigcard() {

//         nbrclick[h]++;
//         console.log(nbrclick);
//         console.log("nbrclick0:", nbrclick[0], "nbrclick1:", nbrclick[1], "nbrclick2:", nbrclick[2]);
//         console.log(minicarte[h], nbrclick[h]);

//         let carte = document.getElementById("carte");
//         // carte.style.border="10px solid red";
//         carte.addEventListener("click", flipcard);
//         console.log(carte);
//         let front = document.createElement("div");
//         front.classList.add("front");
//         front.style.backgroundColor = colorcard[h];
//         console.log(colorcard[h], front);
//         let back = document.createElement("div");
//         console.log(back);
//         if (front.style.backgroundColor == colorcard[h]) {

//           back.classList.add("back");
//           back.id = backid[h];
//           back.style.border = "5px solid " + colorcard[h];
//           back.style.color = "black";
//           let titre = document.createElement('h3');
//           let paragraphe = document.createElement('p');
//           let croix = document.createElement('p');
//           croix.innerText = "+";
//           croix.id = "interet1";
//           croix.classList.add("croix1");

//           if (back.id == "backid1") {
//             let urlfetch = controlCard[0];
         
//             console.log(urlfetch, nbrclick[0],tabident1[nbrclick[0]-1]);
//             fetch(urlfetch +'/'+ tabident1[nbrclick[0]-1])
//               .then(res => res.json())
//               .then(data => {
//                   titre.innerText = `${data.titre}`;
//                   paragraphe.innerText = `${data.contenu}`;
//                 }

//               );
//             paragraphe.style.fontSize = "0.9em";
//             back.appendChild(titre);
//             back.appendChild(paragraphe);
//             back.appendChild(croix);

//           } else if (back.id == "backid2") {
//             let urlfetch = controlCard[1];
//             console.log(urlfetch, nbrclick[1],tabident2[nbrclick[1]-1] );
//             //  for (let i = 1; i < 11; i++) { 
//             fetch(urlfetch +'/'+ tabident2[nbrclick[1]-1])
//               .then(res => res.json())
//               .then(data => {
//                   titre.innerText = `${data.titre}`;
//                   paragraphe.innerText = `${data.contenu}`;
//                 }

//               );
//             paragraphe.style.fontSize = "0.9em";
//             back.appendChild(titre);
//             back.appendChild(paragraphe);
//             back.appendChild(croix);

//           } else if (back.id == "backid3") {
            
//             let urlfetch = controlCard[2];
//             console.log(urlfetch, nbrclick[2],controlCard[2],tabident3); 

//             fetch(urlfetch +'/'+ tabident3[nbrclick[2]-1])
//               .then(res => res.json())
//               .then(data => {
               
//                   titre.innerText = `${data.titre}`;
//                   paragraphe.innerText = `${data.contenu}`;
//                 }

//               );
//             paragraphe.style.fontSize = "0.9em";
//             back.appendChild(titre);
//             back.appendChild(paragraphe);
//             back.appendChild(croix);

//           }

//         };
//         carte.appendChild(front);
//         carte.appendChild(back);


//         let croixclick = document.getElementById("interet1");
//         console.log(croixclick);
//         croixclick.addEventListener("click", validate);

//         function validate() {

//           croixclick.innerHTML = `<span class=cercle> \ud83d\udc4d </span>`;
//           setTimeout(function () {
//             let carte = document.getElementById("carte");
//             console.log(carte);

//             // carte validée
//             let carteaurebus = document.getElementById("carterebu");
//             console.log("xx:", carteaurebus);
//             let frontrejet = document.createElement("div");
//             frontrejet.classList.add("front");

//             if (front.style.backgroundColor == "blue") {
//               frontrejet.style.backgroundColor = colorcard[h];
//             } else if (front.style.backgroundColor == "green") {
//               frontrejet.style.backgroundColor = colorcard[h];
//             } else if (front.style.backgroundColor == "red") {
//               frontrejet.style.backgroundColor = colorcard[h];
//             }
//             carteaurebus.appendChild(frontrejet);
//             carte.innerHTML = "";
//             carte.classList.remove("active");
//           }, 3000)
//         }
//       }

//       function flipcard() {
//         carte.classList.add("active");
//       }
//     }

//   })

// }
// createDice(){
//   const player = {

//     host: false,
//     roomId: null,
//     username: "",
//     socketId: "",
//     role: "",
//     statut: ""
//   };

//   console.log(player);
//   let joueurs = this.state.joueurs; //recupération de la liste  des joueurs
//     let config = this.state.paquet[0]; //recuperation des userstories
//     let nbrejoeur = joueurs.length - 2; //récupération de la longueur de la liste de joueurs de type developpeurs


//     let listimage = ["url('../../assets/img/pagoda.png')", "url('../../assets/img/monument-de-la-democratie.png')", "url('../../assets/img/atomium.png')", "url('../../assets/img/chichen-itza.png')", "url('../../assets/img/egyptian.png')", "url('../../assets/img/eiffel-tower.png')", "url('../../assets/img/giza.png')", "url('../../assets/img/statue-of-liberty.png')", "url('../../assets/img/torii-gate.png')", "url('../../assets/img/pisa.png')"];
//     let image = [];
//     let listcolor = ["cyan", "purple", "white", "red", "blue", "yellow", "green", "orange", "pink", "lime"];
//     let nameJoueur = document.getElementById("nameJoeur"); //selection balise ou id = namedejoeur
//     let myarray = {};
//     let color = [];
//     console.log(color);
//     let list = document.getElementById("listJoueur");
//     for (let i = 0; i < joueurs.length; i++) {
//       if (joueurs[i].statut === "Developpeur") {
//         Object.defineProperty(joueurs[i], 'color', {
//           value: listcolor[i],
//           writable: false
//         });
//         color.push(joueurs[i].color);
//         console.log(color);
//       }

//       console.log(joueurs);
//     }

//     //    création du dé:
//     let eltref = document.getElementById("ref");
//     eltref.style.display = "flex";
//     eltref.style.flexDirection = "row";
//     console.log(config);

//     console.log(joueurs.length);
//     const nbretotjoeuer = {
//       nbre: joueurs.length
//     }
//     console.log(nbretotjoeuer);
//   if (joueurs.length >= 3) { //possibilité de jouer si le il y  a au minimun 3 membres choisis
//     if (joueurs != "") { //si la liste des joeurs  existe
//       let developpeurs = joueurs.filter((e) => e.statut === 'Developpeur')
//       console.log('deve', developpeurs, typeof (developpeurs));
//       console.log(joueurs);
//       let Die = ["die-0", "die-1", "die-2", "die-3", "die-4", "die-5", "die-6", "die-7", "die-8", "die-9", "die-10"];
//       for (let i = 0; i < nbrejoeur; i++) {

//         let overlay = document.createElement("a");
//         overlay.setAttribute("href", "#");
//         overlay.style.marginRight = "5%";
//         overlay.classList.add("die-overlay");
//         let list = document.createElement("ol");
//         list.classList.add("die-list");
//         list.classList.add("even-roll");
//         list.setAttribute("data-roll", "");
//         list.setAttribute("data-level", i + 1);
//         list.innerHTML = `
//            <li class="die-item" data-side="1">
//           <span class="dot"></span>
//         </li>
//         <li class="die-item" data-side="2">
//           <span class="dot"></span>
//           <span class="dot"></span>
//         </li>
//         <li class="die-item" data-side="3">
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//         </li>
//         <li class="die-item" data-side="4">
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//         </li>
//         <li class="die-item" data-side="5">
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//         </li>
//         <li class="die-item" data-side="6">
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//           <span class="dot"></span>
//         </li>;
//         `


//         list.id = "die-" + i;
//         console.log(list.id);
//         overlay.appendChild(list);
//         eltref.append(overlay);
//         console.log(joueurs);

//         let cube1 = document.getElementById("die-0");
//         let cube2 = document.getElementById("die-1");
//         let cube3 = document.getElementById("die-2");
//         let cube4 = document.getElementById("die-3");
//         let cube5 = document.getElementById("die-4");
//         let cube6 = document.getElementById("die-5");
//         let cube7 = document.getElementById("die-6");
//         let cube8 = document.getElementById("die-7");
//         let cube9 = document.getElementById("die-8");
//         let cube10 = document.getElementById("die-9");

//         let cube = [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10];
//         console.log(cube[0]);

//         if (cube[i] != " ") {
//           console.log(cube[i]);
//           let face = cube[i].querySelectorAll("li.die-item");
//           console.log(face);
//           for (var j = 0; j < face.length; j++) {

//             console.log(face[1]);
//             face[j].style.background = color[i];
//             console.log(face[j].style.background, color[i]);
//           }
//         }


//         for (let i = 0; i < joueurs.length; i++) {
//           if (joueurs[i].statut === "Developpeur") {
//             console.log(joueurs);
//             Object.defineProperty(joueurs[i], 'cube', {
//               value: Die[i],
//               writable: false
//             });

//           }

//           console.log("list:", joueurs);
//         }

//         console.log("toto:", joueurs[i].statut);

//       }

//       // console.log(listsocket);
//       console.log("xxx:", joueurs[2], player);
//       console.log(typeof (joueurs), joueurs);

//       let dice = [...document.querySelectorAll(".die-overlay")];

//       //console.log(dice);
//       dice.forEach(De => { //boucle sur chaque div auquel on applique un evenement click qui lance la fonction selectionner

//         console.log(player.statut);
//         De.addEventListener('click', (e) => {
//           e.preventDefault();
//           console.log(player.statut);
//           if (player.statut === "Developpeur") {

//             rollDice(e, De);

//           } else {
//             alert('vous n avez pas le droit de jouer car vous etes soit scrum master soit product owner');
//           }

//         });
//       });
//      // creation de pion 
//     //  creation methode create pion ajout de let color =[] et player
//       let backapion = document.getElementById("backapion");
//       if (player.statut != "Scrum Master" && player.statut != "Product Owner") {
//         for (let i = 0; i < developpeurs.length; ++i) {

//           const syscolor = document.createElement("div");
//           syscolor.classList.add("cercles");
//           syscolor.style.background = color[i];
//           console.log(color[i]);
//           syscolor.setAttribute("draggable", "true");
//           syscolor.classList.add("itemGame");

//           //// ////////////////////////////////////////////////////////////////

//           backapion.style.display = "flex";
//           backapion.style.flexDirection = "row";
//           console.log(backapion);
//           let pion = document.createElement('div');
//           pion.classList.add("pion");
//           console.log(pion);
//           // socket.emit('custom-evenet', pion);
//           const label = document.createElement("span");
//           console.log(label);
//           label.style.marginTop = "2%";
//           label.style.marginRight = "1%";
//           label.innerHTML = developpeurs[i].name;
//           label.style.color = color[i];
//           console.log(developpeurs[0]);
//           // pion
//           pion.style.backgroundColor = label.style.color;

//           console.log(pion);

//           console.log(joueurs, joueurs[i].image);
//           pion.style.backgroundImage = image[i];

//           console.log(pion.style.backgroundImage, image[i]);
//           //  modification du pion essaie depot par drag and drop sur cerle
//           console.log(backapion, pion, pion.length)
//           let pions = document.querySelectorAll('.pion');
//           console.log(pions, pions.length);
//           // fin pion

//           // la variable text est rempli par l'iteration de noms des joueurs
//           console.log(developpeurs[i].name, "....");
//           // nameJoueur.innerHTML =  text ;
//           backapion.append(pion);
//           nameJoueur.append(label);

//           list.append(syscolor);
//           console.log(syscolor);

//           nameJoueur.classList.add("repartition");
//           nameJoueur.style.width = "100%";

//           // traitement de la partie usersstories en cours creation methode TraitementUserstories
//           let dettetechnique = document.getElementById("dettetech");
//           console.log(dettetechnique);
//           dettetechnique.innerHTML = config.dettetechnique;
//           // traitement arrive des userstories:

//           let listUserstories = document.getElementById('listUserstories');

//           console.log(listUserstories, config);
//           // listUserstories.innerHTML = "";


//           let carteid1 = config.carte1;
//           let valuecarteid1 = parseInt(carteid1);
//           console.log(valuecarteid1);
//           let carteid2 = config.carte2;
//           let valuecarteid2 = parseInt(carteid2);
//           console.log(valuecarteid2);
//           let carteid3 = config.carte3;
//           let valuecarteid3 = parseInt(carteid3);
//           console.log(valuecarteid3);
//           let carteid4 = config.carte4;
//           let valuecarteid4 = parseInt(carteid4);
//           console.log(valuecarteid4);
//           let configuration = config.url;
//           console.log(configuration, carteid1, carteid2, carteid3, carteid4);

//           // const listUserstories = document.getElementById("listUserstories");


//           let hpCharacters = [];


//           const loadCharacters = async () => {
//             try {
//               const res = await fetch(config.url);
//               hpCharacters = await res.json();
//               console.log(res + "  " + hpCharacters);
//               displayCharacters(hpCharacters);
//             } catch (err) {
//               console.error(err);
//             }
//           };
//           const displayCharacters = (characters) => {
//             const htmlString = characters
//               .map((character) => {
//                 console.log(character);
//                 if ((config.carte1statut === 'encours' && character.id === valuecarteid1) || (config.carte2statut === 'encours' && character.id === valuecarteid2) || (config.carte3statut === 'encours' && character.id === valuecarteid3) || (config.carte4statut === 'encours' && character.id === valuecarteid4)) {
//                   console.log(config.carte1statut, config.carte2statut, config.carte3statut, config.carte4statut);

//                   return `
//                       <div class="insideboxcadre">
//                           <p class="insideboxtext">Userstorie N°${character.id} </p>
//                           <p style="margin-left: 2% ;margin-right: 2%;">|</p>
//                           <p class="insideboxtext"> ${character.taille} </span></p>
//                           <p style="margin-left: 2% ;margin-right: 2%;">|</p>
//                           <p class="cadrebox"> </p> 
//                       </div>`;


//                 }

//               })
//               .join('');
//             listUserstories.innerHTML = htmlString;
//             // /////////////////////dette technique://////////////
//             dettetechnique.innerHTML = config.dettetechnique;
//             /////// creation du drage and drop sur accordeon
//             const zonejoueur = document.querySelectorAll('.cadrebox');
//             const itemGame = document.querySelectorAll('.itemGame');
//             console.log(zonejoueur, itemGame);
//             let draggedItem = null;
//             itemGame.forEach((element) => {
//               // const item = element[i];
//               // console.log(element[i])

//               element.addEventListener("dragstart", function (e) {
//                 const element = e.target;

//                 function display(e) {
//                   const zone = e.target;
//                   zone.append(element);
//                   console.log("elment", element);

//                   zonejoueur.forEach((zone) => {
//                     zone.removeEventListener("drop", display);
//                   });
//                 }

//                 //sur chaque carte on effectue un evement d'activation du déplacement
//                 console.log("dragstart", e);
//                 // draggedItem = element; // 1 elt deplacé = un item
//                 setTimeout(function () {
//                   element.style.display = "none"; // chaque item n'a pas de style display particulier
//                 }, 0);

//                 zonejoueur.forEach((zone) => {
//                   zone.addEventListener("dragover", function (e) {
//                     e.preventDefault();
//                   });
//                   zone.addEventListener("dragenter", function (e) {
//                     e.preventDefault();
//                   });
//                   zone.addEventListener("drop", display);
//                 });
//               });

//               element.addEventListener("dragend", function () {
//                 // sur chaque carte on effectue un evement de fin du déplacement
//                 console.log("dragend");
//                 setTimeout(function (e) {
//                   element.style.display = "block"; // chaque item déplacé a style display particulier block
//                   //  draggedItem = null;
//                 }, 0);
//               });
//             });
//             ///////////////////////////////fin dragenddrop////////
//           };


//           loadCharacters();

//         // fin de la methode userstories//

      

//           console.log(listUserstories, config.carte1statut);
//           if (config.carte1statut === 'encours' || config.carte2statut === 'encours' || config.carte3statut === 'encours' || config.carte4statut === 'encours') {
//             console.log('resultat', config.carte1statut, config.carte2statut, config.carte3statut, config.carte4statut);

//           }
            
//         }
//         nmbredejoeur.innerHTML = nbrejoeur;
//       } //le nombre de developpeur est affiché comme contenu de la balise nmbrejoeur;
//     } else {
//       //console.log(nbrejoeur);
//       alert("le nombre de developpeur n'est pas au minimun égal à 1! retournez à l'étape 1 pour continuer à joeur")
//     }
//   } else {
//     //console.log(nbrejoeur);
//     alert("le nombre de developpeur n'est pas au minimun égal à 1! retournez à l'étape 1 pour continuer à joeur")
//   }
//   // transformation en méthode 
//   function rollDice(e, elmt) {

//     console.log(elmt);
//     // console.log(e);
//     let afficheresult = document.getElementById("resultatTirage");
//     afficheresult.style.marginTop = "-10%";
//     console.log("resultat:", afficheresult, console.log(e.target));
//     let result = " ";
//     console.log(result);
//     // console.log('deve', developpeurs)
//     // console.log(elmt);
//     const die = elmt.firstElementChild;

//     toggleClasses(die);
//     console.log(die);
//     die.dataset.roll = getRandomNumber(1, 6);

//     result = die.dataset.roll;

//     console.log(socket);

//     setTimeout(function () {
//       let listeDe = document.querySelectorAll("ol[data-level]");
//       console.log(listeDe);
//       let developpeurs = joueurs.filter((e) => e.statut === 'Developpeur')
//       console.log('deve', developpeurs);
//       for (let i = 0; i < developpeurs.length; ++i) {


//         console.log(numberDe);
//         let listDice = listeDe.forEach(Res => {
//           tableauDesRes = [Res.dataset.roll];
//           console.log("resultat dans tableau sont" + developpeurs[i].name + tableauDesRes);
//         });
//         console.log(listeDe);
//         console.log("le array du resultat" + tableauDesRes);
//         myarray[developpeurs[i].name] = tableauDesRes;
//         console.log("le array du resultat" + myarray[developpeurs[i].name]);

//       }
//       afficheresult.innerHTML = "Votre dé a pour resultat:" + result;

//     }, 1000);

//   }
//   // transformation en méthode
//   function toggleClasses(die) {
//     die.classList.toggle("odd-roll");
//     die.classList.toggle("even-roll");
//   }
//    // transformation en méthode
//   function getRandomNumber(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// }
// getRandomNumber(min, max){
  
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
  

// }
  Makeplateau(){

    function plateaudeJeu() {
      const chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.tooltip.getFillFromObject = false;
      chart.tooltip.background.fill = am4core.color("#67b7dc");
      chart.tooltip.label.maxWidth = 5;
      chart.tooltip.label.wrap = true;

      //    chart.tooltip.pointerOrientation="down";
      console.log(chart, "cela marche!!!!!");

      chart.innerRadius = am4core.percent(38);
      chart.data = [{
          case: "1",
          case2: "1",
          case3: "1",
          taille: "2",
          taille2: "2",
          taille3: "2",
          taille4: "20",
          taille5: "10.44",
          text5: "Jour1",
          text4: "DETTE INEXISTANTE X3",
          text3: "0",
          text2: "50",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B1F0B0"),
          color4: am4core.color("#8DEB8B"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "2",
          case2: "2",
          case3: "2",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille4: "20",
          taille5: "10.44",
          text5: "Jour2",
          text4: "DETTE FAIBLE X4",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B1F0B0"),
          color4: am4core.color("#A0E98B"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "3",
          case2: "3",
          case3: "3",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille4: "20",
          taille5: "10.44",
          text5: "Jour3",
          text4: "DETTE MOYENNE X5",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B1F0B0"),
          color4: am4core.color("#CEBB8B"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "4",
          case2: "4",
          case3: "4",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille4: "20",
          taille5: "10.44",
          text5: "Jour4",
          text4: "DETTE IMPORTANTE X9",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B1F0B0"),
          color4: am4core.color("#E8A18B"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "5",
          case2: "5",
          case3: "5",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille4: "20",
          taille5: "10.44",
          text5: "Jour5",
          text4: "DETTE INSURMONTABLE X12",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B8EEB0"),
          color4: am4core.color("#F9918C"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "6",
          case3: "6",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "10.44",
          text5: "Jour6",
          text3: "5",
          text2: "55",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B8EEB0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "7",
          case3: "7",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "10.44",
          text5: "Jour7",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B8EEB0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "8",
          case3: "8",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "10.44",
          text5: "Jour8",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B8EEB0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "9",
          case3: "9",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "10.44",
          text5: "Jour9",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B8EEB0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "10",
          case3: "10",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "2",
          text5: "*",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#B8EEB0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "11",
          case3: "11",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "2",
          text5: "*",
          text3: "10",
          text2: "60",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#C2E5B0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "12",
          case3: "12",
          taille2: "2",
          taille: "2",
          taille3: "2",
          taille5: "2",
          text5: "*",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#C2E5B0"),
          color5: am4core.color("#7E7D7F"),
        },
        {
          case: "13",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#C2E5B0"),
        },
        {
          case: "14",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#C2E5B0"),
        },
        {
          case: "15",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#C2E5B0"),
        },
        {
          case: "16",
          taille2: "2",
          taille: "2",
          taille3: "2",
          text3: "15",
          text2: "65",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "17",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "18",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "19",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "20",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "21",
          taille2: "2",
          taille: "2",
          taille3: "2",
          text3: "20",
          text2: "70",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "22",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "23",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "24",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "25",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#CDD9AF"),
        },
        {
          case: "26",
          taille: "2",
          taille2: "2",
          taille2: "2",
          taille3: "2",
          text3: "25",
          text2: "75",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#D8CFB0"),
        },
        {
          case: "27",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#D8CFB0"),
        },
        {
          case: "28",
          taille2: "2",
          taille: "2",
          taille3: "2",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#D8CFB0"),
        },
        {
          case: "29",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#D8CFB0"),
        },
        {
          case: "30",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#D8CFB0"),
        },
        {
          case: "31",
          taille2: "2",
          taille: "2",
          taille3: "2",
          text3: "30",
          text2: "80",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#E2C5B0"),
        },
        {
          case: "32",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#E2C5B0"),
        },
        {
          case: "33",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#E2C5B0"),
        },
        {
          case: "34",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#E2C5B0"),
        },
        {
          case: "35",
          taille2: "2",
          taille: "2",
          taille3: "2",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "36",
          taille2: "2",
          taille: "2",
          taille3: "2",
          text3: "35",
          text2: "85",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "37",
          taille2: "2",
          taille: "2",
          taille3: "2",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "38",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "39",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "40",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "41",
          taille2: "2",
          taille: "2",
          taille3: "2",
          text3: "40",
          text2: "90",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "42",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#ECBBB0"),
        },
        {
          case: "43",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "44",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "45",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "46",
          taille2: "2",
          taille: "2",
          taille3: "2",
          text3: "45",
          text2: "95",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "47",
          taille: "2",
          taille2: "2",
          taille3: "2",
          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "48",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "49",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
        {
          case: "50",
          taille2: "2",
          taille: "2",
          taille3: "2",

          color: am4core.color("#FDD75D"),
          color2: am4core.color("#FDD75D"),
          color3: am4core.color("#F4B3B0"),
        },
      ];

      // Ajout du niveau Jour
      const pieSeries5 = chart.series.push(new am4charts.PieSeries());
      pieSeries5.dataFields.value = "taille5";
      pieSeries5.dataFields.category = "case3";

      pieSeries5.slices.template.stroke = am4core.color("#2B2D31");
      pieSeries5.slices.template.strokeWidth = 2;
      pieSeries5.slices.template.strokeOpacity = 1;
      pieSeries5.slices.template.propertyFields.fill = "color5";
      // pieSeries5.labels.template.disabled = true;
      pieSeries5.ticks.template.disabled = true;
      pieSeries5.slices.template.tooltipText = "";
      // pieSeries5.tooltip.pointerOrientation = "down";
      const hs5 = pieSeries5.slices.template.states.getKey("hover");
      hs5.properties.scale = 1;
      const as5 = pieSeries5.slices.template.states.getKey("active");
      as5.properties.shiftRadius = 0;
      pieSeries5.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
      pieSeries5.labels.template.padding(0, 0, 0, 0);
      pieSeries5.alignLabels = false;
      pieSeries5.labels.template.radius = am4core.percent(-19.5);
      pieSeries5.labels.template.fill = am4core.color("black");
      pieSeries5.labels.template.relativeRotation = 0;
      pieSeries5.labels.template.text = "{text5}";

      // Ajout du 4 niveau:
      const pieSeries4 = chart.series.push(new am4charts.PieSeries());
      pieSeries4.dataFields.value = "taille4";
      pieSeries4.dataFields.category = "case2";
      pieSeries4.slices.template.stroke = am4core.color("#2B2D31");
      pieSeries4.slices.template.strokeWidth = 2;
      pieSeries4.slices.template.strokeOpacity = 1;
      pieSeries4.slices.template.propertyFields.fill = "color4";

      pieSeries4.ticks.template.disabled = true;
      pieSeries4.slices.template.tooltipText = "";
      const hs4 = pieSeries4.slices.template.states.getKey("hover");
      hs4.properties.scale = 1;
      const as4 = pieSeries4.slices.template.states.getKey("active");
      as4.properties.shiftRadius = 0;
      // pieSeries4.slices.template.tooltipText = "{category}: Y";
      pieSeries4.labels.template.bent = true;
      pieSeries4.labels.template.text = "{text4}";
      // pieSeries4.labels.template.color="black";
      pieSeries4.labels.template.fontSize = "0.75em";
      pieSeries4.labels.template.maxBottom = "5%";
      pieSeries4.alignLabels = false;
      pieSeries4.labels.template.radius = am4core.percent(-12.5);
      pieSeries4.labels.template.fill = am4core.color("black");
      pieSeries4.labels.template.relativeRotation = 0;
      pieSeries4.labels.template.padding(0, 0, 0, 0);
      // Ajout du troisième niveau:

      const pieSeries3 = chart.series.push(new am4charts.PieSeries());
      pieSeries3.dataFields.value = "taille3";
      pieSeries3.dataFields.category = "case";
      pieSeries3.slices.template.stroke = am4core.color("#2B2D31");
      pieSeries3.slices.template.strokeWidth = 2;
      pieSeries3.slices.template.strokeOpacity = 1;
      pieSeries3.slices.template.propertyFields.fill = "color3";

      pieSeries3.ticks.template.disabled = true;
      const hs3 = pieSeries3.slices.template.states.getKey("hover");
      hs3.properties.scale = 1;
      const as3 = pieSeries3.slices.template.states.getKey("active");
      as3.properties.shiftRadius = 0;
      pieSeries3.slices.template.tooltipText = "";
      pieSeries3.labels.template.bent = true;
      pieSeries3.labels.template.text = "{text3}";
      pieSeries3.alignLabels = false;
      pieSeries3.labels.template.radius = am4core.percent(-10.5);
      pieSeries3.labels.template.textAlign = "center";
      pieSeries3.labels.template.fill = am4core.color("black");
      pieSeries3.labels.template.relativeRotation = 0;
      pieSeries3.labels.template.padding(0, 0, 0, 0);
      // Ajout d'un second cercle  qui est le plus bas

      const pieSeries2 = chart.series.push(new am4charts.PieSeries());
      pieSeries2.dataFields.value = "taille2";
      pieSeries2.dataFields.category = "case";
      pieSeries2.slices.template.stroke = am4core.color("#2B2D31");
      pieSeries2.slices.template.strokeWidth = 2;
      pieSeries2.slices.template.strokeOpacity = 1;
      pieSeries2.slices.template.propertyFields.fill = "color2";
      pieSeries2.ticks.template.disabled = true;
      pieSeries2.slices.template.tooltipText = "";
      const hs2 = pieSeries2.slices.template.states.getKey("hover");
      hs2.properties.scale = 1;
      const as2 = pieSeries2.slices.template.states.getKey("active");
      as2.properties.shiftRadius = 0;
      // pieSeries2.slices.template.tooltipText = "{category}: RER";
      pieSeries2.labels.template.bent = true;
      pieSeries2.labels.template.text = "{text2}";
      pieSeries2.alignLabels = false;
      pieSeries2.labels.template.radius = am4core.percent(-9.5);
      pieSeries2.labels.template.textAlign = "left";
      pieSeries2.labels.template.fill = am4core.color("black");
      pieSeries2.labels.template.relativeRotation = 0;
      pieSeries2.labels.template.padding(0, 0, 0, 0);
      // premier cercle qui est le plus haut

      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "taille";
      pieSeries.dataFields.category = "case";
      pieSeries.slices.template.tooltipText = "";
      pieSeries.slices.template.stroke = am4core.color("#2B2D31");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.slices.template.propertyFields.fill = "color";
      pieSeries.tooltip.pointerOrientation = "vertical";
      pieSeries.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer; //cursor sous forme de main
      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{text3}";
      pieSeries.labels.template.radius = am4core.percent(-9.5);
      pieSeries.labels.template.textAlign = "left";
      pieSeries.labels.template.fill = am4core.color("black");
      pieSeries.labels.template.padding(0, 0, 0, 0);
      pieSeries.labels.template.relativeRotation = 0;

      pieSeries.ticks.template.disabled = true; //elimine le fait que les tooltip sont invisibles
      pieSeries.tooltip.label.maxWidth = 210; //taille du tootip
      pieSeries.tooltip.label.wrap = true; //contenu du tootip va a la ligne
      pieSeries.slices.template.tooltipHTML = ""; //tooltip

      const hs = pieSeries.slices.template.states.getKey("hover");
      hs.properties.scale = 1;
    

      ///////////////////////Element Central/////////////////////:::

      var label = pieSeries.createChild(am4core.Label);

      label.html =
        "<div style='text-align:center; font-size=1em;'> Are you Ready to <br> <strong>SCRUMBLE</strong><br>  Réseau Pyxis / Fabrique Numerique Paloise</div>";
      label.isMeasured = false;
      label.x = am4core.percent(75);
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.marginLeft = "-33%";
      label.align = "center";
      label.isMeasured = false;

      label.fontSize = "1.25em";
      label.wrap = true;
      label.config = {
        fill: "white",
      };



      // Add slice click event
      var currentSlice;
      pieSeries.slices.template.events.on("hit", function (ev) {
        // active l'ecouteur d'evenement grace a  on et l'event déclanche click grace a hit
        if (currentSlice) {
          currentSlice.tooltip.hide(); //
        }
        currentSlice = ev.target;
        currentSlice.tooltipHTML = "<div> cela marche pas du tout </div>";
        console.log(current.slice);
        currentSlice.showTooltip();
      });

      // Set up page click event to close open tooltip
      am4core.getInteraction().body.events.on("hit", function () {
        if (currentSlice) {
          currentSlice.tooltip.hide();
          console.log(currentSlice);
        }
      });
      // add click listener

      console.log(chart.series.values);

      // pieSeries.slices.template.events.on("hit", function(ev) {
      //     var series = ev.target.dataItem.component;
      //     series.slices.each(function(item) {
      //       if (item.isActive && item != ev.target) {
      //         item.isActive = false;
      //         console.log(item);
      //       }
      //     })
      //   });

      chart.hiddenState.properties.innerRadius = am4core.percent(0);
      chart.hiddenState.properties.radius = am4core.percent(250);

      pieSeries.slices.template.events.on("hit", function (ev) {
        console.log(ev.target.dataItem.value);
      });

      chart.series.values.forEach((pie) => {
        pie.slices.template.events.on(
          "hit",
          function (ev) {
            console.log(pie);
            console.log(ev);
            let xx = document.querySelector(ev.target.id);
            // xx.addEventListener("click",alert('Alors cela marche'));

            console.log(xx);
            console.log(
              "cloneId" + "  " + ev.target.cloneId,
              "clone_uid:" + ev.target.uid
            );
          },
          this
        );
        console.log(this);
      });
      //console.log(chart.series.template.dataItems.template.uid);
    }


    plateaudeJeu();

  }
}