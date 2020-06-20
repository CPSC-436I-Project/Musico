export enum ChatRoomEnum {
	SET_SELECTED_GENRE
}

const chatRoomReducer = (state: any, action: any) => {
	switch (action.type) {
		case ChatRoomEnum.SET_SELECTED_GENRE:
			console.log("SET_SELECTED_GENRE this should happen");
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
