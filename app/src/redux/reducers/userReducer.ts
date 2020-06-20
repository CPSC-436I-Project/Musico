import profilePlaceholder from "../../icons/profile-placeholder.png";

export enum UserEnum {
    SET_USER
}

const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case UserEnum.SET_USER:
            console.log("error SET_USER - this should not happen when sidebar item is selected");
            return {
                username: action.username,
                email: action.email,
                profileImgSrc: action.profileImgSrc
            };
        default:
            return {
                username: null,
                email: null,
                profileImgSrc: profilePlaceholder,
            };
    }
}

export default userReducer;
