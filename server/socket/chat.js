const { socketmap } = require('../socket/utility');
const Chat = require('../mongoDB/models/chatModel');
const { getIdFromToken } = require('../authenticate');

module.exports = function(socket, io) {

  /**
   * Called when a message is recieved.
   * Emits a message to all sockets on the genre to update their messages.
   * 
   */
  socket.on("message", async (data, callback) => {
    const id = getIdFromToken(data.token);

    if (id !== null && id === data.userId) {
      const newMessage = {
        user: data.userId,
        username: data.username,
        message: data.message
      };
      // store the message in Mongodb
      const messages = await Chat.findOne({channel: socketmap[socket.id]})
        .then(chats => chats["messages"])
        .catch(err => {console.log(err)});

      messages.push(newMessage);

      Chat.findOneAndUpdate({channel: socketmap[socket.id]}, {messages: messages})
        .then(chatMessages => {
          // use the socketmap to get the genre for that socket, 
          // and post message to that genre
          io.to(socketmap[socket.id]).emit("newMessage", newMessage);
          // callback
          callback();
        })
        .catch(err => console.log('Error: ' + err));
    }
  });
};
