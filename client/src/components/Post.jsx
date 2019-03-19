import React, { Fragment } from 'react';




const Post = props => {

    console.log(props.posts)

    return (
        <Fragment>

            {props.posts.map(post => {
                return (
                    <Fragment key={post.id}>
                        <div>{post.contents}</div>
                    </Fragment>
                )
            })}

        </Fragment>
    );

}

export default Post;
