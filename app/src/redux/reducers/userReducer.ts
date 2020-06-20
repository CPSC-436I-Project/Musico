import profilePlaceholder from "../../icons/profile-placeholder.png";

export enum UserEnum {
    SET_USER,
    CREATE_USER
}

const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case UserEnum.SET_USER:
            return {
                username: action.username,
                password: action.password,
                email: action.email,
                profileImgSrc: action.profileImgSrc
            };
        case UserEnum.CREATE_USER:
            return {
                username: action.username,
                password: action.password,
                email: action.email,
                profileImgSrc: profilePlaceholder
            };
        default:
            return {
                username: null,
                password: null,
                email: null,
                profileImgSrc: profilePlaceholder,
            };
    }
};

export default userReducer;
