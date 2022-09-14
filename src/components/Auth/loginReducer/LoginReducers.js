export const INITIAL_STATE = {
    writerId: 0,
    message: "",
    accessToken: "",
    error: false,
};
export const loginReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                writerId: action.payload.writerId,
                message: action.payload.message,
                accessToken: action.payload.accessToken,
                userName: action.payload.userName,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};
