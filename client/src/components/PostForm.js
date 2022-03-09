import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'

function PostForm({ user, prompt, setPosts, posts, checkIfPosted }){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [errors, setErrors] = useState([]);

    //for counting Characters
    const [counter, setCounter] = useState(0)

    //loading screen state
    const [isLoaded, setIsLoaded] = useState(false)

    function checkIfLoaded(){
        if ( isLoaded ) {
            return "Posted!"
        } else if (user) {
            return "No Submiting for the rest of today!"
        } else {
           return "This isn't the login/signup button."
        }
    }

    //title, body, tags
    function handleSubmit(e){
        //reloads when posted? maybe good? Except when error?
        e.preventDefault()
        setErrors([]);
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                title: title , 
                body: body, 
                tags: tags,
                user_id: user.id,
                prompt_id: prompt.id,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newPost) => {
                    setPosts([...posts, newPost])
                    setTitle("")
                    setBody("")
                    setTags("")
                    setIsLoaded(true)
                    window.location.reload(false);
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="shadow-sm mb-3">
                {   user && !checkIfPosted() ?  
                    <Form.Control 
                    type="text"
                    value={title}
                    placeholder="Title..."
                    onChange={(e) => setTitle(e.target.value)}
                    /> :
                    <Form.Control value={title} placeholder={user ? "Limit reached..." : "Title..."} disabled/>
                }
            </Form.Group>
            <Form.Group className="shadow-sm mb-3">
                {/* <Form.Label>Title</Form.Label> */}
                {   user && !checkIfPosted() ?
                    <Form.Control 
                        type="text"
                        value={tags}
                        placeholder="Tags..."
                        onChange={(e) => setTags(e.target.value)}
                    /> :
                    <Form.Control value={tags} placeholder={user ? "Tags will be here tommorow..." : "Tags.."} disabled/>
                }
            </Form.Group>
            <Form.Group >
                {/* <Form.Label>Story</Form.Label> */}
                {   user && !checkIfPosted() ? 
                    <>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={body}
                        placeholder="Story..."
                        maxLength={2500}
                        onChange={(e) => {
                            setBody(e.target.value)
                            setCounter(e.target.value.length)
                        }}/>
                    <p style={{textAlign: "right", color: "#B9B9B9"}}>{counter}/2500</p>
                    </>
                    :
                    <>
                    <Form.Control as="textarea" rows={3} value={body} placeholder={user ? "Take a break from writing for today..." : "Story..."} disabled/>
                    <p>&nbsp;</p>
                    </>

                }
            </Form.Group>
            {   user && !checkIfPosted() ? 
                <Button variant="secondary" type="submit">Submit</Button> :
                <Button variant="secondary" type="submit" disabled>{ checkIfLoaded()
                    /* user ?
                //  "No Submiting for the rest of today!" : "This isn't the login/signup button." */ }</Button>
            }
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </Form>
    )
}

export default PostForm;