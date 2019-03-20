import React, { 
    Fragment, 
} from 'react';
import axios from 'axios';
import { MdRemoveCircleOutline } from 'react-icons/md';

// import PostsContext from "../state/context";
// Optionally passed down the dispatch function from posts and triggering delete through it.




const Post = props => {
    // const { state, dispatch } = useContext(PostsContext); // This is pulling state from context

    const deletePost = (id, postObject) => {
        return (
            async () => {
                await axios.delete(`http://localhost:4000/api/posts/${id}`);
                props.dispatch({ 
                    type: "REMOVE_TODO", 
                    payload: postObject 
                });
            }
        ) 
    }


    return (
        <Fragment>
            {props.posts.map(post => {
                return (
                    <Fragment key={post.id}>
                        
                        <div className='post-title'>
                            {post.title}
                        </div>
                        <div className='post-contents'>
                            {post.contents}
                        </div>
                        <div className='post-id'>
                            ID: {post.id}
                        </div>
                        <div className='post-actions'>
                            <MdRemoveCircleOutline 
                                onClick={deletePost(post.id, post)}
                            />
                        </div>
                        <br />

                    </Fragment>
                )
            })}
        </Fragment>
    );
}

export default Post;
