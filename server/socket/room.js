const { socketmap, GenreEnum } = require('../socket/utility');
const { getIdFromToken } = require('../authenticate');
const Playlist = require('../mongoDB/models/playlistModel');
const Queue = require('../mongoDB/models/queueModel');
const Song = require('../mongoDB/models/songModel');

var currentlyPlayingMap = null;
var durationMap = {};

module.exports = function(socket, io) {

    initializeCurrentlyPlaying();
    // join a room, a room is available for every genre.
    // The chat component connects the socket to the genre's room
    socket.on("join", ({genre}, callback) => {

        // if socket is already in a room, remove it
        if (socket.id in socketmap) {
            socket.leave(socketmap[socket.id]);
            delete socketmap[socket.id];
        }
        // join the room
        socket.join(genre);
        // store the socketid mapped to the userid
        socketmap[socket.id] = genre;
        // call the callback
        if (typeof(callback) === "function") {
            callback(currentlyPlayingMap[genre]);
        }
    });

    function initializeCurrentlyPlaying() {
        console.log("Initializing currently playing songs!");
        if (currentlyPlayingMap !== null) {  
            return;
        }
        currentlyPlayingMap = {};
        for (var genre of Object.values(GenreEnum)) {
            durationMap[genre] = 0;
            currentlyPlayingMap[genre] = {};
            queueSocketManager(genre);
        }
    }
        
    function queueSocketManager(genre) {
        setTimeout(async () => {

            console.log("Setting new songs for genre: ", genre);

            // get a song from the queue of that genre, remove it from the queue
            let song = await Queue.findOne({channel: genre})
            .then(queue => queue["queue"])
            .then(async queue => {
                if (queue.length > 0) {
                    let songArr = [];
                    for (id of queue) {
                        let s = await Song.findById(id);
                        if (s !== null) {
                            songArr.push(s);
                        }
                    }
                    return songArr.sort((a, b) => b.numVotes - a.numVotes)[0];
                } else {
                    return null;
                }
            })
            .catch(err => {console.log(err)})

            // if song is null, there are no songs in the queue, so use the playlist
            if (song === null || song === undefined) {
                // gets a random song from the playlist
                let songId = await Playlist.findOne({channel: genre})
                .then(playlist => playlist["playlist"])
                .then(playlist => playlist[Math.floor(Math.random() * playlist.length)])
                .catch(err => {console.log(err)});
                song = await Song.findById(songId);
            } else {
                // if song is not null, i.e. coming from the queue, delete the song from the queue
                await Queue.updateOne({channel: genre}, {$pull: {queue: song._id}})
                .catch(err => {console.log(err)});
            }
            
            // set the duration to the duration of the current song
            durationMap[genre] = (song === null || song.duration === undefined || typeof(song.duration) !== "number") ? 10 : song.duration; 
            
            // set the song with now as the start time
            let now = new Date();
            currentlyPlayingMap[genre] = {song: song, startTime: now.toString()};
            console.log("Loaded song for: ", genre);

            // send a socket event to update the frontend queue
            io.to(genre).emit("updateQueueAndPlay", currentlyPlayingMap[genre]);

            // call the function again
            queueSocketManager(genre)

        }, durationMap[genre]*1000)
    }

    socket.on("disconnect", () => {
        // remove socket from socketmap
        socket.leave(socketmap[socket.id]);
        delete socketmap[socket.id];
    });
};
