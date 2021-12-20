import Controller from "../core/Controller.js";
import {
    io
} from "socket.io-client";
// import Joueur from '../model/Joueur.js';
export default class Salon extends Controller {
    constructor() {
        super()

        const player = {
            host: false,
            roomId: null,
            username: "",
            socketId: "",
            win: false
        }

        //console.log("ssss");
        const socket = io('http://localhost:3051').connect()
        //console.log(socket, "connecté");
        let username = document.getElementById('username');
        let usercard = document.getElementById('user-card');
        let waiting = document.getElementById('waiting-area');
        let roomsCard = document.getElementById('rooms-card');
        let roomsList = document.getElementById('rooms-list');
        let restartArea = document.getElementById('restart-area');
        let gamecard = document.getElementById('game-card');
        gamecard.style.height = "100vw";
        gamecard.style.border = 'solid 1px green';

        //console.log('roomlist', roomsList);
        roomsCard.style.border = '1px solid red';
        //console.log("rooms card", roomsCard);
        //console.log(usercard);
        let form = document.getElementById('form')
        //console.log(form);
        let join = document.getElementById('join-room');
        //console.log(join);



        socket.emit('get rooms');

        socket.on('list rooms', (rooms) => {
            let html = "";
            if (rooms.length > 0) {
                rooms.forEach(room => {
                    if (room.players.length !== 2) {
                        html += `<li class="list-group-item d-flex justify-content-between">
                                    <p class="p-0 m-0 flex-grow-1 fw-bold">Salon de ${room.players[0].username} - ${room.id}</p>
                                    <button class="btn btn-sm btn-success join-room" data-room="${room.id}">Rejoindre</button>
                                </li>`;
                    }
                });
            }
            if (html !== "") {
                roomsList.innerHTML = ""
                roomsCard.classList.remove('d-none');
                roomsList.innerHTML = html;

                for (const salon of document.getElementsByClassName('join-room')) {
                    //console.log(salon);
                    salon.addEventListener('click', joinRoom, false)
                }
            }
        })


        form.onsubmit = function (e) {
            e.preventDefault()
            player.username = username.value;
            //console.log(player.username);

            player.host = true;
            player.socketId = socket.id;
            usercard.hidden = true;
            let valeurwaiting = `
            <p class="card mb-3">
                <p class="card-header">En attente d'un autre joueur</p>
                    <p class="card-body mx-auto">
                       <p class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </p>
                    </p> 
            </p>

            <p class="card">
                 <p class="card-body text-center"> Partage ce lien pour inviter quelqu'un à jouer avec toi <span id="link-to-share"></span> </p>
            </p> 
        `;
            //console.log(player);
            waiting.innerHTML = valeurwaiting

            socket.emit('playerData', player);

        }
        socket.on('Start Game', (players) => {

            startGame(players);
            //console.log(players)
        });

        function startGame(players) {
            //console.log(players);
            restartArea.hidden = true;
            waiting.innerHTML = '';
            const otherPlayer = players.find(p => p.socketId != player.username);
            //console.log(otherPlayer, gamecard, gamecard.innerHtml, player.host);
            let otherPlayerUsername = otherPlayer.username;
            //console.log(otherPlayerUsername);

        }
        const joinRoom = function () {

            //console.log(username, "xx:", username.value);
            if (username.value != "") {
                //console.log(username, "xx:", username.value);
                const roomId = this.dataset.room;
                player.username = username.value;
                player.socketId = socket.id;
                player.roomId = roomId;
                //console.log(player);
                socket.emit('playerData', player);
                socket.on('Start Game', (players) => {
                    //console.log(players[0]);
                    for (let index = 1; index < players.length; index++) {

                        players[index].host = false;
                        //console.log(players);
                        socket.emit('playerData', player);
                    }


                });

                usercard.hidden = true;
                waiting.innerHTML = "";
                //console.log(roomsCard);
                roomsCard.innerHtml = "";
                roomsList.innerHtml = "";
                gamecard.innerHTML = "";
                let elementgame = document.createElement('p');
                elementgame.style.color = "white";
                //console.log(player);
                if (player.host === true) {
                    //console.log(player);
                    elementgame.innerHtml = `<div> ${player.username}, vous etes pour cette partie de jeu </div> <br> <p> ici se presente le jeu</p>`;
                    gamecard.appendChild(elementgame);
                    //console.log(gamecard);
                } else if (player.host === false) {
                    elementgame.innerHtml = `<div> ${player.username}, vous n'etes pas pour cette partie </div> <br>`;
                    gamecard.appendChild(elementgame);
                    //console.log(gamecard);
                }



                // gamecard.innerText=`ici se presente le jeu`

                // const otherPlayer= players.find(p => p.socketId != player.username);
                // //console.log(otherPlayer,gamecard, gamecard.innerHtml,player.host);
                // let otherPlayerUsername = otherPlayer.username;
                // //console.log(otherPlayerUsername);
                // if (player.host === true) {
                //       gamecard.innerHtml=`<div> ${player.username}, vous etes pour cette partie de jeu`;
                //  } else if(player.host===false) { gamecard.innerHtml=`<div> ${player.username}, vous n'etes pas pour cette partie`;}
                //  else(//console.log("gros pb"));

            }

        }
    }
}