import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={handleSubmit}>
            { user ?           
                <Form.Group>
                    <Form.Control
                        className="shadow-sm"
                        type="Comment"
                        id="story"
                        placeholder="Comment..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Button variant="secondary" type="submit" style={{margin: "5px"}}>Add</Button>
                </Form.Group> 
                :
                <fieldset disabled>
                    <Form.Group>
                        <Form.Control
                            className="shadow-sm"
                            type="Comment"
                            id="story"
                            placeholder="Log in to Comment..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </Form.Group>
                </fieldset> 
            }
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </Form>
    )
}

export default CommentForm;