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
const paquet1=require('./routes/Userstories/Paquet1');
const paquet2=require('./routes/Userstories/Paquet2');
const paquet3=require('./routes/Userstories/Paquet3');
const paquet1A1=require('./routes/Userstories/Paquet1A1');
const paquet1A2=require('./routes/Userstories/Paquet1A2');
const paquet2A2=require('./routes/Userstories/Paquet2A2');
const paquet2A1=require('./routes/Userstories/Paquet2A1');

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
app.use('/api',paquet1);
app.use('/api',paquet2);
app.use('/api',paquet3);
app.use('/api',paquet1A1);
app.use('/api',paquet1A2);
app.use('/api',paquet2A2);
app.use('/api',paquet2A1);
// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    
});
// // partie websocket
// wsServer.on('request', request=>{
//   const connection = request.accept(null,request.origin);
//   connection.on('open',()=>console.log("open",connection ));
//   connection.on('close',()=>console.log("close",connection ));
//   connection.on('message',message =>{
//    const result= JSON.parse(message.utf8Data)
//     // reception d'un message du client:
//       console.log(message,result)
//   });
//   // permet des echanges directionnelle au niveau du protocle TCP:
//   console.log(connection);
//   // new client ID:
//   const clientId=guid();
//   console.log(clientId);
//   clients[clientId]={
//     "connection":connection
//   };
//   console.log(clients[clientId]);
//   const payLoad={
//     'method':"connect",
//     'clientId':clientId

//   }
//   // renvoie du jeton de connection 
//   connection.send(JSON.stringify(payLoad));
// })
// //creation d'un unique Id par client

// function S4() {
//   return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
// }

// // then to call it, plus stitch in '4' in the third group
// const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();






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
// partie web ssimplified tuto:
//  io.on('connection',socket=>{
//    console.log(socket.id);
//    socket.on('send-message',(message,room)=>{
//      if(room ===""){
//             socket.broadcast.emit('receive-message',message);
//      } else{
//        socket.to(room).emit('receive-message',message);
//      }

//      console.log(message);
//    })
//  })


// // instrument(io, {
// //   auth: false
// // });

// app.use(express.static("public"))
// // app.get('/', (req, res) => {
// //   res.sendFiles(`/var/www/html/Scrumble/Jeu/views/jeu.html`);
// // });

// // START SOCKET TEST JEU
// let rooms =[];
// io.on('connection', (socket) => { 
//   console.log(`[connection],${socket.id}` );

//   socket.on('playerData',(player)=>{
//     console.log(`[playerData], ${player.username}`);
//      let room = null;
//      if(!player.roomId){
//         room = createRoom(player);
//         console.log(`[create room]-${room.id}-${player.username}`);
//      }
//      else {
//        room = rooms.find(r =>r.id === player.roomId);
//        if (room === undefined) {
//          return;
//        }
//        room.players.push(player);
//      }
//      socket.join(room.id);
//      io.to(socket.id).emit('join room',room.id);
//      if(room.players.length === 2){ //change to player.length
//        io.to(room.id).emit('Start Game',room.players);
//        console.log(room.players);
//      }

//   });
//   socket.on('get rooms',()=>{
//     io.to(socket.id).emit('list rooms',rooms)
//     console.log(rooms)
//   })
//   socket.on('disconnect',()=>{
//     console.log(`[disconnect] ${socket.id}`);
//     let room= null;
//     rooms.forEach(r=>r.players.forEach(p =>{
//       if(p.socketId === socket.id && p.host){
//         room=r;
//         rooms =rooms.filter(r => r !== room);
//       }
//     }))
//   })
// })

// function createRoom(player) {
//   const room = { id: roomId(), players: [] };

//   player.roomId = room.id;

//   room.players.push(player);
//   rooms.push(room);

//   return room;
// }

// function roomId() {
//   return Math.random().toString(36).substr(2, 9);
// }


// app.get('/rooms', (r, res) => {
//   res.json(rooms)
// })
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

  // socket.on('joueur',this.state.joueurs);
  // console.log(this.state.joueurs);

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
    }
    //  socket.on('playernbre',(nbreplayer)=>{
    //   console.log(`[playerNbre],${nbreplayer.nbre}`);
    // })
    socket.join(room.id);

    // socket.broadcast.emit("listplayer",player);
    // console.log('[listplayer]',player);

    io.to(socket.id).emit('join room', room.id);

    // le 2 va changer pour être remplacé par nbreplayer.nbre
    // if (room.players.length === 2) {//si 
    //   io.to(room.id).emit('start game', room.players);
    // }

  });


  // socket.on('getRooms', ()=>{

  //   io.to(socket.id).emit('listRooms', rooms);
  // })
  // socket.on('statejoueur',()=>{
  //   console.log('[statejouers]',joueurs,state);
  // })


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



// 

// const fs = require("fs");

// // middleware

// // cas du paquet1
// let paquet1 = require("./models/paquet1.json");
// //save function
// const save = () => {
//   fs.writeFile(
//     "./models/paquet1.json",
//     JSON.stringify(paquet1, null, 2),
//     (error) => {
//       if (error) {
//         throw error;
//       }
//     }
//   );
// };


// //Read(R) in CRUD
// app.get("/paquet1", (req, res) => {
//   res.json(paquet1);
// });

// //Create(C) in CRUD
// app.post("/paquet1", bodyParser.json(), (req, res) => {
  
//   paquet1.push(req.body);
//   save();
//   res.json({
//     status: "success",
//     stateInfo: req.body,
//   });
// });


// // put
// app.put("/paquet1/:id", bodyParser.json(), (req, res) => {
//   paquet1 = paquet1.map((paquet) => {
//     console.log(paquet,paquet.id);
//     if (paquet.id === Number(req.params.id)) {
//       body={
//         id: req.body.id,
//         titre: req.body.titre,
//         contenu: req.body.contenu,
//         img: req.body.img,
//         dposition: req.body.dposition,
//         Dependance: req.body.Dependance,
//         taille: req.body.taille,
//         value: req.body.value
    
//       }
//       return body;
//     } else {
//       return paquet;
//     }
//   });
//   save();
//   res.json({
//     status: "success",
//     paquetInfo: req.body,
//   });
// });

// app.delete("/paquet1/:id", (req, res) => {
//   paquet1 = paquet1.filter((paquet) => paquet.id !== Number(req.params.id));
//   save();
//   res.json({
//     status: "success",
//     removed: req.params.id,
//     newLength: paquet1.length,
//   });
// });

// cas du paquet1.1
// let paquet1A1 = require("./models/paquet1.1.json");

// const saves = () => {
//   fs.writeFile(
//     "./models/paquet1.1.json",
//     JSON.stringify(paquet1A1, null, 2),
//     (error) => {
//       if (error) {
//         throw error;
//       }
//     }
//   );
// };

// //Read(R) in CRUD
// app.get("/paquet1.1", (req, res) => {
//   res.json(paquet1);
// });

// //Create(C) in CRUD
// app.post("/paquet1.1", bodyParser.json(), (req, res) => {
  
//   paquet1.push(req.body);
//   save();
//   res.json({
//     status: "success",
//     stateInfo: req.body,
//   });
// });


// // put
// app.put("/paquet1.1/:id", bodyParser.json(), (req, res) => {
//   paquet1 = paquet1.map((paquet) => {
//     console.log(paquet,paquet.id);
//     if (paquet.id === Number(req.params.id)) {
//       body={
//         id: req.body.id,
//         titre: req.body.titre,
//         contenu: req.body.contenu,
//         img: req.body.img,
//         dposition: req.body.dposition,
//         Dependance: req.body.Dependance,
//         taille: req.body.taille,
//         value: req.body.value
    
//       }
//       return body;
//     } else {
//       return paquet;
//     }
//   });
//   save();
//   res.json({
//     status: "success",
//     paquetInfo: req.body,
//   });
// });

// app.delete("/paquet1.1/:id", (req, res) => {
//   paquet1 = paquet1.filter((paquet) => paquet.id !== Number(req.params.id));
//   save();
//   res.json({
//     status: "success",
//     removed: req.params.id,
//     newLength: paquet1.length,
//   });
// });
