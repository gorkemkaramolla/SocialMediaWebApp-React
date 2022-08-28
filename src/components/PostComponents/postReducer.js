export const INITIAL_STATE = {
    loading: false,
    comments: [],
    error: false,
};
export const postReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                loading: true,
                error: false,
                comments: action.payload,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                error: true,
                comments: [],
            };
        default:
            return state;
    }
};
