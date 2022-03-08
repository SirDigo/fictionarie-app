import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

function Comment({ comment }){

    const commentDate = new Date( comment.created_at )

    return (
        // <div className="shadow-sm rounded border" style={{backgroundColor: '#f9f9f9', padding: '10px', margin: '10px'}}>
        //     <h5 style={{color: "#FFB100"}}>{comment.user.username} : {commentDate.toDateString()}</h5>
        //     <h6>{comment.body}</h6>
        // </div>
        <Container className="shadow-sm rounded border" style={{backgroundColor: '#f9f9f9', padding: '10px', margin: '10px'}}>
            <Row>
                <Col>
                <h5 style={{color: "#FFB100"}}>{comment.user.username}</h5>
                </Col>
                <Col >
                    <h6 style={{color: "#B9B9B9"}}>{commentDate.toDateString()}</h6>
                </Col> 
            </Row>
            <Row>
                <h6>{comment.body}</h6>   
            </Row>
        </Container>
    )
}

export default Comment;