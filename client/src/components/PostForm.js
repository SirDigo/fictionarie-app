import React, { useState } from "react";

function PostForm({ user, prompt }){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    // const [tags, setTags] = useState("");
    const [errors, setErrors] = useState([]);


    //title, body, tags
    function handleSubmit(e){
        e.preventDefault()
        setErrors([]);
        //add setIsLoading here!
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                title: title , 
                body: body, 
                user_id: user.id, 
                prompt_id: prompt.id,
            }),
        }).then((r) => {
            //setisloading to false here!
            if (r.ok) {
                r.json().then((post) => {
                    console.log(post)
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="story">Story</label>
                <input
                    type="text"
                    id="story"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </form>
    )
}

export default PostForm;