export default function reducer(state, action) {
    switch(action.type) {
        case "GET_POSTS":
            return {
                ...state, 
                posts: action.payload
            }
        case "REMOVE_TODO":
            const isRemovedPost = state.currentPost.id === action.payload.id ? {} : state.currentPost
            const filteredPosts = state.posts.filter(post => post.id !== action.payload.id)
            return {
                ...state, 
                currentPost: isRemovedPost,
                posts: filteredPosts
            }
        default:
            return state
    }
}