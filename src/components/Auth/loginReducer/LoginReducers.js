export const INITIAL_STATE = {
    writerId: 0,
    message: "",
    accessToken: "",
};
export const loginReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                writerId: action.payload.writerId,
                message: action.payload.message,
                accessToken: action.payload.accessToken,
            };
        case "FETCH_ERROR":
            return {
                ...state,
            };
        default:
            return state;
    }
};
