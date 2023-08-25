//jshint esversion:6
const socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messagecontainer = document.querySelector('.container');
const messageinput = document.getElementById('MessageInput');


var audio = new Audio('ting.mp3');
form.addEventListener('submit', (e)=>{
    e.preventDefault(); //to prevent reload
    const message = messageinput.value;
    // console.log(message);
    append1(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = '';    
});


const append1 = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
};


const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name);

socket.on('user-joined', data =>{
    append1(`${data} joined the chat`, 'right');
});



socket.on('receive', data =>{
    append1(`${data.name}: ${data.message} `, 'left');
});

socket.on('leave', data =>{
    append1(`${data} left the chat`, 'left');
});
