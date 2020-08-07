const {socketmap} = require('../socket/utility');
const {getIdFromToken} = require('../authenticate');

module.exports = function (socket, io) {

    socket.on("addToQueue", async (data) => {
        const id = getIdFromToken(data.token);

        if (id !== null && id === data.userId) {
            console.log("sending update");
            // TODO: send an event to all clients to update their queues
            io.to(socketmap[socket.id]).emit("updateQueue", {});
        }
    });

    socket.on("updateVote", async (data) => {
        const id = getIdFromToken(data.token);

        if (id !== null && id === data.userId) {
            console.log("sending update");
            // TODO: send an event to all clients to update their queues
            io.to(socketmap[socket.id]).emit("updateQueue", {});
        }
    });
};
