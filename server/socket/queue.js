const { socketmap } = require('../socket/utility');
const { getIdFromToken } = require('../authenticate');

module.exports = function(socket, io) {

    socket.on("addToQueue", async (data, callback) => {
        const id = getIdFromToken(data.token);

        if (id !== null && id === data.userId) {
            // TODO: do the job of adding the song to the genre
            
            // TODO: send an event to all clients to update their queues
            io.to(socketmap[socket.id]).emit("updateQueue");
        }
    });

    socket.on("updateVote", async (data, callback) => {
        const id = getIdFromToken(data.token);

        if (id !== null && id === data.userId) {
            // TODO: update the vote count of a song

            // TODO: send an event to all clients to update their queues
            io.to(socketmap[socket.id]).emit("updateQueue");
        }
    });
}