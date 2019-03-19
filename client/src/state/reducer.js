export default function reducer(state, action) {
    switch(action.type) {
        case "GET_POSTS":
            return {
                ...state, 
                posts: action.payload
            }
        default:
            return state
    }
}