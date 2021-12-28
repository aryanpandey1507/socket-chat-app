//web sockets are used to  establish a connection between client and the server

// in simple http request client asks for the request and server responses

// this is not valid for the real time applications

//that is why http response is not used here, 

//using web-socket two way response is established between the client and the server

// Two protocols are used here , ws  and wss

// this is implemented using nodejs by the socket.io library of js

//here server also emits the event , to which client can also give the response

// we have to include this script <script src="http://localhost:8000/socket.io/socket.io.js"></script> in the html file as it is required by the socket



//const io= require('socket.io')(8000);

///import {io}  from 'socket.io'  
 
const socket = io();

const form = document.getElementById('send-container');

const messageInput= document.getElementById('messageInp');

const messageContainer= document.querySelector('.container');


const append = (message, position)=>{
     
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(` You: ${message} `,'right');
    socket.emit('send',message);
    messageInput.value="";

})


//takes the input of the name from the  user..
const name = prompt("Enter your name here to join..");

socket.emit('new-user-joined',name);


socket.on('user-joined',name=>{

    append(` ${name} joined the chat `,'right')

})



socket.on('receive',data=>{

    append(` ${data.name}:${data.message} `,'left')

})

socket.on('left',name=>{

    append(`${name} left the chat`,'left')

})





 