import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Card, Button, Modal, Image, Col } from 'react-bootstrap'

import Comment from "./Comment"
import ProfileImage from "../download.png"
import CommentForm from "./CommentForm";

function Post({ post, user }){

    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(true)

    //for bootstrap modals
    const [show, setShow] = useState(false)

    const userPic = post.user.image_link

    function handleShowComments(){
        setCommentsLoading(true)
        fetch(`/posts/${post.id}/comments`)
        .then(r => r.json())
            .then(data => {
                setCommentsLoading(false)
                if (data !== []) {                
                    setComments(data)
                    // setShowComments(true)
                } /* else {
                    setComments([{body: "No comments!", user: "Bot"}])
                    setCommentsLoading(false)
                } */
            })
    };

    const postDate = new Date( post.created_at )
    // console.log(d.toDateString())

    function handleRouteChange(){
        window.location.replace(`/profile/${post.user.id}`)
    }

    const cutPostBody = post.body.slice(0, 100)

    return (
        <Col className="d-flex justify-content-center" >
            <Card className="shadow-sm" style={{ width: '18rem', backgroundColor: "#f9f9f9" }}>
                <div style={{padding: "10px"}}>
                    <Image roundedCircle  width="75" src={ userPic ? userPic : ProfileImage }  onClick={handleRouteChange}/>
                </div>
                <Card.Body>
                    <Card.Title style={{color: "#FFB100"}}>{post.title}</Card.Title>
                    <Card.Text>{cutPostBody}...
                        <Button 
                            variant="btn" 
                            onClick={() => { setShow(true); handleShowComments()}}
                            style={{color: "#FFB100"}}
                        >Read More</Button>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        {/* {post.title} by {post.user.username} */}
                        <span>{post.title}</span>
                        <span> by </span>
                        <span style={{color: "#FFB100"}}>{post.user.username}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="h3" style={{backgroundColor: "#f9f9f9"}}>
                    <h5 style={{color: "#FFB100"}} className="pl-2">{postDate.toDateString()}</h5>
                    {post.body}</Modal.Body>
                <Modal.Footer>
                    <Modal.Body>{
                        commentsLoading ?
                        <h2>Loading....</h2> :
                        comments.map(comment => <Comment key={uuid()} comment={comment} />)
                    }</Modal.Body>
                </Modal.Footer>
                <Modal.Footer>
                    <Modal.Body><CommentForm user={user} post={post} setComments={setComments} comments={comments}/></Modal.Body>
                    {/* <Button variant="secondary" onClick={() => setShow(false)}>Close</Button> */}
                </Modal.Footer>
            </Modal>  
        </Col>
    )
}

export default Post;