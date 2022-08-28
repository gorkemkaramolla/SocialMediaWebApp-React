export const INITIAL_STATE = {
    loading: false,
    postList: [],
    error: false,
};
export const homeReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                loading: true,
                error: false,
                postList: action.payload,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                error: true,
                postList: [],
            };
        default:
            return state;
    }
};
