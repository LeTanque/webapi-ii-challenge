import React, { Fragment } from 'react';




const Post = props => {


    return (
        <Fragment>
            {props.posts.map(post => {
                return (
                    <Fragment key={post.id}>
                        
                        <div>{post.title}</div>
                        <small>
                            {post.contents}
                            <br />
                            <i>
                                ID: {post.id}
                            </i>
                        </small>
                        <br />

                    </Fragment>
                )
            })}
        </Fragment>
    );
}

export default Post;
