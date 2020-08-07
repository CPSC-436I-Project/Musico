const {socketmap} = require('../socket/utility');
const {getIdFromToken} = require('../authenticate');

module.exports = function (socket, io) {

    /**
     * Called when a song is added to the queue.
     * Emits a message to all sockets on the genre to update their queue
     */
    socket.on("addToQueue", async (data) => {
        const id = getIdFromToken(data.token);
        if (id !== null && id === data.userId) {
            io.to(socketmap[socket.id]).emit("updateQueue", {});
        }
    });

    /**
     * Called when a song is upvoted or downvoted in the queue.
     * Emits a message to all sockets on the genre to update their queue
     */
    socket.on("updateVote", async (data) => {
        const id = getIdFromToken(data.token);
        if (id !== null && id === data.userId) {
            io.to(socketmap[socket.id]).emit("updateQueue", {});
        }
    });
};
