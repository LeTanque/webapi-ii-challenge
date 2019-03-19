import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';



const Posts = () => {
    const [ posts, setGetPosts ] = useState([]);

    useEffect(() => {
        (() => {
            axios
                .get('http://localhost:4000/api/posts')
                .then(res => {setGetPosts(res.data)})
                .catch(err => console.log(err))
        })()
    }, [])

    console.log(posts)
    return (
        <Fragment>

            <h1>Hello</h1>
            {posts.map(post => {
                return (
                    <Fragment key={post.id}>
                        <div>{post.title}</div>
                    </Fragment>
                )
            })}

        </Fragment>
    );

}

export default Posts;
