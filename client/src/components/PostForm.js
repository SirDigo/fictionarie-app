import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'
// import { useParams } from "react-router-dom";

function PostForm({ user, prompt, setPosts, posts }){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    // const [tags, setTags] = useState("");
    const [errors, setErrors] = useState([]);

    // const { user } = useParams()

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
                prompt_id: posts.id,
            }),
        }).then((r) => {
            //setisloading to false here!
            if (r.ok) {
                r.json().then((newPost) => {
                    setPosts([...posts, newPost])
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    // console.log(user.id, prompt.id)

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Story</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Submit</Button>
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </Form>
    )
}

export default PostForm;