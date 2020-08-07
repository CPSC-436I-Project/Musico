const {socketmap} = require('../socket/utility');
const {getIdFromToken} = require('../authenticate');

module.exports = function (socket, io) {

    socket.on("addToQueue", async (data) => {
        const id = getIdFromToken(data.token);
        if (id !== null && id === data.userId) {
            io.to(socketmap[socket.id]).emit("updateQueue", {});
        }
    });

    socket.on("updateVote", async (data) => {
        const id = getIdFromToken(data.token);
        if (id !== null && id === data.userId) {
            io.to(socketmap[socket.id]).emit("updateQueue", {});
        }
    });
};
