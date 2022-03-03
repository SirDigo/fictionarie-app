import React from "react";


function Comment({ comment }){

    return (
        <div>
            <p>{comment.user.username} says: {comment.body}</p>
        </div>
    )
}

export default Comment;