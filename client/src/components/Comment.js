import React from "react";
// import { Card, Button, Modal, Image, Col } from 'react-bootstrap'

function Comment({ comment }){

    return (
        <div className="shadow-sm rounded border" style={{backgroundColor: '#f9f9f9', padding: '10px', margin: '10px'}}>
            <h4 style={{color: "#FFB100"}}>{comment.user.username}</h4>
            <h6>{comment.body}</h6>
        </div>
    )
}

export default Comment;