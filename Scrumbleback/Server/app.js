require('./config/config');
require('./models/db');
require('./config/passportConfig');

const socket = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.js');
const dayliroute =require('./routes/daylicartes.js');
const cartepb =require('./routes/pbcarte');
const revuecarte=require('./routes/revuescartes');
const regles=require('./routes/regles');
const role=require('./routes/roles');
const projets=require('./routes/projets');

const app = express();
const http = require('http').createServer(app);
// const websocketServer = require('websocket').server;

const clients ={};

console.log(clients);
// const wsServer = new websocketServer({
//   "httpServer": http
// })
app.use(bodyParser.json());
app.use(cors({origin:'*'}));

app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/api',dayliroute);
app.use('/api',cartepb);
app.use('/api',revuecarte);
app.use('/api',regles);
app.use('/api',role);
app.use('/api',projets);
// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    
});
// partie socket
// socket part
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// partie en cours:
// attention toujours le pb  des routes car port 3000 est toujours utilisé donc 3020
// creation d'une session de jeu
 const players=[]; 
let rooms = []; // toutes les rooms qui existe initialement
console.log("rooms", rooms);
// creation de la socket permettant de deconnecter les différents joueurs

io.on('connection', (socket) => { // connection de la socket grace a l'evenement on connection
  console.log(`[connection],${socket.id}`); //log sur l'evt connection et récupère l'id de sa socket
  socket.emit('socketnecessaireaconnection', `${socket.id}`);

  let stocksys = [];
  socket.on('joeuers', (sysJson) => {
    const state = JSON.parse(sysJson);
    console.log('[joeuers]', state) ;
    stocksys.push(state);

    let sysstateencommun = JSON.stringify(stocksys);
    console.log('[sysstateencommun]', sysstateencommun);
    socket.broadcast.emit('statejoueurscommun', JSON.stringify(sysstateencommun));
  });

  let listplayer = [];
  socket.on('playerData', (player) => { //création d'un event playerData avec pour nature d'evt une fonction fléché de creation de room
    console.log(`[playerData],${player.username},[connection],${socket.id},${player}`); // récupération de data username et player
    let room = null; //etat initial pas de room crée
    if (roomId != null) {
      listplayer.push(player);
      console.log('listplayer', listplayer);
    }

    if (!player.roomId) { //si le player n'est pas lié a une valeur Id de room
      console.log("ping0");
      room = createRoom(player); //creation de la room (session) pour 

      console.log(`[createRoom],${room.id}-${player.username},${player.roomId}`); //
    } else {
      room = rooms.find(r => r.id === player.roomId);
      console.log("ping1");
      if (room === undefined) {
        console.log("ping2");
        return;
      }
      player.roomId = room.id;
      room.players.push(player);
      console.log("ping3");

      listplayer.push(player.username);

      socket.emit('listplayername', listplayer);
      console.log('listplayername')
    };

    socket.join(room.id);

    io.to(socket.id).emit('join room', room.id);

  });

});

// creation des rooms: salons de jeux 
function createRoom(player) {
  const room = { // definition d'une room caracteriser par un id de room et  un joueur associé
    id: roomId(),
    players: []
  };
  player.roomId = room.id; //un player a un id associé a un room.id
  room.players.push(player); //ajout des rooms dans un tableau
  rooms.push(room); // liste des rooms mis dans le tableau des rooms 

  return room
}

function roomId() {
  return Math.random().toString(36).substr(2, 20);
}

// start server
http.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`));