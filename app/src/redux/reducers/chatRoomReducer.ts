export enum ChatRoomEnum {
	SET_SELECTED_GENRE
}

const chatRoomReducer = (state: any, action: any) => {
	switch (action.type) {
		case ChatRoomEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
			};
		default:
			return {
				selectedGenre: null,
			};
	}
}

export default chatRoomReducer;
