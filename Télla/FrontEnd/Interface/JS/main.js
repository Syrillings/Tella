const chat = document.getElementById('msgbox');
const texts = document.querySelector('.chat-messages');
const userlist = document.getElementById('users');
//getting username
const { username, room } = Qs.parse(location.search, 
    {ignoreQueryPrefix: true

});

console.log(username);

const socket = io();
//join chat
socket.emit('join', {username, room})
console.log('Getting users for room:', room);
socket.on('chatters',({room, users}) => {
  outputroomname(room);
  outputusers(users);
});
//message from server
socket.on('message', message => {
console.log(message);
outputMessage(message);



//scroll down
texts.scrollTop = texts.scrollHeight;
});


chat.addEventListener('submit', e =>{
    e.preventDefault();


const msg = e.target.elements.msg.value;
socket.emit('chatmessage', msg);
 
//clearing the textfield
e.target.elements.msg.value ='';
e.target.elements.msg.focus();

});

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username.username||message.username}<span>${message.time}</span></p>
						<p class="text">
						${message.message}
						</p>`;
document.querySelector('.chat-messages').appendChild(div);

const abode = new URLSearchParams(window.location.search);
const roomvalue = abode.get('room');

if (roomvalue){
    document.getElementById('roomname').innerHTML=roomvalue;
}else{
    document.getElementById('roomname').innerHTML=Unspecified;  
}

const tabode = new URLSearchParams(window.location.search);
const uservalue = tabode.get('username');

if (uservalue){
    document.getElementById('user').innerHTML=uservalue;
}else{
    document.getElementById('user').innerHTML=Unspecified;  
}



};
//add users
function outputusers(users){
    console.log('outputusers called');
    const ul = document.getElementById('userlist');
    ul.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.username;
      ul.appendChild(li);
    });
  }
  
