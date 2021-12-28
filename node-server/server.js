// node server that will handle socket io connections

var app = require('express');
var http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server);

var port = process.env.PORT || 3000

const io= require('socket.io')(http,{
  cors:
  {
     origin:'*',
  }
});

const users = {};

//io.on is an instance of socket.io and will listen, that will be run each time a new connection is made with the socket server
// and socket.on will do with each instance


//all the events are given custom name
//user-joined is an event here

io.on('connection',socket=>{
       
       socket.on('new-user-joined',name=>{

        console.log("new user joined", name)
        console.log(socket.id);
        users[socket.id]=name;
        console.log(users)
        socket.broadcast.emit('user-joined',name);          // this will tell each of the user that a new user have joined
    })

       socket.on('send',message=>{
       socket.broadcast.emit('receive',{message:message,name:users[socket.id]}) 

    })


       // disconnect is the inbuilt event inside the socket library which gets called automatically as soon as the user gets disconnected
       socket.on('disconnect',name=>{
       socket.broadcast.emit('left',users[socket.id]) 
       delete users[socket.id];

    })
})

http.listen(port,function (){
   console.log(`port no is ${port}`);
});