const socket = window.io();

const ulMessages = document.querySelector('#ulMessages');
// ulMessages.style.height = '400px';
// ulMessages.style.width = '500px';
const formMessages = document.querySelector('#formMessages');
const inputMessage = document.querySelector('#inputMessage');
const inputNickname = document.querySelector('#inputNickname');
const formNickname = document.querySelector('#formNickname');
const divConnectedUsers = document.querySelector('#divConnectedUsers');

let webchatUsers = [];

const searchUsersById = (id) => {
  const data = webchatUsers.find((user) => user.id === id);
  return data;
};

function generateRandomColorRGBA() {
  const RGBARed = parseInt(Math.random() * 255, 10);
  const RGBAGreen = parseInt(Math.random() * 255, 10);
  const RGBABlue = parseInt(Math.random() * 255, 10);
  const generateRGBA = `rgb(${RGBARed}, ${RGBAGreen}, ${RGBABlue}, 0.5)`;
  return generateRGBA;
}

formMessages.addEventListener('submit', (event) => {
  event.preventDefault();
  if (inputMessage.value) {
    const chatMessage = inputMessage.value;
    const { nickname } = searchUsersById(socket.id);
    socket.emit('message', { chatMessage, nickname });
    inputMessage.value = '';
  }
});

formNickname.addEventListener('submit', (event) => {
  event.preventDefault();
  const updateNickname = inputNickname.value;
  if (inputNickname.value) {
    const updatedUser = { id: socket.id, nickname: updateNickname };
    socket.emit('nickname', updatedUser);
  }
  inputNickname.value = '';
});

function updateOnlineUsersList(array = []) {
  divConnectedUsers.textContent = '';
  array.forEach((user) => {
    const newConnectedUser = document.createElement('p');
    newConnectedUser.setAttribute('data-testid', 'online-user');
    newConnectedUser.setAttribute('socketId', user.id);
    newConnectedUser.innerText = user.nickname;
    newConnectedUser.style.color = generateRandomColorRGBA();
    if (user.id === socket.id) {
      divConnectedUsers.prepend(newConnectedUser);
      return;
    }
    divConnectedUsers.appendChild(newConnectedUser);
  });
}

socket.on('connectedUsers', (array) => {
  webchatUsers = array;
  updateOnlineUsersList(array);
});

const createMessage = (newMessage) => {
  const message = document.createElement('li');
  message.textContent = newMessage;
  message.setAttribute('data-testid', 'message');
  message.setAttribute('userSocketId', socket.id);
  ulMessages.appendChild(message);
  window.scrollTo(0, document.body.scrollHeight);
};

socket.on('message', (newMessage) => {
  createMessage(newMessage);
});

window.onbeforeunload = () => {
  socket.disconnect();
};
