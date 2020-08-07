import {RoomEnum} from "../reducers/roomReducer";
import {GenreEnum} from "../../components";
import {IMessageInterface} from "src/utility/messages";
import {getCookie} from "src/utility/cookies";
import {API_URL} from "src/utility/constants";
import {ISongInterface, defaultSong} from "src/utility/songs";

export const setSelectedGenre = (genre: GenreEnum | null) => {
    return {
        type: RoomEnum.SET_SELECTED_GENRE,
        genre: genre,
        getMessages: true
    }
};

export const unselectGenre = () => {
    return {
        type: RoomEnum.UNSELECT_GENRE
    }
};

export const updateMessages = (messages: IMessageInterface[], genre: GenreEnum) => {
    return {
        type: RoomEnum.UPDATE_MESSAGES,
        messages: messages,
        genre: genre
    }
};

export const updateQueue = (queue: ISongInterface[]) => {
    return {
        type: RoomEnum.UPDATE_QUEUE,
        queue: queue
    }
};

export const updateCurrentlyPlaying = (song: ISongInterface, startTime: string) => {
    return {
        type: RoomEnum.UPDATE_PLAYING,
        song: song,
        startTime: startTime
    }
};

export const downloadMessages = (genre: GenreEnum, callback: () => void) => {
    const token = getCookie('auth-token');
    return (dispatch: any) => {
        fetch(API_URL + "chats/" + genre, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
            .then(res => res.text())
            .then(res => {
                let messages = JSON.parse(res);
                dispatch(updateMessages(messages, genre));
                callback();
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const getChannelQueue = (genre: GenreEnum) => {
    const token = getCookie('auth-token');
    return (dispatch: any) => {
        fetch(API_URL + "queues/" + genre, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
            .then(res => res.json())
            .then((songIds: string[]) => {
                return getSongsFromQueue(songIds);
            })
            .then((queue) => {
                dispatch(updateQueue(queue))
            })
            .catch((err) => {
                console.log(err)
            })
    }
};

const getSongsFromQueue = (ids: string[]) => {
    const token = getCookie('auth-token');
    let song: ISongInterface = defaultSong;

    return Promise.all(
        ids.map((id: string) => fetch(API_URL + "songs/" + id, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })))
        .then((responses) => {
            return Promise.all(responses.map(response => response.json()))
        })
        .then((songs: ISongInterface[]) => {
            let queue: ISongInterface[] = []
            songs.forEach((item: ISongInterface) => {
                song = item;
                if (song !== null && song.songName !== "default") {
                    queue = queue.concat(song);
                }
            });
            return queue;
        })
        .then((queue) => {
            return Promise.resolve(queue);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
};
