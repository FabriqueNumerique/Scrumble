import Controller from "../core/Controller.js";
import {
    io
} from "socket.io-client";
// import Joueur from '../model/Joueur.js';
export default class Salon extends Controller {
    constructor() {
        super()
        const socket = io('http://localhost:3051');
        //console.log('ddd');
        socket.on('connect',()=>displayMessage('...'));
        socket.on('receive-message',message =>{
            displayMessage(message)
        })
        // socket.emit('custom-event',10,'Hi',{a:'aa'})
        
        let joinRoomButton = document.getElementById('room-button');
        let messageInput =document.getElementById('message');
        let roomInput = document.getElementById('room-input');
        let form = document.getElementById("form");

        form.addEventListener("submit",e=>{
            e.preventDefault();
            let message =messageInput.value;
            //console.log(message);
            const room =roomInput.value;
            //console.log(room);
            if (message ==="") return
            displayMessage(message);
            socket.emit('send-message', message,room)
            messageInput ="";
        })
        joinRoomButton.addEventListener("click",()=>{
            const room =roomInput
        })
        function  displayMessage(message){
            //console.log(message);
            let div =document.createElement('div');
            div.textContent = message;
            document.getElementById('message-container').append(div);
        }

    }
}