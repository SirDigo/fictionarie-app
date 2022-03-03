import React, { useState } from "react";

function CommentForm({ user, post, setComments, comments }){
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e){
        e.preventDefault()
        setErrors([]);
        //add setIsLoading here!
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                body: body,
                user_id: user.id,
                post_id: post.id
            }),
        }).then((r) => {
            //setisloading to false here!
            if (r.ok) {
                r.json().then((newComment) => {
                    setComments([...comments, newComment])
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Comment">Comment</label>
                <input
                    type="Comment"
                    id="story"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button type="submit">Add</button>
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </form>
    )
}

export default CommentForm;