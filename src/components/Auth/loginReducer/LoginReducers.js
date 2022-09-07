import Cookies from "universal-cookie";
const cookies = new Cookies();
export const INITIAL_STATE = {
    id: 0,
    message: "",
    jwt: "",
};
export const loginReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                id: action.payload.id,
                message: action.payload.message,
            };
        case "FETCH_ERROR":
            return {
                ...state,
            };
        default:
            return state;
    }
};
