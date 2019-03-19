import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import Post from './Post.jsx';


const Posts = () => {
    const [ posts, setGetPosts ] = useState([]);

    useEffect(() => {
        (() => {
            axios
                .get('http://localhost:4000/api/posts')
                .then(res => {
                    setGetPosts(res.data)
                })
                .catch(err => console.log(err))
        })()
    }, [])

    
    return (
        <Fragment>

            <h1>Posts</h1>

            <Post posts={posts} />

        </Fragment>
    );
}

export default Posts;
