import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

import Comment from "./Comment"

function Post({ post }){

    // console.log(post)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])

    function handleShowComments(){
        showComments ? 
        setShowComments(false) :
        fetch(`/posts/${post.id}/comments`)
        .then(r => { if (r.ok) {
            r.json().then(data => {
                setComments(data)
                setShowComments(true)
                });
            }
            else {
                setComments("No comments!")
            }
        })
    };

    // console.log(comments)

    return (
        <div>
            <header>
                {/* <h3>{post.user.username}</h3> */}
                <h1>{post.title} by: {post.user.username}</h1>
            </header>
            <h4>{post.body}</h4>
            <p>{post.likes}</p>
            <button onClick={handleShowComments}>{!showComments ? "Show Comments" : "Hide Comments"}</button>
            {
                showComments ? 
                comments.map((comment) => 
                <Comment key={uuid()} comment={comment}/>) :
                //Filler
                <></>
            }
            <br></br>
            <br></br>
        </div>
    )
}

export default Post;