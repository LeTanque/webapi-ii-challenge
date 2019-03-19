import React, { Fragment, useContext } from 'react';

import PostsContext from "../state/context";

import Post from './Post.jsx';


const Posts = () => {

    // const { state, dispatch } = useContext(PostsContext); // This is pulling state from context
    const { state } = useContext(PostsContext); // This is pulling state without the dispatch function to set new state

    // console.log('This is the dispatch function: ', dispatch)

    return (
        <Fragment>

            <h1>Posts</h1>
            <section className='posts'>
                <Post posts={state.posts} />
            </section>

        </Fragment>
    );
}

export default Posts;
