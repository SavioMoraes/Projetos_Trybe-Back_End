const moment = require('moment');

const { createMessage } = require('../models/webchatModel'); 

const webchatUsers = [];
const dateTime = moment().format('DD-MM-yyyy HH:mm:ss A');

const updateWebChatUser = (updatedNickname) => {
  const searchByUser = webchatUsers.findIndex((user) => user.id === updatedNickname.id);
  webchatUsers.splice(searchByUser, 1);
  webchatUsers.push(updatedNickname);
  return webchatUsers;
};

const deleteDisconnectedUser = (id) => {
  const disconnect = webchatUsers.findIndex((user) => user.id === id);
  webchatUsers.splice(disconnect, 1);
  return true;
};

module.exports = (io) => io.on('connection', async (socket) => {
  const newUser = { id: socket.id, nickname: socket.id.substring(0, 16) };
  webchatUsers.push(newUser);
  io.emit('connectedUsers', webchatUsers);
  socket.on('nickname', (updatedNickname) => {
    const updatedUserList = updateWebChatUser(updatedNickname);
    io.emit('connectedUsers', updatedUserList);
  });
  socket.on('message', ({ chatMessage, nickname }) => {
    createMessage(chatMessage, nickname, dateTime);
    io.emit('message', `${dateTime} ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    deleteDisconnectedUser(socket.id);
    io.emit('connectedUsers', webchatUsers);
  });
});