import React from "react";

function Comment({ comment }){

    console.log(comment)
    return (
        <div>
            <p>{comment.user.username} says: {comment.body}</p>
            {/* <p>{comment.body}</p> */}
        </div>
    )
}

export default Comment;