import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Card, Button, Modal } from 'react-bootstrap'

import Comment from "./Comment"
import ProfileImage from "../download.png"
import CommentForm from "./CommentForm";

function Post({ post, user }){

    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    // const [showForm, setShowForm] = useState(false)

    //for bootstrap modals
    const [show, setShow] = useState(false)

    const userPic = post.user.image_link

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

    function handleRouteChange(){
        window.location.replace(`/profile/${post.user.id}`)
    }

    function changeToSignup(){
        window.location.replace("/signup")
    }

    const cutPostBody = post.body.slice(0, 65)

    return (
        <>
        <Card style={{ width: '18rem' }}>
            
            <Card.Img variant="top" src={ userPic ? userPic : ProfileImage }  onClick={handleRouteChange}/>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{cutPostBody}...</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={() => { setShow(true); handleShowComments()}}>Read More</Button>
                <Button variant="btn">like button</Button>
                {/* <Button variant="secondary" onClick={handleShowComments}>{!showComments ? "Show" : "Hide"} Comments</Button>
                <Button variant="secondary" onClick={user ? handleSwitch : changeToSignup}>{showForm ? "X" : "Comment"}</Button> */}
            </Card.Footer>
        </Card>

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{post.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{post.body}</Modal.Body>
            <Modal.Footer>
                <Modal.Body><Modal.Title>Comments</Modal.Title></Modal.Body>
                <Modal.Body>{comments.map(comment => <Comment key={uuid()} comment={comment} />)}</Modal.Body>
                <Modal.Body><CommentForm user={user} post={post} setComments={setComments} comments={comments}/></Modal.Body>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>  
        <br></br>
        </>
    )
}

export default Post;