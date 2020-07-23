import {ChatRoomEnum} from "../reducers/chatRoomReducer";
import {GenreEnum} from "../../components/";
import { IMessageInterface } from "src/utility/messages";
import { getCookie } from "src/utility/cookies";
import { API_URL } from "src/utility/constants";

export const setSelectedGenre = (genre: GenreEnum) => {
	return {
		type: ChatRoomEnum.SET_SELECTED_GENRE,
		genre: genre
	}
}

export const unselectGenre = () => {
	return {
		type: ChatRoomEnum.UNSELECT_GENRE
	}
}

export const updateMessages = (messages: IMessageInterface[]) => {
	return {
		type: ChatRoomEnum.UPDATE_MESSAGES,
		messages: messages
	}
}

export const downloadMessages = (genre: GenreEnum, callback: () => void) => {
    const token = getCookie('auth-token');
    return (dispatch: any) => {
		fetch(API_URL+"chats/"+genre, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
        .then(res => res.text())
        .then(res => {
            let messages = JSON.parse(res);
			dispatch(updateMessages(messages));
			callback();
		})
		.catch(err => {
			console.log(err);
        });
    }
};